import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

// Self-check for the log analyzer: SPEC.md §5 acceptance, edge cases, and a randomized
// cross-check against an independent reference. No -ea needed; exits 1 on failure.
// Run (JDK 22+, from this folder): java LogAnalyzerCheck.java
public class LogAnalyzerCheck {
    static int failures = 0;

    static void check(String name, Object actual, Object expected) {
        if (!expected.equals(actual)) {
            failures++;
            System.out.println("FAIL " + name + "\n  got:      " + actual + "\n  expected: " + expected);
        }
    }

    static String all(List<LogEntry> e) {
        return StatusCodeAnalyzer.report(e) + "\n" + LatencyAnalyzer.report(e) + "\n" + TopEndpointAnalyzer.report(e);
    }

    static List<LogEntry> parse(String... lines) {
        return List.copyOf(LogEntry.parseAll(List.of(lines))); // immutable: any analyzer that mutates input throws
    }

    public static void main(String[] args) throws Exception {
        // SPEC.md §5: keep in sync with the expected output there
        List<LogEntry> sample = List.copyOf(LogEntry.parseAll(Files.readAllLines(Path.of("sample-access.log"))));
        check("sample valid count", sample.size(), 20);
        check("sample report", all(sample), String.join("\n",
                "[Status] total=20", "200=12", "201=2", "204=1", "304=1", "401=1", "404=1", "500=1", "503=1",
                "classes: 1xx=0 2xx=15 3xx=1 4xx=2 5xx=2", "error rate: 20.00%",
                "[Latency] avg=400.20ms p95=1500ms slow(>=1000ms)=3",
                "slow: GET /api/products 200 1000ms", "slow: GET /api/users 500 2300ms", "slow: POST /api/orders 503 1500ms",
                "[Top3]", "1. GET /api/users 7", "2. GET /api/products 4", "3. GET /api/orders 3"));

        // Parser: comments, blanks and every malformed shape are skipped
        check("bad lines skipped", parse("# c", "", "   ", "bad",
                "2026-11-03T09:00:01 GET /x 700 5",     // status out of range
                "2026-11-03T09:00:01 GET /x 200 -1",    // negative duration
                "2026-11-03T09:00:01 GET x 200 1",      // path without '/'
                "2026-13-03T09:00:01 GET /x 200 1").size(), 0); // bad date

        // Empty input
        check("empty report", all(List.of()), String.join("\n",
                "[Status] total=0", "classes: 1xx=0 2xx=0 3xx=0 4xx=0 5xx=0", "error rate: 0.00%",
                "[Latency] avg=0.00ms p95=0ms slow(>=1000ms)=0", "[Top3]"));

        // Single entry: 1xx class, duration exactly at slow threshold
        check("single entry", all(parse("2026-11-03T09:00:01 GET /a 101 1000")), String.join("\n",
                "[Status] total=1", "101=1", "classes: 1xx=1 2xx=0 3xx=0 4xx=0 5xx=0", "error rate: 0.00%",
                "[Latency] avg=1000.00ms p95=1000ms slow(>=1000ms)=1", "slow: GET /a 101 1000ms",
                "[Top3]", "1. GET /a 1"));

        // Four-way tie: keep 3, by endpoint ascending
        check("tie order", TopEndpointAnalyzer.report(parse(
                "2026-11-03T09:00:01 PUT /z 200 1", "2026-11-03T09:00:01 GET /b 200 1",
                "2026-11-03T09:00:01 GET /a 200 1", "2026-11-03T09:00:01 DELETE /a 200 1")),
                "[Top3]\n1. DELETE /a 1\n2. GET /a 1\n3. GET /b 1");

        // Randomized cross-check against a reference written independently of the analyzers
        Random r = new Random(42);
        String[] endpoints = {"GET /a", "GET /b", "POST /a", "PUT /c", "DELETE /d", "GET /e"};
        for (int t = 0; t < 2000 && failures == 0; t++) {
            int n = 1 + r.nextInt(300);
            List<String> lines = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                lines.add("2026-11-03T09:00:01 " + endpoints[r.nextInt(endpoints.length)] + " "
                        + (100 + r.nextInt(500)) + " " + r.nextInt(3000));
            }
            List<LogEntry> e = List.copyOf(LogEntry.parseAll(lines));
            long[] d = e.stream().mapToLong(LogEntry::durationMs).sorted().toArray();
            String c = "random case " + t + " (n=" + n + ") ";

            check(c + "p95", LatencyAnalyzer.p95(e), d[(int) ((95L * n + 99) / 100) - 1]); // integer nearest-rank
            check(c + "average", String.format("%.6f", LatencyAnalyzer.average(e)),
                    String.format("%.6f", Arrays.stream(d).average().getAsDouble()));
            check(c + "slow count", (long) LatencyAnalyzer.slowRequests(e).size(), Arrays.stream(d).filter(x -> x >= 1000).count());
            check(c + "error rate", String.format("%.6f", StatusCodeAnalyzer.errorRatePercent(e)),
                    String.format("%.6f", e.stream().filter(x -> x.status() >= 400).count() * 100.0 / n));
            check(c + "status sum", StatusCodeAnalyzer.countByStatus(e).values().stream().mapToInt(Integer::intValue).sum(), n);

            Map<String, Long> counts = e.stream().collect(Collectors.groupingBy(LogEntry::endpoint, Collectors.counting()));
            List<String> refTop = counts.entrySet().stream()
                    .sorted(Comparator.<Map.Entry<String, Long>>comparingLong(Map.Entry::getValue).reversed()
                            .thenComparing(Map.Entry::getKey))
                    .limit(3).map(x -> x.getKey() + "=" + x.getValue()).toList();
            check(c + "top3", TopEndpointAnalyzer.top3(e).stream().map(x -> x.getKey() + "=" + x.getValue()).toList(), refTop);
        }

        if (failures > 0) {
            System.out.println(failures + " check(s) failed");
            System.exit(1);
        }
        System.out.println("LogAnalyzerCheck: all checks passed");
    }
}

import java.util.List;
import java.util.Locale;

// Agent B: request latency analysis. Spec: SPEC.md §3.2. Only Agent B edits this file.
public class LatencyAnalyzer {

    /** A request is slow when durationMs >= this value. */
    public static final long SLOW_THRESHOLD_MS = 1000;

    /** Arithmetic mean of durationMs; 0.0 for empty input. */
    public static double average(List<LogEntry> entries) {
        return entries.stream().mapToLong(LogEntry::durationMs).average().orElse(0.0);
    }

    /** P95 by nearest-rank: sorted ascending, element at index ceil(0.95 * n) - 1; 0 for empty input. */
    public static long p95(List<LogEntry> entries) {
        if (entries.isEmpty()) return 0;
        long[] sorted = entries.stream().mapToLong(LogEntry::durationMs).sorted().toArray();
        return sorted[(int) Math.ceil(0.95 * sorted.length) - 1];
    }

    /** Entries with durationMs >= SLOW_THRESHOLD_MS, in original log order. */
    public static List<LogEntry> slowRequests(List<LogEntry> entries) {
        return entries.stream().filter(e -> e.durationMs() >= SLOW_THRESHOLD_MS).toList();
    }

    /** Report section text, exact format in SPEC.md §3.2. */
    public static String report(List<LogEntry> entries) {
        List<LogEntry> slow = slowRequests(entries);
        StringBuilder sb = new StringBuilder(String.format(Locale.ROOT,
                "[Latency] avg=%.2fms p95=%dms slow(>=%dms)=%d",
                average(entries), p95(entries), SLOW_THRESHOLD_MS, slow.size()));
        for (LogEntry e : slow) {
            sb.append("\nslow: ").append(e.endpoint()).append(' ').append(e.status())
              .append(' ').append(e.durationMs()).append("ms");
        }
        return sb.toString();
    }
}

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

// API log analyzer entry point. Shared file: feature branches must not edit it (SPEC.md §4).
// Run (JDK 22+, from this folder): java Main.java [log file]    default: sample-access.log
public class Main {
    public static void main(String[] args) throws Exception {
        Path file = Path.of(args.length > 0 ? args[0] : "sample-access.log");
        List<LogEntry> entries = LogEntry.parseAll(Files.readAllLines(file));

        System.out.println("=== API Log Report === valid=" + entries.size());
        System.out.println(StatusCodeAnalyzer.report(entries));  // Agent A
        System.out.println(LatencyAnalyzer.report(entries));     // Agent B
        System.out.println(TopEndpointAnalyzer.report(entries)); // Agent C
    }
}

import java.util.List;

// Agent B: request latency analysis. Spec: SPEC.md §3.2. Only Agent B edits this file.
public class LatencyAnalyzer {

    /** A request is slow when durationMs >= this value. */
    public static final long SLOW_THRESHOLD_MS = 1000;

    /** Arithmetic mean of durationMs; 0.0 for empty input. */
    public static double average(List<LogEntry> entries) {
        throw new UnsupportedOperationException("TODO Agent B");
    }

    /** P95 by nearest-rank: sorted ascending, element at index ceil(0.95 * n) - 1; 0 for empty input. */
    public static long p95(List<LogEntry> entries) {
        throw new UnsupportedOperationException("TODO Agent B");
    }

    /** Entries with durationMs >= SLOW_THRESHOLD_MS, in original log order. */
    public static List<LogEntry> slowRequests(List<LogEntry> entries) {
        throw new UnsupportedOperationException("TODO Agent B");
    }

    /** Report section text, exact format in SPEC.md §3.2. */
    public static String report(List<LogEntry> entries) {
        throw new UnsupportedOperationException("TODO Agent B");
    }
}

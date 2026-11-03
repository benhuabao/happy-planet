import java.util.List;
import java.util.Map;

// Agent A: HTTP status code statistics. Spec: SPEC.md §3.1. Only Agent A edits this file.
public class StatusCodeAnalyzer {

    /** status -> count, ascending by status; only statuses that occur. */
    public static Map<Integer, Integer> countByStatus(List<LogEntry> entries) {
        throw new UnsupportedOperationException("TODO Agent A");
    }

    /** "1xx".."5xx" -> count; always all five keys, in that order, zeros included. */
    public static Map<String, Integer> countByClass(List<LogEntry> entries) {
        throw new UnsupportedOperationException("TODO Agent A");
    }

    /** (4xx + 5xx) / total * 100; 0.0 for empty input. */
    public static double errorRatePercent(List<LogEntry> entries) {
        throw new UnsupportedOperationException("TODO Agent A");
    }

    /** Report section text, exact format in SPEC.md §3.1. */
    public static String report(List<LogEntry> entries) {
        throw new UnsupportedOperationException("TODO Agent A");
    }
}

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;

// Agent A: HTTP status code statistics. Spec: SPEC.md §3.1. Only Agent A edits this file.
public class StatusCodeAnalyzer {

    /** status -> count, ascending by status; only statuses that occur. */
    public static Map<Integer, Integer> countByStatus(List<LogEntry> entries) {
        Map<Integer, Integer> counts = new TreeMap<>();
        for (LogEntry e : entries) counts.merge(e.status(), 1, Integer::sum);
        return counts;
    }

    /** "1xx".."5xx" -> count; always all five keys, in that order, zeros included. */
    public static Map<String, Integer> countByClass(List<LogEntry> entries) {
        Map<String, Integer> counts = new LinkedHashMap<>();
        for (int c = 1; c <= 5; c++) counts.put(c + "xx", 0);
        for (LogEntry e : entries) counts.merge(e.status() / 100 + "xx", 1, Integer::sum);
        return counts;
    }

    /** (4xx + 5xx) / total * 100; 0.0 for empty input. */
    public static double errorRatePercent(List<LogEntry> entries) {
        if (entries.isEmpty()) return 0.0;
        Map<String, Integer> classes = countByClass(entries);
        return (classes.get("4xx") + classes.get("5xx")) * 100.0 / entries.size();
    }

    /** Report section text, exact format in SPEC.md §3.1. */
    public static String report(List<LogEntry> entries) {
        StringBuilder sb = new StringBuilder("[Status] total=").append(entries.size());
        countByStatus(entries).forEach((status, n) -> sb.append('\n').append(status).append('=').append(n));
        sb.append("\nclasses:");
        countByClass(entries).forEach((cls, n) -> sb.append(' ').append(cls).append('=').append(n));
        sb.append(String.format(Locale.ROOT, "\nerror rate: %.2f%%", errorRatePercent(entries)));
        return sb.toString();
    }
}

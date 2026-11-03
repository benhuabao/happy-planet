import java.util.List;
import java.util.Map;

// Agent C: endpoint traffic TOP 3. Spec: SPEC.md §3.3. Only Agent C edits this file.
public class TopEndpointAnalyzer {

    /** Up to 3 (endpoint, count) pairs: count descending, ties by endpoint ascending (String.compareTo). */
    public static List<Map.Entry<String, Integer>> top3(List<LogEntry> entries) {
        throw new UnsupportedOperationException("TODO Agent C");
    }

    /** Report section text, exact format in SPEC.md §3.3. */
    public static String report(List<LogEntry> entries) {
        throw new UnsupportedOperationException("TODO Agent C");
    }
}

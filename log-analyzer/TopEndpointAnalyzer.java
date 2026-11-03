import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

// Agent C: endpoint traffic TOP 3. Spec: SPEC.md §3.3. Only Agent C edits this file.
public class TopEndpointAnalyzer {

    /** Up to 3 (endpoint, count) pairs: count descending, ties by endpoint ascending (String.compareTo). */
    public static List<Map.Entry<String, Integer>> top3(List<LogEntry> entries) {
        Map<String, Integer> counts = new TreeMap<>();
        for (LogEntry e : entries) counts.merge(e.endpoint(), 1, Integer::sum);
        // TreeMap iterates keys ascending and sort is stable, so ties keep String.compareTo order
        return counts.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue(Comparator.reverseOrder()))
                .limit(3)
                .toList();
    }

    /** Report section text, exact format in SPEC.md §3.3. */
    public static String report(List<LogEntry> entries) {
        StringBuilder sb = new StringBuilder("[Top3]");
        List<Map.Entry<String, Integer>> top = top3(entries);
        for (int i = 0; i < top.size(); i++) {
            sb.append('\n').append(i + 1).append(". ").append(top.get(i).getKey()).append(' ').append(top.get(i).getValue());
        }
        return sb.toString();
    }
}

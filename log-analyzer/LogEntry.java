import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// Shared contract: one parsed access-log line. Read-only on feature branches (SPEC.md §4).
public record LogEntry(LocalDateTime time, String method, String path, int status, long durationMs) {

    /** Endpoint key used by every statistic, e.g. "GET /api/users". */
    public String endpoint() {
        return method + " " + path;
    }

    /** Parses one line; returns null for blank, comment or malformed lines (rules: SPEC.md §1). */
    public static LogEntry parse(String line) {
        String s = line.strip();
        if (s.isEmpty() || s.startsWith("#")) return null;
        String[] f = s.split("\\s+");
        if (f.length != 5 || !f[2].startsWith("/")) return null;
        try {
            LocalDateTime time = LocalDateTime.parse(f[0]);
            int status = Integer.parseInt(f[3]);
            long duration = Long.parseLong(f[4]);
            if (status < 100 || status > 599 || duration < 0) return null;
            int q = f[2].indexOf('?');
            return new LogEntry(time, f[1], q < 0 ? f[2] : f[2].substring(0, q), status, duration);
        } catch (RuntimeException e) { // DateTimeParseException / NumberFormatException
            return null;
        }
    }

    /** Valid entries in original log order; malformed lines are skipped. */
    public static List<LogEntry> parseAll(List<String> lines) {
        List<LogEntry> out = new ArrayList<>();
        for (String line : lines) {
            LogEntry e = parse(line);
            if (e != null) out.add(e);
        }
        return out;
    }
}

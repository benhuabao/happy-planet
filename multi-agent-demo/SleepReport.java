// Agent B: sleep summary. Goal is 480 minutes (8h) per day.
public class SleepReport {
    static final int GOAL_MINUTES = 480;

    static String summary(int minutes) {
        if (minutes < 0) {
            return "Sleep: invalid input (" + minutes + " minutes)";
        }
        String status = minutes >= GOAL_MINUTES
                ? "goal reached"
                : "goal not reached, " + (GOAL_MINUTES - minutes) + " min short";
        return "Sleep: " + minutes / 60 + "h " + minutes % 60 + "m (" + status + ")";
    }
}

// Sleep module of the daily health report. Input in hours; goal is 480 minutes (8h) per day.
public class SleepReport {
    static final int GOAL_MINUTES = 480;
    static final int MAX_HOURS = 24;

    static String summary(double hours) {
        // Validate before converting; isFinite rejects NaN/Infinity, which range comparisons alone can miss.
        if (!Double.isFinite(hours) || hours < 0 || hours > MAX_HOURS) {
            return "Sleep: invalid input (" + hours + "h), must be between 0 and " + MAX_HOURS + " hours";
        }
        return GoalReport.summary("Sleep", "min", (int) Math.round(hours * 60), GOAL_MINUTES);
    }
}

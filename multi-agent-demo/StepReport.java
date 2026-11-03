// Step module of the daily health report. Goal: 10000 steps per day.
public class StepReport {
    static final int DAILY_GOAL = 10000;

    static String summary(int steps) {
        return GoalReport.summary("Steps", "", steps, DAILY_GOAL);
    }
}

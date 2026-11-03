// Water module of the daily health report. Goal: 2000 ml per day.
public class WaterReport {
    static final int DAILY_GOAL_ML = 2000;

    static String summary(int ml) {
        return GoalReport.summary("Water", "ml", ml, DAILY_GOAL_ML);
    }
}

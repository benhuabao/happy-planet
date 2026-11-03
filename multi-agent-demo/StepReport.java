// Agent A: step module of the daily health report. Goal: 10000 steps per day.
public class StepReport {
    static final int DAILY_GOAL = 10000;

    static String summary(int steps) {
        if (steps < 0) {
            return "Steps: invalid input (" + steps + "), steps cannot be negative";
        }
        if (steps >= DAILY_GOAL) {
            return "Steps: " + steps + " - goal reached (" + DAILY_GOAL + ")";
        }
        return "Steps: " + steps + " - " + (DAILY_GOAL - steps) + " short of goal (" + DAILY_GOAL + ")";
    }

    // Self-check. Run: javac StepReport.java && java -ea StepReport
    public static void main(String[] args) {
        assert summary(-1).equals("Steps: invalid input (-1), steps cannot be negative");
        assert summary(0).equals("Steps: 0 - 10000 short of goal (10000)");
        assert summary(9999).equals("Steps: 9999 - 1 short of goal (10000)");
        assert summary(10000).equals("Steps: 10000 - goal reached (10000)");
        assert summary(15000).equals("Steps: 15000 - goal reached (10000)");
        System.out.println("StepReport: all checks passed");
    }
}

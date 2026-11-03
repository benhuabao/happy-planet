public class WaterReport {
    private static final int DAILY_GOAL_ML = 2000;

    public static String summary(int ml) {
        if (ml < 0) {
            return "Water: invalid input (" + ml + "ml)";
        }
        if (ml >= DAILY_GOAL_ML) {
            return "Water: " + ml + "ml - goal reached";
        }
        return "Water: " + ml + "ml - " + (DAILY_GOAL_ML - ml) + "ml short of " + DAILY_GOAL_ML + "ml goal";
    }
}

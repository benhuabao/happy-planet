// Shared "value vs. daily goal" formatting so all modules print the same shape.
final class GoalReport {
    static String summary(String label, String unit, int value, int goal) {
        if (value < 0) {
            return label + ": invalid input (" + value + unit + "), must not be negative";
        }
        if (value >= goal) {
            return label + ": " + value + unit + " - goal reached (" + goal + unit + ")";
        }
        return label + ": " + value + unit + " - " + (goal - value) + unit + " short of goal (" + goal + unit + ")";
    }
}

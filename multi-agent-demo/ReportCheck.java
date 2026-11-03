// Self-check through the Calculator.evaluate entry points. No -ea needed; exits 1 on failure.
// Run: javac *.java && java ReportCheck
public class ReportCheck {
    static int failures = 0;

    static void check(String actual, String expected) {
        if (!actual.equals(expected)) {
            failures++;
            System.out.println("FAIL\n  got:      " + actual + "\n  expected: " + expected);
        }
    }

    static void invalid(String actual, String prefix) {
        if (!actual.startsWith(prefix)) {
            failures++;
            System.out.println("FAIL\n  got:      " + actual + "\n  expected prefix: " + prefix);
        }
    }

    public static void main(String[] args) {
        // Steps, goal 10000
        invalid(StepCalculator.evaluate(-1), "Steps: invalid input (-1)");
        check(StepCalculator.evaluate(0), "Steps: 0 - 10000 short of goal (10000)");
        check(StepCalculator.evaluate(8000), "Steps: 8000 - 2000 short of goal (10000)");
        check(StepCalculator.evaluate(9999), "Steps: 9999 - 1 short of goal (10000)");
        check(StepCalculator.evaluate(10000), "Steps: 10000 - goal reached (10000)");
        check(StepCalculator.evaluate(15000), "Steps: 15000 - goal reached (10000)");

        // Water, goal 2000 ml
        invalid(WaterCalculator.evaluate(-1), "Water: invalid input (-1ml)");
        check(WaterCalculator.evaluate(0), "Water: 0ml - 2000ml short of goal (2000ml)");
        check(WaterCalculator.evaluate(1800), "Water: 1800ml - 200ml short of goal (2000ml)");
        check(WaterCalculator.evaluate(1999), "Water: 1999ml - 1ml short of goal (2000ml)");
        check(WaterCalculator.evaluate(2000), "Water: 2000ml - goal reached (2000ml)");
        check(WaterCalculator.evaluate(3000), "Water: 3000ml - goal reached (2000ml)");

        // Sleep, input hours, goal 480 min
        check(SleepCalculator.evaluate(0), "Sleep: 0min - 480min short of goal (480min)");
        check(SleepCalculator.evaluate(7.5), "Sleep: 450min - 30min short of goal (480min)");
        check(SleepCalculator.evaluate(7.99), "Sleep: 479min - 1min short of goal (480min)");   // 479.4 rounds down
        check(SleepCalculator.evaluate(7.9999), "Sleep: 480min - goal reached (480min)");       // 479.994 rounds up
        check(SleepCalculator.evaluate(8), "Sleep: 480min - goal reached (480min)");
        check(SleepCalculator.evaluate(24), "Sleep: 1440min - goal reached (480min)");
        invalid(SleepCalculator.evaluate(-0.1), "Sleep: invalid input");
        invalid(SleepCalculator.evaluate(24.01), "Sleep: invalid input");
        invalid(SleepCalculator.evaluate(1e10), "Sleep: invalid input");
        invalid(SleepCalculator.evaluate(Double.NaN), "Sleep: invalid input (NaN");
        invalid(SleepCalculator.evaluate(Double.POSITIVE_INFINITY), "Sleep: invalid input (Infinity");
        invalid(SleepCalculator.evaluate(Double.NEGATIVE_INFINITY), "Sleep: invalid input (-Infinity");

        if (failures > 0) {
            System.out.println(failures + " check(s) failed");
            System.exit(1);
        }
        System.out.println("ReportCheck: all checks passed");
    }
}

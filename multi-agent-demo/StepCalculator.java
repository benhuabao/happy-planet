// Step evaluation entry point used by Main; delegates to StepReport.
public class StepCalculator {
    public static String evaluate(int steps) {
        return StepReport.summary(steps);
    }
}

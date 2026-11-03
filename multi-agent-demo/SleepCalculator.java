// Sleep evaluation entry point used by Main; delegates to SleepReport (input in hours).
public class SleepCalculator {
    public static String evaluate(double hours) {
        return SleepReport.summary(hours);
    }
}

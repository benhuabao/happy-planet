// Water evaluation entry point used by Main; delegates to WaterReport.
public class WaterCalculator {
    public static String evaluate(int waterMl) {
        return WaterReport.summary(waterMl);
    }
}

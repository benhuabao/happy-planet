// Daily health report. Each calculator is owned by one agent and lives in its own file.
// Run: javac Main.java StepCalculator.java SleepCalculator.java WaterCalculator.java && java Main
public class Main {
    public static void main(String[] args) {
        int steps = 8000;
        double sleepHours = 7.5;
        int waterMl = 1800;

        System.out.println("=== Daily Health Report ===");
        System.out.println(StepCalculator.evaluate(steps));      // Agent A
        System.out.println(SleepCalculator.evaluate(sleepHours)); // Agent B
        System.out.println(WaterCalculator.evaluate(waterMl));    // Agent C
    }
}

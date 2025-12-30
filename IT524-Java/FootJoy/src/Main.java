import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Welcome to HaliSahaSim - 3x3 Football Simulator");
        System.out.print("Enter match duration in seconds: ");
        
        try {
            int duration = scanner.nextInt();
            if (duration <= 0) {
                throw new IllegalArgumentException("Duration must be positive");
            }
            
            MatchController controller = new MatchController(duration);

            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                System.out.println("\nShutting down simulator...");
                controller.stopMatch();
            }));

            Thread matchThread = new Thread(() -> {
                try {
                    controller.startMatch();
                } catch (GameException e) {
                    System.err.println("Match error: " + e.getMessage());
                }
            });
            
            matchThread.start();

            matchThread.join();
            
            System.out.println("\nMatch completed!");
            
        } catch (InputMismatchException e) {
            System.err.println("Invalid input. Please enter a number.");
        } catch (IllegalArgumentException e) {
            System.err.println("Invalid duration: " + e.getMessage());
        } catch (InterruptedException e) {
            System.err.println("Simulation interrupted.");
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            scanner.close();
        }
    }
}
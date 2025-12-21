import java.util.Scanner;

public class DepositHelper {
    public static void deposit(Scanner sc, AccountsManager manager) {
        System.out.print("Hesap No: ");
        String acc = sc.nextLine();

        System.out.print("Tutar: ");
        double amt = Double.parseDouble(sc.nextLine());

        manager.deposit(acc, amt);
    }
}

import java.util.Scanner;

public class WithdrawHelper {
    public static void withdraw(Scanner sc, AccountsManager manager) {
        System.out.print("Hesap No: ");
        String acc = sc.nextLine();

        System.out.print("Tutar: ");
        double amt = Double.parseDouble(sc.nextLine());

        manager.withdraw(acc, amt);
    }
}

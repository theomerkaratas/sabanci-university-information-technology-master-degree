import java.util.Scanner;

public class TransferHelper {
    public static void transfer(Scanner sc, AccountsManager manager) {
        System.out.print("Kaynak Hesap: ");
        String from = sc.nextLine();

        System.out.print("Hedef Hesap: ");
        String to = sc.nextLine();

        System.out.print("Tutar: ");
        double amt = Double.parseDouble(sc.nextLine());

        manager.transferWithCurrencyConversion(from, to, amt);
    }
}

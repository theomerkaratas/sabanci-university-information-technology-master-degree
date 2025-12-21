import java.time.LocalDate;
import java.util.Scanner;

public class AccountCreationHelper {
    public static void createAccount(Scanner sc, AccountsManager manager) {
        System.out.print("Hesap No: ");
        String accNo = sc.nextLine();

        System.out.print("Sahip Adı: ");
        String owner = sc.nextLine();

        System.out.print("Bakiye: ");
        double balance = Double.parseDouble(sc.nextLine());

        System.out.print("Para Birimi (TRY/USD/EUR): ");
        AccountType type = ValidationUtils.parseAccountType(sc.nextLine());

        System.out.print("Hesap Türü (CHECKING/SAVINGS): ");
        String kind = sc.nextLine();

        LocalDate today = LocalDate.now();

        BaseAccount account;
        if (kind.equalsIgnoreCase("CHECKING")) {
            account = new CheckingAccount(accNo, owner, balance, type, today);
        } else {
            account = new SavingsAccount(accNo, owner, balance, type, today);
        }

        AccountAdder.addAccount(manager, account);
    }
}

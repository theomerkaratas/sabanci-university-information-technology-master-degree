import java.util.Scanner;

public class StatusChangeHelper {
    public static void changeStatus(Scanner sc, AccountsManager manager) {
        System.out.print("Hesap No: ");
        String acc = sc.nextLine();

        System.out.print("Yeni Durum (ACTIVE/FROZEN/CLOSED): ");
        AccountStatus status = AccountStatus.valueOf(sc.nextLine().toUpperCase());

        manager.changeAccountStatus(acc, status);
    }
}

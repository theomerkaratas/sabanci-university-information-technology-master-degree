import java.util.Scanner;

public class FrozenAccountHandler {
    public static boolean handleIfFrozen(BaseAccount acc, Scanner sc, AccountsManager manager) {
        if (acc != null && acc.getStatus() != null && acc.getStatus().toString().equalsIgnoreCase("FROZEN")) {
            System.out.print("Bu hesap FROZEN. Hesap durumunu geri aktive edeyim mi? (yes/no): ");
            String answer = sc.nextLine();
            if (answer.equalsIgnoreCase("yes")) {
                acc.setStatus(AccountStatus.ACTIVE);
                System.out.println("[BİLGİ] Hesap durumu ACTIVE olarak güncellendi.");
                return true;
            } else {
                System.out.println("[HATA] İşlem gerçekleştirilemedi. Hesap FROZEN durumda.");
                return false;
            }
        }
        return true;
    }
}

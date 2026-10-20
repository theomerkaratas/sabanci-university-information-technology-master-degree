import java.util.List;

public class AccountSaver {
    public static void saveAccounts(Object storage, List<BaseAccount> accounts) {
        if (storage instanceof AccountsStorage) {
            try {
                ((AccountsStorage) storage).save(accounts);
            } catch (Exception e) {
                System.out.println("[WARN] CSV kaydedilemedi: " + e.getMessage());
            }
        }
    }
}

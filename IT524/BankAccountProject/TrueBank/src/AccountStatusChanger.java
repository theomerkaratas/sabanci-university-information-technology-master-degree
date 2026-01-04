import java.util.List;

public class AccountStatusChanger {
    public static void changeAccountStatus(List<BaseAccount> accounts, String accNo, AccountStatus status, Object storage) {
        BaseAccount acc = null;
        for (BaseAccount a : accounts) {
            if (a.getAccountNumber().equals(accNo)) {
                acc = a;
                break;
            }
        }
        if (acc == null)
            throw new DomainExceptions.AccountNotFoundException("Hesap bulunamadı: " + accNo);

        acc.setStatus(status);
        if (storage instanceof AccountsStorage) {
            try {
                ((AccountsStorage) storage).save(accounts);
            } catch (Exception e) {
                System.out.println("[WARN] CSV kaydedilemedi: " + e.getMessage());
            }
        }
        System.out.println("[INFO] Hesap durumu güncellendi: " + status);
    }
}

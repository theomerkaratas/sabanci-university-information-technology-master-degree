import java.util.ArrayList;
import java.util.List;

public class AccountsManager {

    private final ArrayList<BaseAccount> accounts = new ArrayList<>();
    private final ArrayList<Transaction> transactions = new ArrayList<>();
    private AccountsStorage storage;

    public AccountsManager() {}

    public AccountsManager(AccountsStorage storage) {
        this.storage = storage;
        try {
            List<BaseAccount> loaded = storage.load();
            accounts.addAll(loaded);
            System.out.println("[INFO] " + loaded.size() + " hesap yüklendi.");
        } catch (Exception e) {
            System.out.println("[WARN] Hesaplar yüklenemedi: " + e.getMessage());
        }
    }

    // ================= HESAP EKLE =================
    public void addAccount(BaseAccount account) {
        accounts.add(account);
        transactions.add(new Transaction(
                account.getAccountNumber(),
                "create",
                account.getBalance()
        ));
        save();
        System.out.println("[INFO] Hesap eklendi: " + account.getAccountNumber());
    }

    // ================= PARA YATIR =================
    public void deposit(String accNo, double amount) {
        ValidationUtils.requirePositive(amount, "Yatırılacak tutar");

        BaseAccount acc = findAccount(accNo);
        if (acc == null)
            throw new DomainExceptions.AccountNotFoundException("Hesap bulunamadı: " + accNo);

        acc.deposit(amount);
        transactions.add(new Transaction(accNo, "deposit", amount));
        save();
    }

    // ================= PARA ÇEK =================
    public void withdraw(String accNo, double amount) {
        ValidationUtils.requirePositive(amount, "Çekilecek tutar");

        BaseAccount acc = findAccount(accNo);
        if (acc == null)
            throw new DomainExceptions.AccountNotFoundException("Hesap bulunamadı: " + accNo);

        acc.withdraw(amount);
        transactions.add(new Transaction(accNo, "withdraw", amount));
        save();
    }

    // ================= KUR DÖNÜŞÜMLÜ TRANSFER =================
    public void transferWithCurrencyConversion(String fromNo, String toNo, double amount) {
        ValidationUtils.requirePositive(amount, "Transfer tutarı");

        BaseAccount from = findAccount(fromNo);
        BaseAccount to = findAccount(toNo);

        if (from == null)
            throw new DomainExceptions.AccountNotFoundException("Kaynak hesap yok: " + fromNo);
        if (to == null)
            throw new DomainExceptions.AccountNotFoundException("Hedef hesap yok: " + toNo);

        // Kaynaktan çek
        from.withdraw(amount);

        // TRY'ye çevir
        double tryAmount =
            CurrencyConverter.toTRY(amount, from.getAccountType().name());

        // Hedef para birimine çevir
        double finalAmount;
        if (to.getAccountType() == AccountType.TRY) {
            finalAmount = tryAmount;
        } else if (to.getAccountType() == AccountType.USD) {
            finalAmount = tryAmount / 30.0;
        } else {
            finalAmount = tryAmount / 33.0;
        }

        to.deposit(finalAmount);

        transactions.add(new Transaction(fromNo, "transfer-out", amount));
        transactions.add(new Transaction(toNo, "transfer-in", finalAmount));

        save();
        System.out.println("[INFO] Kur dönüşümlü transfer tamamlandı.");
    }

    // ================= HESAP DURUMU =================
    public void changeAccountStatus(String accNo, AccountStatus status) {
        BaseAccount acc = findAccount(accNo);
        if (acc == null)
            throw new DomainExceptions.AccountNotFoundException("Hesap bulunamadı: " + accNo);

        acc.setStatus(status);
        save();
        System.out.println("[INFO] Hesap durumu güncellendi: " + status);
    }

    // ================= LİSTELEME =================
    public void listAccounts() {
        System.out.println("=== HESAPLAR ===");
        for (BaseAccount acc : accounts) {
            System.out.println(
                    "No: " + acc.getAccountNumber()
                    + " | Sahip: " + acc.getOwnerName()
                    + " | Bakiye: " + acc.getBalance()
                    + " | Para: " + acc.getAccountType()
                    + " | Tip: " + acc.getClass().getSimpleName()
                    + " | Durum: " + acc.getStatus()
            );
        }
    }

    public void listTransactions() {
        System.out.println("=== İŞLEM GEÇMİŞİ ===");
        for (Transaction t : transactions) {
            System.out.println(t);
        }
    }

    public void transfer(String from, String to, double amount) {
        transferWithCurrencyConversion(from, to, amount);
    }

    private BaseAccount findAccount(String accNo) {
        for (BaseAccount acc : accounts) {
            if (acc.getAccountNumber().equals(accNo)) {
                return acc;
            }
        }
        return null;
    }

    private void save() {
        if (storage != null) {
            try {
                storage.save(accounts);
            } catch (Exception e) {
                System.out.println("[WARN] CSV kaydedilemedi: " + e.getMessage());
            }
        }
    }
}

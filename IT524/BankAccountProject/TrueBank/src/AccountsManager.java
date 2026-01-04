import java.util.ArrayList;
import java.util.List;

public class AccountsManager implements AccountOperations, TransactionHistory {

    final ArrayList<BaseAccount> accounts = new ArrayList<>();
    final ArrayList<Transaction> transactions = new ArrayList<>();
    private Object storage;

    public AccountsManager() {}

    public AccountsManager(Object storage) {
        this.storage = storage;
        try {
            List<BaseAccount> loaded;
            if (storage instanceof AccountsStorage) {
                loaded = ((AccountsStorage) storage).load();
            } else if (storage instanceof DatabaseAccountsStorage) {
                loaded = ((DatabaseAccountsStorage) storage).load();
            } else {
                throw new IllegalArgumentException("Desteklenmeyen storage tipi");
            }
            accounts.addAll(loaded);
            System.out.println("[INFO] " + loaded.size() + " hesap yüklendi.");
        } catch (Exception e) {
            System.out.println("[WARN] Hesaplar yüklenemedi: " + e.getMessage());
        }
    }

    public void deposit(String accNo, double amount) {
        ValidationUtils.requirePositive(amount, "Yatırılacak tutar");

        BaseAccount acc = findAccount(accNo);
        if (acc == null)
            throw new DomainExceptions.AccountNotFoundException("Hesap bulunamadı: " + accNo);

        acc.deposit(amount);
        transactions.add(new Transaction(accNo, "deposit", amount));
        save();
    }

    public void withdraw(String accNo, double amount) {
        ValidationUtils.requirePositive(amount, "Çekilecek tutar");

        BaseAccount acc = findAccount(accNo);
        if (acc == null)
            throw new DomainExceptions.AccountNotFoundException("Hesap bulunamadı: " + accNo);

        acc.withdraw(amount);
        transactions.add(new Transaction(accNo, "withdraw", amount));
        save();
    }
    public void transferWithCurrencyConversion(String fromNo, String toNo, double amount) {
        CurrencyTransferHelper.transferWithCurrencyConversion(accounts, transactions, fromNo, toNo, amount, storage);
    }

    public void changeAccountStatus(String accNo, AccountStatus status) {
        AccountStatusChanger.changeAccountStatus(accounts, accNo, status, storage);
    }

    public void listAccounts() {
        AccountPrinter.listAccounts(accounts);
    }

    public void listTransactions() {
        TransactionPrinter.printTransactions(transactions);
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

    public BaseAccount findAccountByNumber(String accNo) {
        return findAccount(accNo);
    }

    void save() {
        AccountSaver.saveAccounts(storage, accounts);
    }
}

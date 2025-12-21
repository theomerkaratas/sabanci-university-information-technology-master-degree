public class BankApp {

    private final AccountsManager manager;

    public BankApp(AccountsManager manager) {
        this.manager = manager;
    }

    public void addAccount(BaseAccount account) {
        AccountAdder.addAccount(manager, account);
    }

    public void transfer(String from, String to, double amount) {
        manager.transferWithCurrencyConversion(from, to, amount);
    }

    public void showAccounts() {
        manager.listAccounts();
    }

    public void saveAll() {
        // AccountsManager zaten otomatik kaydediyor
    }
}

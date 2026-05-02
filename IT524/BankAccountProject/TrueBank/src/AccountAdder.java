public class AccountAdder {
    private AccountAdder() {}

    public static void addAccount(AccountsManager manager, BaseAccount account) {
        manager.accounts.add(account);
        manager.transactions.add(new Transaction(
                account.getAccountNumber(),
                "create",
                account.getBalance()
        ));
        manager.save();
        System.out.println("[INFO] Hesap eklendi: " + account.getAccountNumber());
    }
}

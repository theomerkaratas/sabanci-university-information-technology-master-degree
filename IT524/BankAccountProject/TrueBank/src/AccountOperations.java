public interface AccountOperations {
    void deposit(String accNo, double amount);
    void withdraw(String accNo, double amount);
    void transfer(String from, String to, double amount);
    void changeAccountStatus(String accNo, AccountStatus status);
    void listAccounts();
    void listTransactions();
}

import java.time.LocalDate;

public abstract class BaseAccount {

    protected String accountNumber;
    protected String ownerName;
    protected double balance;
    protected AccountType accountType;
    protected LocalDate openDate;
    protected AccountStatus status = AccountStatus.ACTIVE;

    public BaseAccount(String accNo, String owner, double balance,
                       AccountType type, LocalDate openDate) {

        ValidationUtils.requireNonEmpty(accNo, "Hesap numarası");
        ValidationUtils.requirePositive(balance, "Bakiye");

        this.accountNumber = accNo;
        this.ownerName = owner;
        this.balance = balance;
        this.accountType = type;
        this.openDate = openDate;
    }

    public abstract void withdraw(double amount);

    public void deposit(double amount) {
        balance += amount;
    }

    public String toCsv() {
        return String.join(",",
                accountNumber,
                ownerName,
                String.valueOf(balance),
                accountType.name(),
                openDate.toString(),
                status.name(),
                getClass().getSimpleName()
        );
    }

    public String getAccountNumber() { return accountNumber; }
    public String getOwnerName() { return ownerName; }
    public double getBalance() { return balance; }
    public AccountType getAccountType() { return accountType; }
    public AccountStatus getStatus() { return status; }
    public void setStatus(AccountStatus status) { this.status = status; }
}

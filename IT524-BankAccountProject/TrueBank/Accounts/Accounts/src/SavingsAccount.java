import java.time.LocalDate;

public class SavingsAccount extends BaseAccount {

    private static final double MIN_BALANCE = 100.0;

    public SavingsAccount(String accNo, String owner, double balance,
                          AccountType type, LocalDate openDate) {
        super(accNo, owner, balance, type, openDate);
    }

    @Override
    public void withdraw(double amount) {
        if (balance - amount < MIN_BALANCE) {
            throw new DomainExceptions.InsufficientFundsException(
                    "Minimum bakiye 100 olmalı");
        }
        balance -= amount;
    }
}

import java.time.LocalDate;

public class CheckingAccount extends BaseAccount {

    public CheckingAccount(String accNo, String owner, double balance,
                           AccountType type, LocalDate openDate) {
        super(accNo, owner, balance, type, openDate);
    }

    @Override
    public void withdraw(double amount) {
        if (balance < amount) {
            throw new DomainExceptions.InsufficientFundsException("Yetersiz bakiye");
        }
        balance -= amount;
    }
}

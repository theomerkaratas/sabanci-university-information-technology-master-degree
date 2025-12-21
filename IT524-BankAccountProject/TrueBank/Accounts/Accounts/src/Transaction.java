import java.time.LocalDateTime;

public class Transaction {

    private String accountNumber;
    private String type;
    private double amount;
    private LocalDateTime date;

    public Transaction(String accountNumber, String type, double amount) {
        this.accountNumber = accountNumber;
        this.type = type;
        this.amount = amount;
        this.date = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return date + " | " + type + " | " + amount + " | " + accountNumber;
    }
}

import java.util.List;

public class AccountPrinter {

    public static void listAccounts(List<BaseAccount> accounts) {
        String format = "| %-12s | %-15s | %12.2f | %-10s | %-10s | %-15s |%n";
        String headerFormat = "| %-12s | %-15s | %-12s | %-10s | %-10s | %-15s |%n";
        String line = "+--------------+-----------------+--------------+------------+------------+-----------------+";
        System.out.println(line);
        System.out.printf(headerFormat, "accountNumber", "ownerName", "balance", "accountType", "status", "className");
        System.out.println(line);
        for (BaseAccount acc : accounts) {
            System.out.printf(format,
                    acc.getAccountNumber(),
                    acc.getOwnerName(),
                    acc.getBalance(),
                    acc.getAccountType(),
                    acc.getStatus(),
                    acc.getClass().getSimpleName()
            );
        }
        System.out.println(line);
    }
}
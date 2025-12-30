import java.util.List;

public class TransactionPrinter {
    public static void printTransactions(List<Transaction> transactions) {
        System.out.println("=== İŞLEM GEÇMİŞİ ===");
        for (Transaction t : transactions) {
            System.out.println(t);
        }
    }
}

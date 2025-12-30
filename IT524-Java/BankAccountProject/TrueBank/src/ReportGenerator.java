public class ReportGenerator {
    public static void generateAccountSummary(BaseAccount account) {
        System.out.println("=== Hesap Özeti ===");
        System.out.println("No: " + account.getAccountNumber());
        System.out.println("Sahip: " + account.getOwnerName());
        System.out.println("Bakiye: " + account.getBalance());
        System.out.println("Durum: " + account.getStatus());
    }
}

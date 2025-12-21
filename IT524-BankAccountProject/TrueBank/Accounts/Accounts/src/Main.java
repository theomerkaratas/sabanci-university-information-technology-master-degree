import java.time.LocalDate;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        AccountsStorage storage = new AccountsStorage("account.csv");
        AccountsManager manager = new AccountsManager(storage);

        Scanner sc = new Scanner(System.in);

        System.out.println("🏦 BANKACILIK UYGULAMASINA HOŞ GELDİN");

        while (true) {
            System.out.println("\n===== ANA MENÜ =====");
            System.out.println("1 - Hesapları Listele");
            System.out.println("2 - Yeni Hesap Aç");
            System.out.println("3 - Para Yatır");
            System.out.println("4 - Para Çek");
            System.out.println("5 - Para Transferi (Kur Dönüşümlü)");
            System.out.println("6 - Hesap Durumu Değiştir");
            System.out.println("7 - İşlem Geçmişi");
            System.out.println("8 - Çıkış");
            System.out.print("Seçimin: ");

            int choice = Integer.parseInt(sc.nextLine());

            try {
                switch (choice) {

                    case 1:
                        manager.listAccounts();
                        break;

                    case 2:
                        createAccount(sc, manager);
                        break;

                    case 3:
                        deposit(sc, manager);
                        break;

                    case 4:
                        withdraw(sc, manager);
                        break;

                    case 5:
                        transfer(sc, manager);
                        break;

                    case 6:
                        changeStatus(sc, manager);
                        break;

                    case 7:
                        manager.listTransactions();
                        break;

                    case 8:
                        System.out.println("Çıkış yapıldı.");
                        return;

                    default:
                        System.out.println("Geçersiz seçim.");
                }
            } catch (Exception e) {
                System.out.println("[HATA] " + e.getMessage());
            }
        }
    }

    // ================== YARDIMCI METOTLAR ==================

    private static void createAccount(Scanner sc, AccountsManager manager) {
        System.out.print("Hesap No: ");
        String accNo = sc.nextLine();

        System.out.print("Sahip Adı: ");
        String owner = sc.nextLine();

        System.out.print("Bakiye: ");
        double balance = Double.parseDouble(sc.nextLine());

        System.out.print("Para Birimi (TRY/USD/EUR): ");
        AccountType type = ValidationUtils.parseAccountType(sc.nextLine());

        System.out.print("Hesap Türü (CHECKING/SAVINGS): ");
        String kind = sc.nextLine();

        LocalDate today = LocalDate.now();

        BaseAccount account;
        if (kind.equalsIgnoreCase("CHECKING")) {
            account = new CheckingAccount(accNo, owner, balance, type, today);
        } else {
            account = new SavingsAccount(accNo, owner, balance, type, today);
        }

        manager.addAccount(account);
    }

    private static void deposit(Scanner sc, AccountsManager manager) {
        System.out.print("Hesap No: ");
        String acc = sc.nextLine();

        System.out.print("Tutar: ");
        double amt = Double.parseDouble(sc.nextLine());

        manager.deposit(acc, amt);
    }

    private static void withdraw(Scanner sc, AccountsManager manager) {
        System.out.print("Hesap No: ");
        String acc = sc.nextLine();

        System.out.print("Tutar: ");
        double amt = Double.parseDouble(sc.nextLine());

        manager.withdraw(acc, amt);
    }

    private static void transfer(Scanner sc, AccountsManager manager) {
        System.out.print("Kaynak Hesap: ");
        String from = sc.nextLine();

        System.out.print("Hedef Hesap: ");
        String to = sc.nextLine();

        System.out.print("Tutar: ");
        double amt = Double.parseDouble(sc.nextLine());

        manager.transferWithCurrencyConversion(from, to, amt);
    }

    private static void changeStatus(Scanner sc, AccountsManager manager) {
        System.out.print("Hesap No: ");
        String acc = sc.nextLine();

        System.out.print("Yeni Durum (ACTIVE/FROZEN/CLOSED): ");
        AccountStatus status = AccountStatus.valueOf(sc.nextLine().toUpperCase());

        manager.changeAccountStatus(acc, status);
    }
}

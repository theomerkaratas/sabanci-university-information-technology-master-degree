import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        AccountsStorage storage = new AccountsStorage("account.csv");
        AccountsManager manager = new AccountsManager(storage);

        Scanner sc = new Scanner(System.in);

        System.out.println("🏦 BANKACILIK UYGULAMASINA HOŞ GELDİN");

        while (true) {
            MenuPrinter.printMenu();

            int choice = Integer.parseInt(sc.nextLine());

            try {
                switch (choice) {

                    case 1:
                        manager.listAccounts();
                        break;

                    case 2:
                        AccountCreationHelper.createAccount(sc, manager);
                        break;

                    case 3:
                        DepositHelper.deposit(sc, manager);
                        break;

                    case 4:
                        WithdrawHelper.withdraw(sc, manager);
                        break;

                    case 5:
                        TransferHelper.transfer(sc, manager);
                        break;

                    case 6:
                        StatusChangeHelper.changeStatus(sc, manager);
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
                ErrorPrinter.printError(e);
            }
        }
    }
}

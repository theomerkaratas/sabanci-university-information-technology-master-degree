import java.util.Scanner;

public class DepositHelper implements ClosedAccountCheckable {
    public static void deposit(Scanner sc, AccountsManager manager) {
        System.out.print("Hesap No: ");
        String accNo = sc.nextLine();
        BaseAccount acc = manager.findAccountByNumber(accNo);
        if (new DepositHelper().checkClosedAccount(acc)) {
            return;
        }
        if (!FrozenAccountHandler.handleIfFrozen(acc, sc, manager)) {
            return;
        }
        System.out.print("Tutar: ");
        double amt = Double.parseDouble(sc.nextLine());
        manager.deposit(accNo, amt);
    }
}

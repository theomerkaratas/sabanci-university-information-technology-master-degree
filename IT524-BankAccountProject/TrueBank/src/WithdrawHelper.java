import java.util.Scanner;

public class WithdrawHelper implements ClosedAccountCheckable {
    public static void withdraw(Scanner sc, AccountsManager manager) {
        System.out.print("Hesap No: ");
        String accNo = sc.nextLine();
        BaseAccount acc = manager.findAccountByNumber(accNo);
        if (new WithdrawHelper().checkClosedAccount(acc)) {
            return;
        }
        if (!FrozenAccountHandler.handleIfFrozen(acc, sc, manager)) {
            return;
        }
        System.out.print("Tutar: ");
        double amt = Double.parseDouble(sc.nextLine());
        manager.withdraw(accNo, amt);
    }
}

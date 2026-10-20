import java.util.List;

public class CurrencyTransferHelper {
    public static void transferWithCurrencyConversion(List<BaseAccount> accounts, List<Transaction> transactions, String fromNo, String toNo, double amount, Object storage) {
        ValidationUtils.requirePositive(amount, "Transfer tutarı");

        BaseAccount from = null;
        BaseAccount to = null;
        for (BaseAccount acc : accounts) {
            if (acc.getAccountNumber().equals(fromNo)) from = acc;
            if (acc.getAccountNumber().equals(toNo)) to = acc;
        }

        if (from == null)
            throw new DomainExceptions.AccountNotFoundException("Kaynak hesap yok: " + fromNo);
        if (to == null)
            throw new DomainExceptions.AccountNotFoundException("Hedef hesap yok: " + toNo);

        from.withdraw(amount);
        double tryAmount = CurrencyConverter.toTRY(amount, from.getAccountType());
        double finalAmount;
        if (to.getAccountType() == AccountType.TRY) {
            finalAmount = tryAmount;
        } else if (to.getAccountType() == AccountType.USD) {
            finalAmount = tryAmount / 30.0;
        } else {
            finalAmount = tryAmount / 33.0;
        }
        to.deposit(finalAmount);
        transactions.add(new Transaction(fromNo, "transfer-out", amount));
        transactions.add(new Transaction(toNo, "transfer-in", finalAmount));
        if (storage instanceof AccountsStorage) {
            try {
                ((AccountsStorage) storage).save(accounts);
            } catch (Exception e) {
                System.out.println("[WARN] CSV kaydedilemedi: " + e.getMessage());
            }
        }
        System.out.println("[INFO] Kur dönüşümlü transfer tamamlandı.");
    }
}

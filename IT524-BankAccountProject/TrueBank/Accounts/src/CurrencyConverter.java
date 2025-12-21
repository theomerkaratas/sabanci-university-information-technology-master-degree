public class CurrencyConverter {

    // Merkez para birimi: TRY
    public static double toTRY(double amount, AccountType from) {
        switch (from) {
            case USD: return amount * 30.0;
            case EUR: return amount * 33.0;
            case TRY: return amount;
            default: throw new IllegalArgumentException("Desteklenmeyen para birimi");
        }
    }

    public static double fromTRY(double tryAmount, AccountType to) {
        switch (to) {
            case USD: return tryAmount / 30.0;
            case EUR: return tryAmount / 33.0;
            case TRY: return tryAmount;
            default: throw new IllegalArgumentException("Desteklenmeyen para birimi");
        }
    }

    public static double convert(double amount, AccountType from, AccountType to) {
        double tryAmount = toTRY(amount, from);
        return fromTRY(tryAmount, to);
    }
}

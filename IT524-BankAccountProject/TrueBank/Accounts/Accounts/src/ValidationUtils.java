import java.time.LocalDate;

public class ValidationUtils {

    public static void requireNonEmpty(String value, String name) {
        if (value == null || value.trim().isEmpty()) {
            throw new DomainExceptions.ValidationException(name + " boş olamaz");
        }
    }

    public static void requirePositive(double value, String name) {
        if (value < 0) {
            throw new DomainExceptions.ValidationException(name + " negatif olamaz");
        }
    }

    public static AccountType parseAccountType(String s) {
        try {
            return AccountType.valueOf(s.toUpperCase());
        } catch (Exception e) {
            throw new DomainExceptions.ValidationException("Geçersiz para birimi");
        }
    }

    public static LocalDate safeDate(int y, int m, int d) {
        return LocalDate.of(y, m, d);
    }
}

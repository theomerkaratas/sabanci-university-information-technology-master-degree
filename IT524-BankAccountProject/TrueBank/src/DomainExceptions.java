public class DomainExceptions {

    public static class ValidationException extends RuntimeException {
        public ValidationException(String msg) { super(msg); }
    }

    public static class InsufficientFundsException extends RuntimeException {
        public InsufficientFundsException(String msg) { super(msg); }
    }

    public static class AccountStatusException extends RuntimeException {
        public AccountStatusException(String msg) { super(msg); }
    }

    public static class AccountNotFoundException extends RuntimeException {
        public AccountNotFoundException(String msg) { super(msg); }
    }
}

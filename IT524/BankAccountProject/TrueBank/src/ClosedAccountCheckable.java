public interface ClosedAccountCheckable {
    default boolean checkClosedAccount(BaseAccount acc) {
        if (acc != null && acc.getStatus() != null && acc.getStatus().toString().equalsIgnoreCase("CLOSED")) {
            System.out.println("[HATA] Bu hesap CLOSED durumda. İşlem yapılamaz.");
            return true;
        }
        return false;
    }
}

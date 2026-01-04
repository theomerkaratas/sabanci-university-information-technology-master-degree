import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class DatabaseAccountsStorage {
    private final String url;
    private final String user;
    private final String pass;

    public DatabaseAccountsStorage(String host, int port, String db, String user, String pass) {
        this.url = "jdbc:postgresql://" + host + ":" + port + "/" + db;
        this.user = user;
        this.pass = pass;
    }

    public List<BaseAccount> load() throws Exception {
        List<BaseAccount> list = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM accounts")) {
            while (rs.next()) {
                String accNo = rs.getString("account_number");
                String owner = rs.getString("owner_name");
                double balance = rs.getDouble("balance");
                AccountType type = AccountType.valueOf(rs.getString("account_type"));
                LocalDate openDate = rs.getDate("open_date").toLocalDate();
                AccountStatus status = AccountStatus.valueOf(rs.getString("status"));
                String className = rs.getString("class_name");

                BaseAccount acc;
                if (className.equals("CheckingAccount")) {
                    acc = new CheckingAccount(accNo, owner, balance, type, openDate);
                } else {
                    acc = new SavingsAccount(accNo, owner, balance, type, openDate);
                }
                acc.setStatus(status);
                list.add(acc);
            }
        }
        return list;
    }
}

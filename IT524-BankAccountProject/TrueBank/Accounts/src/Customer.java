import java.util.ArrayList;

public class Customer {
    private String id;
    private String name;
    private ArrayList<BaseAccount> accounts = new ArrayList<>();

    public Customer(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public void addAccount(BaseAccount account) {
        accounts.add(account);
    }

    public ArrayList<BaseAccount> getAccounts() {
        return accounts;
    }

    public String getName() { return name; }
    public String getId() { return id; }
}

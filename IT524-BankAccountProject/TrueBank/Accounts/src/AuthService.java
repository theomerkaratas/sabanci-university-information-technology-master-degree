import java.util.HashMap;

public class AuthService {
    private HashMap<String, String> users = new HashMap<>(); // username-password

    public void register(String username, String password) {
        users.put(username, password);
    }

    public boolean login(String username, String password) {
        return users.containsKey(username) && users.get(username).equals(password);
    }
}

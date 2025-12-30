import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

public class AccountNumberReader {
    public static List<String> getAccountNumbers(String csvPath) {
        List<String> accountNumbers = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(csvPath))) {
            String line = br.readLine(); // skip header
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length > 0) {
                    accountNumbers.add(parts[0]);
                }
            }
        } catch (Exception e) {
            System.out.println("[HATA] CSV okunamadı: " + e.getMessage());
        }
        return accountNumbers;
    }
}

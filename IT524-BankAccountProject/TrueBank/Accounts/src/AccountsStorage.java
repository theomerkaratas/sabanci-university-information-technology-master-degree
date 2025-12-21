import java.io.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class AccountsStorage {

    private final File file;

    public AccountsStorage(String filename) {
        this.file = new File(filename);
    }

    public void save(List<BaseAccount> accounts) throws IOException {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {
            bw.write("accountNumber,ownerName,balance,accountType,openDate,status,className");
            bw.newLine();
            for (BaseAccount acc : accounts) {
                bw.write(acc.toCsv());
                bw.newLine();
            }
        }
    }

    public List<BaseAccount> load() throws IOException {
        List<BaseAccount> list = new ArrayList<>();
        if (!file.exists()) return list;

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            br.readLine(); // header
            String line;
            while ((line = br.readLine()) != null) {
                if (line.trim().isEmpty()) continue; // boş satırları atla
                String[] p = line.split(",");

                String accNo = p[0];
                String owner = p[1];
                double balance = Double.parseDouble(p[2]);
                AccountType type = AccountType.valueOf(p[3]);
                LocalDate openDate = LocalDate.parse(p[4]);
                AccountStatus status = AccountStatus.valueOf(p[5]);
                String className = p[6];

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

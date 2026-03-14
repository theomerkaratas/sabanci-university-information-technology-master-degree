import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

public class ListPrinter {
    public List<Integer> numbers;

    public ListPrinter(Integer... args) {
        this.numbers = new ArrayList<>(Arrays.asList(args));
    }

    public void element(int i) {
        System.out.println(numbers.get(i));
    }

    public void length_printer() {
        System.out.println(numbers.size());
    }

}

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Age mahmut = new Age("Mahmut", 17);

        mahmut.isAllowed();

        ListPrinter myList = new ListPrinter(3, 4, 5, 6, 7);

        myList.element(2);
        myList.length_printer();

        System.out.println("Hi World!");
    }
}
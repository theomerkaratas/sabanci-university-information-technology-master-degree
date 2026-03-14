public class Age {
    public String name;
    public int age;

    public Age(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void isAllowed() {
        if (name == "Mahmut") {
            System.out.println("Mahmuts and dogs cannot enter!");

        } else if (age >= 18) {
            System.out.println("You are allowed, enjoy it!");
        } else {
            System.out.println("You are not allowed!");
        }
    }

}

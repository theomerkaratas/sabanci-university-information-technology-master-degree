public class MenuPrinter {
    public static void printMenu() {
        String border = "+----+------------------------------------------+";
        System.out.println("\n        BANKA MENÜSÜ");
        System.out.println(border);
        System.out.printf("| %-2s | %-40s |%n", "No", "İşlem");
        System.out.println(border);
        System.out.printf("| %-2d | %-40s |%n", 1, "Hesapları Listele");
        System.out.printf("| %-2d | %-40s |%n", 2, "Yeni Hesap Aç");
        System.out.printf("| %-2d | %-40s |%n", 3, "Para Yatır");
        System.out.printf("| %-2d | %-40s |%n", 4, "Para Çek");
        System.out.printf("| %-2d | %-40s |%n", 5, "Para Transferi (Kur Dönüşümlü)");
        System.out.printf("| %-2d | %-40s |%n", 6, "Hesap Durumu Değiştir");
        System.out.printf("| %-2d | %-40s |%n", 7, "İşlem Geçmişi");
        System.out.printf("| %-2d | %-40s |%n", 8, "Çıkış");
        System.out.println(border);
        System.out.print("Seçimin: ");
    }
}

# FootJoy — 3'e 3 Futbol Sahası Simülatörü

## Ne yapar?

Java ile geliştirilen **3'e 3 Futbol Simülatörü**, belirlenen saniye süresince Ev Sahibi ve Deplasman takımları arasında bir maç canlandırır. Oyuncular topu kazanma, pas verme, top sürme ve şut çekme eylemlerini gerçekleştirir. Maç sonunda oyuncu ve takım bazında topa dokunuş sayısı ve topla oynama süresi gibi istatistikler raporlanır.

> **Kaynak kodu ve simülasyon sınıfları:** Çok iş parçacıklı Java uygulaması ve sınıflar [FootJoy GitHub klasöründe](https://github.com/theomerkaratas/sabanci-university-information-technology-master-degree/tree/main/IT524/FootJoy) bulunur.

## Uygulama yapısı

- **Oyuncu ve alt sınıflar (`HomePlayer`, `AwayPlayer`):** Şut, pas ve top sürme gibi ortak davranışları tanımlayan soyut oyuncu yapısı. Alt sınıflar takım adına ve top kapma olasılığına özgü davranışları özelleştirir.
- **Top (`Ball`):** Paylaşılan kaynak olarak `ReentrantLock` ve `Condition` ile yönetilir; aynı anda yalnızca bir oyuncunun topa sahip olması sağlanır.
- **Maç denetleyicisi (`MatchController`):** Maç süresini, oyuncu sıralarını ve son istatistiklerin hesaplanmasını yönetir.
- **Oyuncu istatistikleri (`PlayerStatistics`):** Dokunuş ve topla oynama süresi gibi bireysel performans verilerini tutar.
- **İstisna yönetimi:** `GameException` ve `BallAccessException` gibi özel istisnalar kenar durumlarını güvenli biçimde ele alır.

## Projede edinilen deneyim

1. **Eşzamanlılık:** Birden çok oyuncu iş parçacığının paylaşılan topa erişimini Java `Lock` ve `Condition` mekanizmalarıyla yönetme.
2. **Soyut sınıflar ve çok biçimlilik:** Ortak `Player` sınıfıyla kodu yeniden kullanma; takım davranışlarını alt sınıflarda farklılaştırma.
3. **`volatile` anahtar sözcüğü:** Maçın çalışıp çalışmadığını belirten durum gibi paylaşılan bayrakların iş parçacıkları arasında görünür olmasını sağlama.
4. **Özel istisnalar:** Hata yönetimini açık hale getirme ve simülasyon akışını kenar durumlarına karşı dayanıklı kılma.

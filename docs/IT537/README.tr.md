# IT 537: Etkileşimli Ön Yüz Programlama 🌐🎨

**IT 537: Etkileşimli Ön Yüz Programlama** dökümantasyon bölümüne hoş geldiniz. **Sabancı University Bilgi Teknolojileri Yüksek Lisans** programındaki bu ders; semantik HTML5 işaretlemesinden duyarlı CSS yerleşim motorlarına, asenkron JavaScript ve yardımcı sınıf araçlarından bileşen odaklı modern web mimarilerine kadar çağdaş web geliştirme ekosistemini kapsamlı biçimde ele alır.

> [!TIP]
> **Kaynak Kodlar, Canlı Demolar ve Docker Ortamları:**  
> Tüm proje kaynak kodları, Docker Compose konfigürasyonları, Express backend betikleri ve arayüz varlıkları kök dizindeki [IT537 GitHub Klasöründe](https://github.com/theomerkaratas/sabanci-university-information-technology-master-degree/tree/main/IT537) yer almaktadır.

---

## 🍽️ Dönem Projesi: Fine Dining Restoran Menü ve Masa Yönetim Sistemi

Modern, konteynerize edilmiş tam yığın (full-stack) bir restoran menü ve sipariş yönetim sistemi. Proje; müşteri ve yönetici rolleri için kimlik doğrulama, dinamik sepet yönetimi, anlık masa doluluk takibi ve harici veritabanı kurulumu gerektirmeyen CSV tabanlı hafif bir sunucu kalıcılık katmanı sunar.

> 💻 **Kaynak Kod:** [GitHub IT537/menuproject ↗](https://github.com/theomerkaratas/sabanci-university-information-technology-master-degree/tree/main/IT537/menuproject)

### Temel Mimari Özellikler

* **Dinamik Müşteri Menüsü:** Müşterilerin kategoriler arasında (Başlangıçlar, Ana Yemekler, Pizzalar, Tatlılar) filtreleme yapabildiği ve ürünleri anlık reaktif sepete ekleyebildiği modern arayüz.
* **Gerçek Zamanlı Masa Takibi:** Sipariş onaylandığında sistem masanın doluluk durumunu kontrol eder. Seçilen masa kilitlenerek, restoran personeli boşaltana kadar diğer müşterilerin çift rezervasyon yapması engellenir.
* **Yönetici Sipariş Takip Paneli:** Personelin gelen siparişleri anlık olarak izleyebildiği ve sipariş yaşam döngüsünü güncelleyebildiği yönetim ekranı (`beklemede` → `hazırlanıyor` → `tamamlandı` → `iptal`).
* **CSV Kalıcılık Motoru:** Karmaşık veritabanı bağımlılıkları yerine; tüm sipariş hareketleri, müşteri hesapları ve yönetici kimlik bilgileri insan tarafından okunabilir yapılandırılmış CSV dosyalarında (`order.csv`, `user.csv`, `admin.csv`) saklanır.
* **Konteynerize Geliştirme:** İstemci, API sunucusu ve statik varlıklar Docker ve Docker Compose ile tek komutla ayağa kalkar.

### Teknoloji Yığını ve Katmanlar

| Katman | Teknolojiler | Rol ve Sorumluluk |
| :--- | :--- | :--- |
| **Ön Yüz (Frontend)** | Vanilla JavaScript (ES6+), HTML5, Modern CSS3 | Bileşen işleme, reaktif istemci durumu ve duyarlı tasarım |
| **Arka Yüz (Backend)** | Node.js, Express.js | REST API yönlendirme, kimlik doğrulama ve CSV I/O işlemleri |
| **Veri Kalıcılığı** | Dosya Tabanlı CSV Motoru | Hafif, sıfır bağımlılıklı işlemsel veri saklama |
| **DevOps** | Docker, Docker Compose | Tek komutla izole uygulama dağıtımı |

---

## 🚀 Uygulamalı Ön Yüz Alıştırmaları (Dockerize Lab Modülleri)

Temel web yerleşim algoritmalarını, duyarlı tipografiyi ve modern CSS tasarım kalıplarını ele alan uygulamalı laboratuvar modülleri serisi:

> 💻 **Kaynak Kod:** [GitHub IT537/Practices ↗](https://github.com/theomerkaratas/sabanci-university-information-technology-master-degree/tree/main/IT537/Practices)

| Alıştırma | Odak ve Konseptler | Açıklama | Yerel Port |
| :--- | :--- | :--- | :---: |
| **Alıştırma 1** | **Twelve-Factor App Metodolojisi** | Bulut tabanlı ilkelere uygun konteynerize mikro ön yüz yapılandırması. | `:8001` |
| **Alıştırma 2** | **CSS Bayrak Projesi** | Saf CSS özellikleri ile hassas görsel geometri, göreli/mutlak konumlandırma. | `:8002` |
| **Alıştırma 3** | **Duyarlı Tasarım (Responsiveness)** | Çoklu cihaz uyumluluğu için ekran kırılma noktaları, medya sorguları ve akışkan tipografi. | `:8003` |
| **Alıştırma 4** | **Klasik CSS Yerleşim Teknikleri** | `float` temizleme mekanizması, `inline-block` ve kutu modeli hizalaması karşılaştırması. | `:8004` |
| **Alıştırma 5** | **Flexbox Detaylı İnceleme** | Tek boyutlu eksen hizalaması (`justify-content`, `align-items`), yön ve sarma (wrap) kuralları. | `:8005` |
| **Alıştırma 6** | **CSS Grid Boyutlandırma Temelleri** | İki boyutlu ızgara yapısı, kesirli `fr` birimleri, `minmax()` sınırlamaları ve şablon alanları. | `:8006` |

---

## 📄 Etkileşimli Web Özgeçmişi (Interactive Resume)

Ders boyunca edinilen ön yüz mühendisliği prensiplerinin canlı bir uygulaması olarak kişisel bir portfolyo geliştirilmiştir:

👉 **[Canlı Etkileşimli Özgeçmiş Sitesi ↗](https://theomerkaratas.github.io/resume/)**

* **Öne Çıkanlar:** Mobil öncelikli duyarlı yerleşimler, dinamik karanlık/aydınlık tema geçişi, terminal daktilo yazma animasyonları ve LinkedIn profil entegrasyonu.

# Kullanıcı Hikayeleri ve Sprint Görevleri

Bu belge, menü projesi için 10 temel kullanıcı hikayesini ve Sprint 1 için planlanan özel görevleri özetlemektedir.

## 10 Kullanıcı Hikayesi

1.  **Menü Kategorilerini ve Ürünlerini Görüntüleme**
    - **Bir** Müşteri olarak,
    - **Menüyü** kategorilere (örn. Başlangıçlar, Ana Yemekler, İçecekler) göre taramak istiyorum,
    - **Böylece** sipariş etmek i̇stediğim şeyi kolayca bulabilirim.

2.  **Sepete Ürün Ekleme**
    - **Bir** Müşteri olarak,
    - **Alışveriş** sepetime ürün eklemek ve adetleri güncellemek istiyorum,
    - **Böylece** siparişimi oluşturabilirim.

3.  **Sepet Özetini Görüntüleme**
    - **Bir** Müşteri olarak,
    - **Sepet** içeriğini ve toplam tutarı istediğim zaman görüntülemek istiyorum,
    - **Böylece** sipariş vermeden önce seçimimi doğrulayabilirim.

4.  **Masa Numarası Seçme**
    - **Bir** Müşteri olarak,
    - **Ödeme** sırasında masa numaramı seçmek istiyorum,
    - **Böylece** personel yemeği nereye servis edeceğini bilir.

5.  **Sipariş Verme**
    - **Bir** Müşteri olarak,
    - **Siparişimi** onaylamak ve vermek istiyorum,
    - **Böylece** siparişim mutfağa iletilir.

6.  **Admin Girişi**
    - **Bir** Yönetici (Admin) olarak,
    - **Kullanıcı** adı ve şifre ile giriş yapmak istiyorum,
    - **Böylece** kısıtlı erişime sahip yönetim paneline erişebilirim.

7.  **Aktif Siparişleri Görüntüleme (Admin)**
    - **Bir** Yönetici olarak,
    - **Masa** numarası, ürünler ve toplam tutar dahil olmak üzere tüm aktif siparişlerin listesini görüntülemek istiyorum,
    - **Böylece** mevcut siparişleri takip edebilirim.

8.  **Sipariş Durumunu Güncelleme**
    - **Bir** Yönetici olarak,
    - **Bir** siparişin durumunu güncellemek (örn. Beklemede -> Hazırlandı -> Servis Edildi) istiyorum,
    - **Böylece** mutfak iş akışını yönetebilirim.

9.  **Günlük İstatistikleri Görüntüleme**
    - **Bir** Yönetici olarak,
    - **Toplam** gelir ve sipariş sayılarını içeren bir panel görmek istiyorum,
    - **Böylece** restoranın performansını izleyebilirim.

10. **Veri Kalıcılığı (Data Persistence)**
    - **Bir** Sistem Yöneticisi olarak,
    - **Sipariş** ve kullanıcı verilerinin bir dosyaya/veritabanına kaydedilmesini istiyorum,
    - **Böylece** sunucu yeniden başlatıldığında veriler kaybolmaz.

---

## Sprint 1 Görevleri (Tasks)

### Hikaye 1: Menü Kategorilerini ve Ürünlerini Görüntüleme

- [ ] Tekil menü öğelerini görüntülemek için `ProductCard` bileşeni oluştur.
- [ ] Kategori filtreleme mantığına sahip `MenuPage` sayfasını oluştur.
- [ ] Kategoriler ve ürünler için mock (sahte) veriler içeren `data/products.js` dosyasını oluştur.
- [ ] Menü öğeleri için responsive (duyarlı) grid yapısı uygula.

### Hikaye 2: Sepete Ürün Ekleme

- [ ] Ekleme/çıkarma işlemlerini yönetmek için `CartContext` uygula.
- [ ] `ProductCard` bileşenine "Sepete Ekle" butonu ekle.
- [ ] `CartContext` içinde adet güncelleme mantığını uygula.

### Hikaye 3: Sepet Özetini Görüntüleme

- [ ] Seçilen ürünleri yönetmek için `CartSidebar` bileşeni oluştur.
- [ ] Sepet toplam tutar hesaplama mantığını uygula.
- [ ] `MenuPage` sayfasında Cart Sidebar açma/kapama işlevini entegre et.

### Hikaye 4: Masa Numarası Seçme

- [ ] Masa bilgisini almak için `TableSelectionModal` oluştur.
- [ ] Masa numarasını sipariş context'ine aktar.

### Hikaye 5: Sipariş Verme

- [ ] `CartSidebar` içine sipariş ver butonu ekle.
- [ ] Mock sipariş gönderme fonksiyonu oluştur (konsol log veya yerel state güncellemesi).
- [ ] Başarılı sipariş sonrası sepeti temizle.

### Hikaye 6: Admin Girişi

- [ ] Mock kullanıcı giriş/çıkış durumunu yönetmek için `AuthContext` uygula.
- [ ] Admin erişimi için basit bir giriş formu oluştur.
- [ ] `/admin` rotası için kısıtlı erişim koruması uygula.

### Hikaye 7: Aktif Siparişleri Görüntüleme (Admin)

- [ ] `OrdersTable` bileşeni oluştur (Mock Arayüz).
- [ ] Görselleştirme için `Admin.jsx` içinde mock sipariş verisi oluştur.

### Hikaye 8: Sipariş Durumunu Güncelleme

- [ ] `OrdersTable` bileşenine durum güncelleme butonları ekle (Mock işlevsellik).

### Hikaye 9: Günlük İstatistikleri Görüntüleme

- [ ] `StatsDashboard` bileşeni oluştur (Statik verilerle Mock Arayüz).

### Altyapı ve Kurulum

- [x] Vite kullanarak React projesini başlat.
- [x] Bağımlılıkları yükle (`react-router-dom`, `lucide-react`, vb.).
- [x] Temel stillendirmeyi yapılandır (CSS Değişkenleri, Reset).
- [ ] React Router'ı yapılandır (`/main`, `/admin`).

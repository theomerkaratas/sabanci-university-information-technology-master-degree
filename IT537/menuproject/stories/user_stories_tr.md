# Kullanıcı Hikayeleri ve Sprint Görevleri

## 10 Kullanıcı Hikayesi

1.  **Menü Kategorilerini ve Ürünlerini Görüntüleme**
    _Bir Müşteri olarak, menüyü kategorilere (örn. Başlangıçlar, Ana Yemekler, İçecekler) göre taramak istiyorum, böylece sipariş etmek istediğim şeyi kolayca bulabilirim._
    _(Durum: Sprint 1'de Mock Veri ile uygulandı)_

2.  **Sepete Ürün Ekleme**
    _Bir Müşteri olarak, alışveriş sepetime ürün eklemek ve adetleri güncellemek istiyorum, böylece siparişimi oluşturabilirim._
    _(Durum: Sprint 1'de Context ile uygulandı)_

3.  **Sepet Özetini Görüntüleme**
    _Bir Müşteri olarak, sepet içeriğini ve toplam tutarı istediğim zaman görüntülemek istiyorum, böylece sipariş vermeden önce seçimimi doğrulayabilirim._
    _(Durum: Sprint 1'de Sidebar ile uygulandı)_

4.  **Masa Numarası Seçme**
    _Bir Müşteri olarak, ödeme sırasında masa numaramı seçmek istiyorum, böylece personel yemeği nereye servis edeceğini bilir._
    _(Durum: Sprint 1'de Modal ile uygulandı)_

5.  **Sipariş Verme**
    _Bir Müşteri olarak, siparişimi onaylamak ve vermek istiyorum, böylece siparişim mutfağa iletilir._
    _(Durum: Sprint 1'de Arayüz yapıldı, Backend entegrasyonu Sprint 2'de)_

6.  **Admin Girişi**
    _Bir Yönetici (Admin) olarak, kullanıcı adı ve şifre ile giriş yapmak istiyorum, böylece kısıtlı erişime sahip yönetim paneline erişebilirim._
    _(Durum: Sprint 1'de Mock Kimlik Doğrulama, Gerçek Kimlik Doğrulama Sprint 2'de)_

7.  **Aktif Siparişleri Görüntüleme (Admin)**
    _Bir Yönetici olarak, masa numarası, ürünler ve toplam tutar dahil olmak üzere tüm aktif siparişlerin listesini görüntülemek istiyorum._
    _(Durum: Sprint 1'de Mock Veri, Gerçek Veri Sprint 2'de)_

8.  **Sipariş Durumunu Güncelleme**
    _Bir Yönetici olarak, bir siparişin durumunu güncellemek (örn. Beklemede -> Hazırlandı -> Servis Edildi) istiyorum, böylece mutfak iş akışını yönetebilirim._
    _(Durum: Sprint 1'de Konsol log, API çağrısı Sprint 2'de)_

9.  **Günlük İstatistikleri Görüntüleme**
    _Bir Yönetici olarak, toplam gelir ve sipariş sayılarını içeren bir panel görmek istiyorum, böylece restoranın performansını izleyebilirim._
    _(Durum: Sprint 1'de Statik Arayüz)_

10. **Veri Kalıcılığı (Data Persistence)**
    _Bir Sistem Yöneticisi olarak, sipariş ve kullanıcı verilerinin bir dosyaya/veritabanına kaydedilmesini istiyorum, böylece sunucu yeniden başlatıldığında veriler kaybolmaz._
    _(Durum: Sprint 2 Özelliği)_

---

## Sprint 1 İçin Görevler

**Hedef:** Mock Veri ile çalışan bir Frontend Prototipi oluşturmak.

### 1. Proje Kurulumu

- [x] Vite kullanarak React projesini başlat.
- [x] Bağımlılıkları yükle (`react-router-dom`, `lucide-react`, vb.).
- [x] Temel stillendirmeyi yapılandır (CSS Değişkenleri, Reset).

### 2. Temel Bileşenler ve Arayüz

- [ ] Tekil menü öğelerini görüntülemek için `ProductCard` bileşeni oluştur.
- [ ] Seçilen ürünleri yönetmek için `CartSidebar` bileşeni oluştur.
- [ ] Masa bilgisini almak için `TableSelectionModal` oluştur.
- [ ] Ana yerleşimi tasarla (Başlık, Navigasyon, Duyarlı Grid).

### 3. Durum Yönetimi (Context)

- [ ] Mock kullanıcı giriş/çıkış durumunu yönetmek için `AuthContext` uygula.
- [ ] Ekleme/çıkarma ve toplam hesaplama işlemlerini yönetmek için `CartContext` uygula.

### 4. Sayfa Uygulamaları

- [ ] **Menü Sayfası:**
  - Kategori filtreleme mantığını uygula.
  - Seçime göre Ürün Kartlarını (Product Cards) görüntüle.
  - Cart Sidebar geçişini entegre et.
- [ ] **Admin Sayfası:**
  - Kısıtlı rota koruması oluştur (`AuthContext` kontrolü).
  - `StatsDashboard` bileşenini oluştur (Mock Arayüz).
  - `OrdersTable` bileşenini oluştur (Mock Arayüz).

### 5. Veri ve Mocking

- [ ] Kategoriler ve ürünler listesi ile `data/products.js` oluştur.
- [ ] Görselleştirme için `Admin.jsx` içinde mock sipariş verisi oluştur.

### 6. Navigasyon

- [ ] React Router'ı yapılandır (`/main`, `/admin`).
- [ ] Yönlendirmeyi uygula (Kök `/` -> `/main`).

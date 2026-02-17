# Kullanıcı Hikayeleri & Sprint Görevleri

Bu belge, menü projesi için 10 temel kullanıcı hikayesini ve Sprint 1 için planlanan özel görevleri özetlemektedir.

## 10 Kullanıcı Hikayesi

1.  **Menü Kategorilerini & Ürünleri Görüntüleme**
    - **Bir** Müşteri **olarak**,
    - Menüye kategorilere (örn. Başlangıçlar, Ana Yemekler, İçecekler) göre göz atmak **istiyorum**,
    - **Böylece** sipariş etmek istediğim şeyi kolayca bulabilirim.

2.  **Sepete Ürün Ekleme**
    - **Bir** Müşteri **olarak**,
    - Alışveriş sepetime ürün eklemek ve miktarlarını ayarlamak **istiyorum**,
    - **Böylece** siparişimi oluşturabilirim.

3.  **Sepet Özetini Görüntüleme**
    - **Bir** Müşteri **olarak**,
    - Herhangi bir zamanda sepet içeriğimi ve toplam fiyatı görmek **istiyorum**,
    - **Böylece** sipariş vermeden önce seçimimi doğrulayabilirim.

4.  **Masa Numarası Seçimi**
    - **Bir** Müşteri **olarak**,
    - Ödeme sırasında masa numaramı seçmek **istiyorum**,
    - **Böylece** personel yemeği nereye servis edeceğini bilir.

5.  **Sipariş Verme**
    - **Bir** Müşteri **olarak**,
    - Siparişimi onaylamak ve vermek **istiyorum**,
    - **Böylece** sipariş mutfağa gönderilir.

6.  **Yönetici Girişi**
    - **Bir** Yönetici **olarak**,
    - Kullanıcı adı ve şifre ile giriş yapmak **istiyorum**,
    - **Böylece** kısıtlı yönetim paneline erişebilirim.

7.  **Aktif Siparişleri Görüntüleme (Yönetici)**
    - **Bir** Yönetici **olarak**,
    - Masa numarası, ürünler ve toplam fiyat dahil olmak üzere tüm aktif siparişlerin bir listesini görmek **istiyorum**,
    - **Böylece** mevcut siparişleri takip edebilirim.

8.  **Sipariş Durumunu Güncelleme**
    - **Bir** Yönetici **olarak**,
    - Bir siparişin durumunu (örn. Beklemede -> Hazırlandı -> Servis Edildi) güncellemek **istiyorum**,
    - **Böylece** mutfak iş akışını yönetebilirim.

9.  **Günlük İstatistikleri Görüntüleme**
    - **Bir** Yönetici **olarak**,
    - Toplam gelir ve sipariş sayılarını içeren bir pano görmek **istiyorum**,
    - **Böylece** restoranın performansını izleyebilirim.

10. **Veri Kalıcılığı**
    - **Bir** Sistem Yöneticisi **olarak**,
    - Sipariş ve kullanıcı verilerinin bir dosyaya/veritabanına kaydedilmesini **istiyorum**,
    - **Böylece** sunucu yeniden başlatıldığında veriler kaybolmaz.

11. **Kalıcı Masa Seçimi**
    - **Bir** Müşteri **olarak**,
    - Masa seçimimin hatırlanmasını ve dolu olarak işaretlenmesini **istiyorum**,
    - **Böylece** çıkış yapana kadar tekrar seçmek zorunda kalmam ve başkaları masanın dolu olduğunu bilir.

---

## Sprint 1 Görevleri

### Hikaye 1: Menü Kategorilerini & Ürünleri Görüntüleme

- [ ] Bireysel menü öğelerini görüntülemek için `ProductCard` bileşeni oluştur.
- [ ] Kategori filtreleme mantığına sahip `MenuPage` oluştur.
- [ ] Kategoriler ve ürünler için sahte verilerle `data/products.js` oluştur.
- [ ] Menü öğeleri için duyarlı ızgara düzeni uygula.

### Hikaye 2: Sepete Ürün Ekleme

- [ ] Ürün ekleme/çıkarma işlemlerini yönetmek için `CartContext` uygula.
- [ ] `ProductCard` içine "Sepete Ekle" butonu ekle.
- [ ] `CartContext` içinde miktar ayarlama mantığını uygula.

### Hikaye 3: Sepet Özetini Görüntüleme

- [ ] Seçilen öğeleri yönetmek için `CartSidebar` bileşeni oluştur.
- [ ] Sepet toplamı hesaplama mantığını uygula.
- [ ] `MenuPage` içine Sepet Kenar Çubuğu geçişini entegre et.

### Hikaye 4: Masa Numarası Seçimi

- [ ] Masa bilgisini almak için `TableSelectionModal` oluştur.
- [ ] Masa numarasını sipariş bağlamına (context) ilet.

### Hikaye 5: Sipariş Verme

- [ ] `CartSidebar` içinde sipariş ver butonu uygula.
- [ ] Sahte sipariş gönderme fonksiyonu oluştur (konsol günlüğü veya yerel durum güncellemesi).
- [ ] Başarılı sipariş gönderiminden sonra sepeti temizle.

### Hikaye 6: Yönetici Girişi

- [ ] Sahte kullanıcı giriş/çıkış durumunu yönetmek için `AuthContext` uygula.
- [ ] Yönetici erişimi için basit giriş formu oluştur.
- [ ] `/admin` için kısıtlı rota koruması uygula.

### Hikaye 7: Aktif Siparişleri Görüntüleme (Yönetici)

- [ ] `OrdersTable` bileşeni oluştur (Sahte Arayüz).
- [ ] Görselleştirme için `Admin.jsx` içinde sahte sipariş verileri oluştur.

### Hikaye 8: Sipariş Durumunu Güncelleme

- [ ] `OrdersTable` içine durum güncelleme butonları ekle (Sahte işlevsellik).

### Hikaye 9: Günlük İstatistikleri Görüntüleme

- [ ] `StatsDashboard` bileşeni oluştur (Sahte Arayüz ve statik veriler).

### Hikaye 11: Kalıcı Masa Seçimi (Önyüz)

- [ ] Seçilen masayı yeniden yüklemelerde kalıcı olması için `localStorage` veya `AuthContext` içinde sakla.
- [ ] Aktif masası olan kullanıcıları otomatik olarak menü sayfasına yönlendir (seçimi atla).
- [ ] Kaydedilen masayı temizlemek için "Masadan Kalk" veya "Çıkış Yap" eylemini uygula.

### Altyapı & Kurulum

- [x] Vite kullanarak React projesini başlat.
- [x] Bağımlılıkları yükle (`react-router-dom`, `lucide-react`, vb.).
- [x] Temel stillendirmeyi yapılandır (CSS Değişkenleri, Reset).
- [ ] React Router'ı yapılandır (`/main`, `/admin`).

## Sprint 2 Görevleri

**Hedef:** Arka Uç API'si, Gerçek Veri Kalıcılığı ve Önyüz Entegrasyonunu Uygula.

### Arka Uç Kurulumu (Node.js & Express)

- [ ] `server.js` dosyasını Express ile başlat.
- [ ] `cors` ve `body-parser` ara yazılımlarını yapılandır.
- [ ] CSV depolama için `database` dizini oluştur.

### Veri Kalıcılığı (CSV)

- [ ] `user.csv`, `admin.csv` ve `order.csv` dosyalarını başlatmak için `ensureFiles` fonksiyonunu uygula.
- [ ] CSV ayrıştırma ve yazma yardımcı fonksiyonlarını uygula.
- [ ] Mevcut değilse varsayılan Yönetici kullanıcısı oluştur.

### Kimlik Doğrulama API'si

- [ ] Yeni müşteri kaydı için `POST /api/register` uygula.
- [ ] Kullanıcı ve Yönetici kimlik bilgilerini doğrulamak için `POST /api/login` uygula.

### Sipariş Yönetimi API'si

- [ ] `order.csv` dosyasından geçmişi almak için `GET /api/orders` uygula.
- [ ] Yeni siparişleri `order.csv` dosyasına kaydetmek için `POST /api/orders` uygula.
- [ ] Sipariş durumunu güncellemek için `PUT /api/orders/:id` uygula (örn. Beklemede -> Servis Edildi).

### Masa Yönetimi API'si (Hikaye 11)

- [ ] Belirli bir kullanıcı için masayı dolu olarak işaretlemek üzere `POST /api/tables/occupy` uygula.
- [ ] Masayı boşaltmak için `POST /api/tables/release` uygula.
- [ ] Arka uçta masa uygunluğunu doğrula (çift rezervasyonu önle).

### Önyüz Entegrasyonu

- [ ] `AuthContext`'i gerçek `/api/login` ve `/api/register` uç noktalarını kullanacak şekilde güncelle.
- [ ] `CartContext`'i `/api/orders` üzerinden sipariş gönderecek şekilde güncelle.
- [ ] `Admin.jsx`'i `/api/orders` üzerinden canlı siparişleri getirecek şekilde güncelle.
- [ ] API kullanarak Yönetici Panosunda sipariş durumu güncelleme mantığını uygula.

## Sprint 3 Görevleri

**Hedef:** Uygulamayı Dockerize et ve orkestrasyonu kur.

### Arka Uç Konteynerizasyonu

- [ ] Node.js/Express arka ucu için `Dockerfile.server` oluştur.
- [ ] `WORKDIR`, `COPY` ve `EXPOSE` (Port 3000) talimatlarını yapılandır.
- [ ] `server.js`'i çalıştırmak için `CMD` tanımla.

### Önyüz Konteynerizasyonu & Nginx

- [ ] React önyüzü için çok aşamalı `Dockerfile` oluştur.
- [ ] **Aşama 1 (Derleme):** Bağımlılıkları yükle ve `npm run build` çalıştır.
- [ ] **Aşama 2 (Sunma):** Statik dosyaları sunmak için `nginx:alpine` kullan.
- [ ] `nginx.conf` dosyasını `/etc/nginx/conf.d/default.conf` konumuna kopyala.

### Nginx Yapılandırması

- [ ] Statik dosya sunumunu yönetmek için `nginx.conf` oluştur.
- [ ] Arka uç servisine `/api` istekleri için ters proxy yapılandır.

### Orkestrasyon (Docker Compose)

- [ ] `docker-compose.yml` içinde `sprint3-backend` servisini tanımla.
- [ ] `docker-compose.yml` içinde `sprint3-frontend` servisini tanımla.
- [ ] Veri kalıcılığını sağlamak için `database` dizini için **Volume Mapping** yapılandır.
- [ ] Port eşlemelerini tanımla (örn. `5173:80`, `3003:3000`).

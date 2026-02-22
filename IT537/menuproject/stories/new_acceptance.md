# Kullanıcı Hikayeleri & Sprint Görevleri

Bu belge, Veranda Cafe & Brasserie menü projesi için kullanıcı hikayelerini, açıklamalarını, kabul kriterlerini ve Sprint görevlerini içermektedir.

---

## Kullanıcı Hikayeleri

### Hikaye 1: Menü Kategorilerini & Ürünleri Görüntüleme

- **Bir** Müşteri **olarak**,
- Menüye kategorilere (Başlangıçlar, Ana Yemekler, Pizza, Tatlılar, İçecekler) göre göz atmak **istiyorum**,
- **Böylece** sipariş etmek istediğim şeyi kolayca bulabilirim.

**Açıklama:**
Müşteriler menü sayfasını açtığında tüm ürünler kategori başlıkları altında listelenir. Üst navigasyon çubuğunda "All" ve her kategori için ayrı filtre butonları bulunur. Ürünler kart (card) formatında gösterilir; her kartta ürün adı, fiyatı (₺) ve açıklaması yer alır.

**Kabul Kriterleri:**
- [ ] Menü sayfasında 5 kategori (Appetizers, Main Courses, Pizza, Desserts, Beverages) ve "All" filtresi bulunmalıdır
- [ ] "All" seçildiğinde tüm kategorilerdeki ürünler başlıklarıyla birlikte listelenmelidir
- [ ] Bir kategori seçildiğinde yalnızca o kategorideki ürünler gösterilmelidir
- [ ] Her ürün kartında ad, fiyat (₺) ve açıklama görünmelidir
- [ ] Ürün kartları duyarlı (responsive) ızgara düzeninde sıralanmalıdır

---

### Hikaye 2: Sepete Ürün Ekleme

- **Bir** Müşteri **olarak**,
- Menüden ürünleri sepetime eklemek **istiyorum**,
- **Böylece** siparişimi oluşturabilirim.

**Açıklama:**
Her ürün kartında "Add to Cart" butonu bulunur. Butona tıklandığında ürün sepete eklenir ve buton kısa süreliğine "✓ Added" olarak değişerek görsel geri bildirim sağlar. Pişirme seviyesi gerektiren ürünlerde (burger, steak) eklemeden önce seviye seçilmelidir.

**Kabul Kriterleri:**
- [ ] Her ürün kartında "Add to Cart" butonu bulunmalıdır
- [ ] Butona tıklandığında ürün sepete eklenmelidir
- [ ] Ekleme sonrası buton 1.5 saniye "✓ Added" göstermelidir
- [ ] `hasCookingLevel: true` olan ürünlerde (burger, steak) pişirme seviyesi dropdown'u gösterilmelidir
- [ ] Pişirme seviyeleri: Rare, Medium Rare, Medium, Medium Well, Well Done olmalıdır
- [ ] Seçilen pişirme seviyesi sepetteki ürünle birlikte kaydedilmelidir

---

### Hikaye 3: Sepet Özetini Görüntüleme

- **Bir** Müşteri **olarak**,
- Sepet içeriğimi ve toplam fiyatı görmek **istiyorum**,
- **Böylece** sipariş vermeden önce seçimimi kontrol edebilirim.

**Açıklama:**
Header'daki "Cart (X)" butonuna tıklandığında sağdan açılan bir sepet kenar çubuğu (sidebar) görünür. Sepette eklenen ürünler, pişirme seviyeleri, birim fiyatları ve genel toplam listelenir. Her ürünün yanında "Remove" butonu bulunur.

**Kabul Kriterleri:**
- [ ] Header'da sepetteki ürün sayısını gösteren "Cart (X)" butonu bulunmalıdır
- [ ] Butona tıklandığında sepet kenar çubuğu sağdan kayarak açılmalıdır
- [ ] Sepette her ürünün adı, pişirme seviyesi (varsa) ve fiyatı görünmelidir
- [ ] Genel toplam tutar doğru hesaplanmalı ve gösterilmelidir
- [ ] Her ürünün yanında "Remove" butonu ile ürün çıkarılabilmelidir
- [ ] Sepet boşken "Your cart is empty" mesajı gösterilmelidir
- [ ] Overlay'e veya X butonuna tıklayarak sepet kapatılabilmelidir

---

### Hikaye 4: Masa Numarası Seçimi

- **Bir** Müşteri **olarak**,
- Sipariş vermeden önce masa numaramı seçmek **istiyorum**,
- **Böylece** personel yemeği nereye servis edeceğini bilir.

**Açıklama:**
Checkout butonuna tıklandığında 10 masalık bir seçim modalı açılır. Masalar numaralı kartlar olarak gösterilir. Tıklanan masa seçilerek sipariş o masaya atanır.

**Kabul Kriterleri:**
- [ ] Checkout sonrası masa seçim modalı açılmalıdır
- [ ] 10 masa kartı numaralarıyla birlikte gösterilmelidir
- [ ] Masaya tıklandığında seçim yapılmalı ve sipariş akışına devam edilmelidir
- [ ] Modal, overlay'e tıklanarak veya X butonuyla kapatılabilmelidir

---

### Hikaye 5: Sipariş Verme

- **Bir** Müşteri **olarak**,
- Siparişimi onaylamak ve göndermek **istiyorum**,
- **Böylece** sipariş mutfağa iletilir.

**Açıklama:**
Sepetteki "Checkout" butonuna tıklanıp masa seçildikten sonra sipariş tamamlanır. Sepet temizlenir ve toast mesajıyla onay bilgisi gösterilir.

**Kabul Kriterleri:**
- [ ] Sepet boşken checkout yapılmaya çalışılırsa "Your cart is empty!" uyarısı gösterilmelidir
- [ ] Masa seçimi sonrası sipariş başarıyla verilmelidir
- [ ] Sipariş verildikten sonra sepet otomatik temizlenmelidir
- [ ] Başarılı siparişte "Order placed for Table X!" toast mesajı gösterilmelidir
- [ ] Toast mesajı 3 saniye sonra otomatik kaybolmalıdır

---

### Hikaye 6: Kullanıcı Girişi

- **Bir** Kullanıcı (Müşteri veya Yönetici) **olarak**,
- Sisteme giriş yapmak **istiyorum**,
- **Böylece** yetkili alanlara erişebilirim.

**Açıklama:**
Kullanıcılar giriş yaparak sisteme erişir. Müşteriler menü sayfasına, yöneticiler admin paneline yönlendirilir. Yetkisiz erişim engellenir.

**Kabul Kriterleri:**
- [ ] Giriş sayfası kullanıcı adı ve şifre alanlarını içermelidir
- [ ] Doğru bilgilerle giriş yapılabilmelidir
- [ ] Müşteri girişinde menü sayfasına (`/main`), admin girişinde admin paneline (`/admin`) yönlendirilmelidir
- [ ] Hatalı giriş bilgilerinde hata mesajı gösterilmelidir
- [ ] Çıkış (Logout) butonu ile oturum sonlandırılabilmelidir
- [ ] Yetkisiz kullanıcılar korumalı sayfalara erişememeli, giriş sayfasına yönlendirilmelidir

---

### Hikaye 7: Aktif Siparişleri Görüntüleme (Yönetici)

- **Bir** Yönetici **olarak**,
- Tüm aktif siparişlerin listesini görmek **istiyorum**,
- **Böylece** mevcut siparişleri takip edebilirim.

**Açıklama:**
Admin panelinde tüm siparişler tablo formatında listelenir. Her satırda sipariş ID, masa numarası, müşteri adı, ürünler, toplam tutar, tarih/saat ve durum bilgisi bulunur. Durum filtreleme butonlarıyla siparişler filtrelenebilir.

**Kabul Kriterleri:**
- [ ] Siparişler tablo formatında listelenmeli: Order ID, Table, Customer, Items, Total, Date & Time, Status, Action
- [ ] Siparişler tarihe göre en yeniden en eskiye sıralanmalıdır
- [ ] "All", "Pending", "Preparing", "Ready", "Completed" filtre butonları çalışmalıdır
- [ ] Sipariş yoksa "No orders found" mesajı gösterilmelidir
- [ ] Durum badge'leri duruma göre farklı renklerde gösterilmelidir

---

### Hikaye 8: Sipariş Durumunu Güncelleme

- **Bir** Yönetici **olarak**,
- Siparişlerin durumunu (Pending → Preparing → Ready → Completed) güncellemek **istiyorum**,
- **Böylece** mutfak iş akışını yönetebilirim.

**Açıklama:**
Her sipariş satırında durum değiştirme dropdown'u bulunur. Yönetici bir durum seçtiğinde sipariş durumu güncellenir. Geçerli durumlar: Pending (Beklemede), Preparing (Hazırlanıyor), Ready (Hazır), Completed (Tamamlandı).

**Kabul Kriterleri:**
- [ ] Her sipariş satırında durum değiştirme dropdown'u bulunmalıdır
- [ ] Dropdown'da 4 durum seçeneği olmalıdır: Pending, Preparing, Ready, Completed
- [ ] Mevcut durum seçeneği disable (devre dışı) olmalıdır
- [ ] Durum değişikliği tabloya anında yansımalıdır
- [ ] Durum badge'i güncellenen duruma göre renk değiştirmelidir

---

### Hikaye 9: Günlük İstatistikleri Görüntüleme

- **Bir** Yönetici **olarak**,
- Toplam gelir ve sipariş sayılarını gösteren istatistik kartlarını görmek **istiyorum**,
- **Böylece** restoranın performansını izleyebilirim.

**Açıklama:**
Admin panelinin üst kısmında 4 istatistik kartı yer alır: Toplam Sipariş, Bekleyen Siparişler, Toplam Gelir ve Bugünkü Siparişler. Kartlar mevcut sipariş verilerine göre hesaplanır.

**Kabul Kriterleri:**
- [ ] "Total Orders" kartı toplam sipariş sayısını göstermelidir
- [ ] "Pending Orders" kartı bekleyen sipariş sayısını göstermelidir
- [ ] "Total Revenue" kartı toplam geliri ₺ cinsinden göstermelidir
- [ ] "Today's Orders" kartı bugünkü sipariş sayısını göstermelidir
- [ ] Veriler mevcut sipariş listesinden doğru hesaplanmalıdır

---

### Hikaye 10: Veri Kalıcılığı

- **Bir** Sistem Yöneticisi **olarak**,
- Sipariş ve kullanıcı verilerinin sunucu tarafında dosyaya kaydedilmesini **istiyorum**,
- **Böylece** sunucu yeniden başlatıldığında veriler kaybolmaz.

**Açıklama:**
Backend sunucu, kullanıcı ve sipariş verilerini CSV dosyalarında saklar. Sunucu başlarken dosyalar yoksa otomatik oluşturulur. Docker volume mapping sayesinde container yeniden başlatılsa da veriler korunur.

**Kabul Kriterleri:**
- [ ] `user.csv`, `admin.csv` ve `order.csv` dosyaları sunucu tarafında oluşturulmalıdır
- [ ] Sunucu başlatıldığında dosyalar yoksa başlık satırlarıyla otomatik oluşturulmalıdır
- [ ] Varsayılan hesaplar (customer/customer123, admin/admin123) otomatik oluşturulmalıdır
- [ ] Siparişler `order.csv`'ye kalıcı olarak kaydedilmelidir
- [ ] Docker volume mapping ile dosyalar container dışında tutulmalıdır
- [ ] Sunucu yeniden başlatıldığında veriler korunmalıdır

---

### Hikaye 11: Kalıcı Masa Seçimi

- **Bir** Müşteri **olarak**,
- Masa seçimimin oturum boyunca hatırlanmasını **istiyorum**,
- **Böylece** her siparişte tekrar masa seçmek zorunda kalmam.

**Açıklama:**
Seçilen masa `localStorage`'da saklanır ve header'da aktif masa badge'i olarak gösterilir. Aynı masadan tekrar sipariş verildiğinde modal atlanır. "Leave Table" butonu veya logout ile masa bırakılır.

**Kabul Kriterleri:**
- [ ] Seçilen masa `localStorage`'a kaydedilmelidir
- [ ] Sayfa yenilendiğinde masa seçimi korunmalıdır
- [ ] Header'da aktif masa numarası badge olarak gösterilmelidir
- [ ] Aktif masası olan kullanıcı checkout yaptığında masa seçim modalı atlanmalıdır
- [ ] "Leave Table" (X) butonuyla masa bırakılabilmelidir
- [ ] Logout yapıldığında masa bilgisi temizlenmelidir

---

### Hikaye 12: Kullanıcı Kaydı

- **Bir** Yeni Müşteri **olarak**,
- Sisteme kayıt olmak **istiyorum**,
- **Böylece** kendi hesabımla giriş yapabilir ve sipariş verebilirim.

**Açıklama:**
Giriş sayfasında "Register" modu bulunur. Kullanıcı adı, şifre ve hesap tipi (Customer/Admin) seçilerek yeni hesap oluşturulur. Kayıt başarılı olunca kullanıcı giriş moduna yönlendirilir.

**Kabul Kriterleri:**
- [ ] Giriş sayfasında Login ve Register modları arasında geçiş yapılabilmelidir
- [ ] Kayıt formunda kullanıcı adı ve şifre alanları bulunmalıdır
- [ ] Hesap tipi seçimi (Customer / Admin) sağlanmalıdır
- [ ] Aynı kullanıcı adıyla tekrar kayıt engellenmelidir (hata mesajı gösterilmeli)
- [ ] Başarılı kayıt sonrası "Registration successful" mesajı gösterilmelidir
- [ ] Kullanıcı bilgileri `user.csv`'ye kaydedilmelidir

---

### Hikaye 13: Ürün Görselleri

- **Bir** Müşteri **olarak**,
- Menüdeki ürünlerin fotoğraflarını görmek **istiyorum**,
- **Böylece** ne sipariş ettiğimi görsel olarak anlayabilirim.

**Açıklama:**
Her ürün kartının üst kısmında ürüne ait bir fotoğraf gösterilir. Görseller Unsplash/Pexels gibi kaynaklardan veya lokal dosyalardan yüklenir. Yükleme hatası durumunda yedek görsel gösterilir.

**Kabul Kriterleri:**
- [ ] Her ürün kartında ürün görseli bulunmalıdır
- [ ] Görseller lazy loading ile yüklenmelidir
- [ ] Görsel yüklenemezse fallback (yedek) görüntü gösterilmelidir
- [ ] Görseller kartın üst kısmında uygun boyutta görüntülenmelidir

---

### Hikaye 14: Sadakat Puanı Sistemi

- **Bir** Müşteri **olarak**,
- Her siparişte puan kazanmak ve biriken puanlarımı görmek **istiyorum**,
- **Böylece** sadakatimin ödüllendirildiğini hissedebilirim.

**Açıklama:**
Her 100₺'lik siparişte 1 puan kazanılır. Kazanılan puanlar header'da badge olarak gösterilir. Sipariş sonrası kazanılan puan toast mesajında görüntülenir. Puanlar sunucu tarafında `user.csv`'deki Points sütununda saklanır.

**Kabul Kriterleri:**
- [ ] Her 100₺ harcama için 1 puan kazanılmalıdır (aşağı yuvarlanarak: `Math.floor(total / 100)`)
- [ ] Header'da kullanıcının mevcut puan bakiyesi badge olarak gösterilmelidir
- [ ] Sipariş sonrası toast mesajında kazanılan puan bilgisi gösterilmelidir ("+X pts")
- [ ] Puanlar `user.csv` dosyasındaki Points sütununda kalıcı olarak saklanmalıdır
- [ ] Kullanıcı puanı `GET /api/users/:username/points` endpoint'inden çekilmelidir

---

### Hikaye 15: Puanla Ödeme

- **Bir** Müşteri **olarak**,
- Yeterli puanım varsa checkout sırasında puanlarımla ödeme yapmak **istiyorum**,
- **Böylece** indirimli alışveriş yapabilirim.

**Açıklama:**
Sepet kenar çubuğunda "Pay with Points" bölümü bulunur. 1 puan = 10₺ indirim olarak hesaplanır. Yeterli puan varsa toggle switch ile aktifleştirilebilir. Yeterli yoksa uyarı mesajı gösterilir. Aktifleştirildiğinde orijinal fiyat üstü çizili gösterilir ve indirimli toplam hesaplanır.

**Kabul Kriterleri:**
- [ ] Sepette "Pay with Points" bölümü, Award ikonu ve puan bakiyesi gösterilmelidir
- [ ] 1 puan = 10₺ indirim kuruyla hesaplama yapılmalıdır
- [ ] Yeterli puan varsa toggle switch gösterilmeli ve "Use X pts (-Y₺)" yazmalıdır
- [ ] Yeterli puan yoksa "⚠️ Not enough points. You need X pts (Y more needed)" uyarısı gösterilmelidir
- [ ] Toggle aktifleştirildiğinde orijinal fiyat üstü çizili, indirimli toplam gösterilmelidir
- [ ] Checkout butonu "Checkout (X pts + Y₺)" olarak güncellenmelidir
- [ ] Puan harcama `POST /api/users/:username/spend-points` endpoint'i üzerinden yapılmalıdır
- [ ] Harcanan puanlar kullanıcı bakiyesinden düşülmelidir

---

### Hikaye 16: Liderlik Tablosu

- **Bir** Müşteri **olarak**,
- En çok puana sahip kullanıcıların sıralamasını görmek **istiyorum**,
- **Böylece** kendi konumumu diğer müşterilerle karşılaştırabilirim.

**Açıklama:**
Header'daki Trophy ikonuna tıklandığında liderlik tablosu açılır/kapanır. İlk 5 kullanıcı puanlarına göre sıralanır. İlk 3 sıra altın, gümüş, bronz ikonlarıyla vurgulanır. Admin panelinde tam boyutlu liderlik tablosu gösterilir.

**Kabul Kriterleri:**
- [ ] Header'da Trophy butonu bulunmalı ve tıklandığında liderlik tablosu açılmalıdır
- [ ] En yüksek puanlı 5 kullanıcı sıralanmalıdır
- [ ] 1., 2. ve 3. sıra altın (🥇), gümüş (🥈), bronz (🥉) ikonlarıyla gösterilmelidir
- [ ] Liderlik tablosu `GET /api/leaderboard` endpoint'inden veri çekmelidir
- [ ] Admin panelinde tam boyutlu liderlik tablosu otomatik gösterilmelidir
- [ ] Her 30 saniyede otomatik yenilenmelidir

---

### Hikaye 17: Ürün Varyantları

- **Bir** Müşteri **olarak**,
- Bazı ürünlerde (örn. Coca Cola) alt seçenek belirlemek **istiyorum**,
- **Böylece** istediğim varyantı sipariş edebilirim.

**Açıklama:**
Varyant içeren ürünlerde (Coca Cola) sepete eklemeden önce "Type:" dropdown'u ile seçim yapılır (Classic, Zero, Light). Seçilen varyant sepette ürün adının yanında gösterilir.

**Kabul Kriterleri:**
- [ ] `hasVariant: true` olan ürünlerde "Type:" dropdown'u gösterilmelidir
- [ ] Coca Cola için Classic, Zero, Light varyantları sunulmalıdır
- [ ] Seçilen varyant sepetteki ürün bilgisiyle kaydedilmelidir
- [ ] Sepette varyant bilgisi ürün adının yanında parantez içinde gösterilmelidir (Classic hariç)

---

### Hikaye 18: Siparişleri CSV Olarak Dışa Aktarma

- **Bir** Yönetici **olarak**,
- Sipariş verilerini CSV dosyası olarak indirmek **istiyorum**,
- **Böylece** verileri dış araçlarda analiz edebilirim.

**Açıklama:**
Admin panelinde "Export CSV" butonu bulunur. Tıklandığında mevcut sipariş verileri CSV formatında tarayıcıya indirilir.

**Kabul Kriterleri:**
- [ ] Admin panelinde "Export CSV" butonu bulunmalıdır
- [ ] Butona tıklandığında siparişler CSV dosyası olarak indirilmelidir
- [ ] CSV dosyası tüm sipariş sütunlarını (ID, Customer, Table, Total, Date, Status, Items) içermelidir

---

## Sprint Görevleri

---

## Sprint 1 — Statik UI Prototipi

**Hedef:** Backend olmadan çalışan, tüm arayüz bileşenlerinin mock (sahte) verilerle demo edildiği frontend prototipi.

### Hikaye 1: Menü Kategorilerini & Ürünleri Görüntüleme
- [x] `ProductCard` bileşeni oluştur (ad, fiyat, açıklama, pişirme seviyesi, sepete ekle butonu)
- [x] `data/products.js` dosyasında 5 kategori ve ~20 ürün tanımla
- [x] `Menu.jsx` sayfasında kategori filtreleme mantığını uygula
- [x] Duyarlı (responsive) ızgara düzeni CSS'ini uygula

### Hikaye 2: Sepete Ürün Ekleme
- [x] `CartContext` ile React Context API tabanlı sepet yönetimi uygula
- [x] `ProductCard` içinde "Add to Cart" → "✓ Added" animasyonu ekle
- [x] Pişirme seviyesi dropdown'unu `hasCookingLevel` olan ürünlerde göster

### Hikaye 3: Sepet Özetini Görüntüleme
- [x] `CartSidebar` bileşeni oluştur (ürün listesi, tutar, Remove butonu)
- [x] Toplam fiyat hesaplama mantığını CartContext'e ekle
- [x] Header'da "Cart (X)" butonuyla açılma/kapanma geçişi uygula

### Hikaye 4: Masa Numarası Seçimi
- [x] `TableSelectionModal` bileşeni oluştur (10 masa kartı)
- [x] Masa tıklandığında seçim yapılıp modal kapansın

### Hikaye 5: Sipariş Verme (Mock)
- [x] Checkout → sepet temizle + toast mesajı göster (backend yok)
- [x] Toast bildirim bileşeni (3sn otomatik kapanma)

### Hikaye 6: Kullanıcı Girişi (Mock)
- [x] `AuthContext` ile sahte giriş/çıkış durumu (otomatik Demo User)
- [x] Giriş sayfası yok — doğrudan menüye erişim

### Hikaye 7: Aktif Siparişleri Görüntüleme
- [x] `OrdersTable` bileşeni oluştur (tablo formatında)
- [x] `Admin.jsx` içinde 2 sahte sipariş ile UI demo

### Hikaye 8: Sipariş Durumunu Güncelleme (Mock)
- [x] Durum filtre butonları (All, Pending, Preparing, Ready, Completed)
- [x] Durum değiştirme dropdown'u (mock — sadece console.log)

### Hikaye 9: Günlük İstatistikleri Görüntüleme
- [x] `StatsDashboard` bileşeni (4 istatistik kartı)
- [x] Sahte verilerle hesaplama

### Hikaye 11: Kalıcı Masa Seçimi
- [x] `localStorage`'da masa bilgisi saklama
- [x] Header'da aktif masa badge'i + "Leave Table" butonu

### Altyapı & Kurulum
- [x] Vite + React projesi oluştur
- [x] Bağımlılıklar: `react-router-dom`, `lucide-react`
- [x] CSS değişkenleri ile tema (cozy renk paleti)
- [x] React Router: `/main` (Menu), `/admin` (Admin)
- [x] Docker: Tek container (Vite build → Nginx, port 5171)

---

## Sprint 2 — Backend Entegrasyonu

**Hedef:** Express.js backend API, CSV dosya veritabanı ve frontend-backend entegrasyonu.

### Arka Uç Kurulumu
- [x] `server.js` Express uygulaması oluştur
- [x] `cors` ve JSON body parser ara yazılımlarını yapılandır
- [x] CSV depolama için `database/` dizini oluştur

### Hikaye 10: Veri Kalıcılığı (CSV)
- [x] `ensureFiles()` fonksiyonu: Başlangıçta `user.csv`, `admin.csv`, `order.csv` otomatik oluştur
- [x] CSV ayrıştırma ve yazma yardımcı fonksiyonları uygula
- [x] Varsayılan hesaplar oluştur (customer/customer123, admin/admin123)

### Hikaye 6: Kullanıcı Girişi (Gerçek)
- [x] `POST /api/login` — CSV'den kimlik doğrulama
- [x] Demo butonlu giriş sayfası (Customer Login / Admin Login)
- [x] `ProtectedRoute` bileşeni ile rol tabanlı rota koruması
- [x] `AuthContext`'i gerçek API çağrılarıyla güncelle
- [x] Oturum bilgisini `localStorage`'da sakla

### Hikaye 5: Sipariş Verme (Gerçek)
- [x] `POST /api/orders` — Siparişi `order.csv`'ye kaydet
- [x] `GET /api/orders` — Sipariş geçmişini getir
- [x] Frontend'den gerçek API çağrısı ile sipariş gönder

### Hikaye 8: Sipariş Durumunu Güncelleme (Gerçek)
- [x] `PUT /api/orders/:id` — CSV'de durum güncelle
- [x] Admin panelinde gerçek durum güncelleme

### Hikaye 7: Aktif Siparişleri Görüntüleme (Gerçek)
- [x] Admin panelinde `GET /api/orders` ile gerçek sipariş listeleme
- [x] Her 30 saniyede otomatik yenileme (auto-refresh)

### Hikaye 4: Masa Numarası Seçimi (Sunucu Doğrulamalı)
- [x] `POST /api/tables/occupy` — Masa doluluk kontrolü (sunucu tarafı)
- [x] `POST /api/tables/release` — Masa boşaltma
- [x] `TableSelectionModal`'da gerçek doluluk durumu gösterimi

### Hikaye 11: Kalıcı Masa Seçimi
- [x] Sepet verileri `localStorage`'a kaydedilsin (sayfa yenilemesinde korunsun)

### Hikaye 18: Siparişleri CSV Olarak Dışa Aktarma
- [x] Admin panelinde "Export CSV" indirme butonu

### Altyapı & Docker
- [x] `Dockerfile.server` (Node.js backend)
- [x] `Dockerfile` (Vite build → Nginx frontend)
- [x] `nginx.conf` — `/api` ters proxy yapılandırması
- [x] Docker Compose: `sprint2-frontend` (port 5172), `sprint2-backend` (port 3002)
- [x] Volume mapping: CSV dosyaları container dışında

---

## Sprint 3 — Final Sürüm

**Hedef:** Kullanıcı kaydı, sadakat puanı sistemi, ürün görselleri, varyantlar, liderlik tablosu ve genişletilmiş menü.

### Hikaye 12: Kullanıcı Kaydı
- [x] `POST /api/register` — Yeni müşteri hesabı oluştur (kullanıcı adı çakışma kontrolü)
- [x] Giriş sayfasında Login/Register mod geçişi
- [x] Kullanıcı adı + şifre + tip (Customer/Admin) seçicili form

### Hikaye 6: Kullanıcı Girişi (Tam Form)
- [x] Demo butonlar yerine kullanıcı adı/şifre giriş formu
- [x] Hesap tipi seçimi (Customer / Admin toggle)

### Hikaye 13: Ürün Görselleri
- [x] Tüm ~45 ürüne Unsplash/Pexels/lokal görsel ekle
- [x] `ProductCard`'a görsel alanı ekle (lazy loading + fallback)

### Hikaye 1: Genişletilmiş Menü
- [x] Menüyü ~45+ ürüne genişlet (10 başlangıç, 9 ana yemek, 10 pizza, 8 tatlı, 10 içecek)

### Hikaye 14: Sadakat Puanı Sistemi
- [x] `user.csv`'ye Points sütunu ekle (geriye dönük uyumlu migrasyon)
- [x] Sipariş sonrası puan kazanma: `Math.floor(total / 100)`
- [x] `GET /api/users/:username/points` — Puan sorgulama
- [x] Header'da puan badge'i göster

### Hikaye 15: Puanla Ödeme
- [x] `POST /api/users/:username/spend-points` — Puan harcama (doğrulama + düşme)
- [x] CartSidebar'da "Pay with Points" toggle UI
- [x] Yeterli puan yoksa uyarı mesajı
- [x] İndirimli toplam hesaplama ve çapraz fiyat gösterimi
- [x] Checkout akışında puan harcama entegrasyonu (Menu.jsx)

### Hikaye 16: Liderlik Tablosu
- [x] `GET /api/leaderboard` — Puanlara göre sıralı kullanıcı listesi
- [x] `Leaderboard` bileşeni (altın/gümüş/bronz ikonları)
- [x] Menü sayfasında compact mod (Trophy butonu ile açılma)
- [x] Admin panelinde tam boyutlu liderlik tablosu

### Hikaye 17: Ürün Varyantları
- [x] Coca Cola'ya `hasVariant: true` + `variants` dizisi ekle (Classic/Zero/Light)
- [x] `ProductCard`'da "Type:" dropdown varyant seçici
- [x] `CartContext.addToCart()` üçüncü parametre olarak varyant kabul etsin
- [x] Sepette varyant bilgisi gösterimi

### Altyapı & Docker
- [x] `Dockerfile.server` + `Dockerfile` (çok aşamalı build)
- [x] `nginx.conf` — `/api` → `sprint3-backend:3000` ters proxy
- [x] Docker Compose: `sprint3-frontend` (port 5173), `sprint3-backend` (port 3003)
- [x] Volume mapping: CSV dosyaları kalıcı
- [x] Points sütunu otomatik migrasyon (`ensureFiles`)

---

## Sprint Karşılaştırma Tablosu

| Özellik | Sprint 1 | Sprint 2 | Sprint 3 |
|---|:---:|:---:|:---:|
| Giriş sayfası | Yok (Demo User) | Demo butonları | Tam form + kayıt |
| Kullanıcı kaydı | ✗ | ✗ | ✓ |
| Backend sunucu | ✗ | ✓ (Express) | ✓ (Express) |
| Veritabanı | Yok | CSV dosyaları | CSV + Points sütunu |
| Sipariş kalıcılığı | ✗ (mock) | ✓ | ✓ |
| Masa doğrulama | ✗ (hep müsait) | ✓ (sunucu tarafı) | ✓ (sunucu tarafı) |
| Sepet kalıcılığı | ✗ (bellek) | ✓ (localStorage) | ✓ (localStorage) |
| Ürün görselleri | ✗ | ✗ | ✓ |
| Ürün sayısı | ~20 | ~20 | ~45+ |
| Ürün varyantları | ✗ | ✗ | ✓ (Coca Cola) |
| Pişirme seviyesi | ✓ | ✓ | ✓ |
| Puan sistemi | ✗ | ✗ | ✓ (kazan + harca) |
| Liderlik tablosu | ✗ | ✗ | ✓ |
| CSV dışa aktarma | ✗ | ✓ | ✓ |
| Otomatik yenileme | ✗ | ✓ (30sn) | ✓ (30sn) |
| Korumalı rotalar | ✗ | ✓ | ✓ |
| Docker container | 1 (frontend) | 2 (frontend + backend) | 2 (frontend + backend) |
| Nginx ters proxy | ✗ (statik) | ✓ | ✓ |

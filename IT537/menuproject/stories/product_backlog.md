# Product Backlog — Menu Project

> **Proje:** Restoran Dijital Menü & Sipariş Yönetim Sistemi  
> **Teknoloji Yığını:** React (Vite) + Node.js/Express + CSV Veritabanı + Docker  
> **Başlangıç Tarihi:** 2026-02-22  
> **Toplam Story Point:** 89

---

## Öncelik Sırası

| Öncelik   | ID    | Başlık                                  | Etiketler                                                 | Tahmini Süre |
| --------- | ----- | --------------------------------------- | --------------------------------------------------------- | ------------ |
| 🔴 Yüksek | PB-01 | Menü Kategorileri ve Ürünleri Görüntüle | `frontend`, `customer`, `sprint-1`                        | 3 gün        |
| 🔴 Yüksek | PB-02 | Sepete Ürün Ekle                        | `frontend`, `customer`, `sprint-1`                        | 2 gün        |
| 🔴 Yüksek | PB-03 | Sepet Özetini Görüntüle                 | `frontend`, `customer`, `sprint-1`                        | 2 gün        |
| 🔴 Yüksek | PB-04 | Masa Numarası Seç                       | `frontend`, `customer`, `sprint-1`                        | 1 gün        |
| 🔴 Yüksek | PB-05 | Sipariş Ver                             | `frontend`, `customer`, `sprint-1`                        | 2 gün        |
| 🔴 Yüksek | PB-06 | Admin Girişi                            | `frontend`, `backend`, `auth`, `sprint-1`                 | 2 gün        |
| 🟠 Orta   | PB-07 | Aktif Siparişleri Görüntüle (Admin)     | `frontend`, `admin`, `sprint-1`                           | 2 gün        |
| 🟠 Orta   | PB-08 | Sipariş Durumunu Güncelle (Admin)       | `frontend`, `admin`, `sprint-1`                           | 1 gün        |
| 🟡 Düşük  | PB-09 | Günlük İstatistikleri Görüntüle (Admin) | `frontend`, `admin`, `sprint-1`                           | 1 gün        |
| 🔴 Yüksek | PB-10 | Veri Kalıcılığı (CSV Backend)           | `backend`, `database`, `sprint-2`                         | 4 gün        |
| 🔴 Yüksek | PB-11 | Kalıcı Masa Seçimi                      | `frontend`, `backend`, `customer`, `sprint-2`, `sprint-3` | 3 gün        |
| 🟠 Orta   | PB-12 | Backend API — Kimlik Doğrulama          | `backend`, `auth`, `sprint-2`                             | 2 gün        |
| 🟠 Orta   | PB-13 | Backend API — Sipariş Yönetimi          | `backend`, `orders`, `sprint-2`                           | 3 gün        |
| 🟠 Orta   | PB-14 | Backend API — Masa Yönetimi             | `backend`, `tables`, `sprint-2`                           | 2 gün        |
| 🟡 Düşük  | PB-15 | Backend — Frontend Entegrasyonu         | `frontend`, `backend`, `integration`, `sprint-2`          | 3 gün        |
| 🟡 Düşük  | PB-16 | Backend Containerization (Docker)       | `devops`, `docker`, `sprint-3`                            | 2 gün        |
| 🟡 Düşük  | PB-17 | Frontend Containerization & Nginx       | `devops`, `docker`, `nginx`, `sprint-3`                   | 2 gün        |
| 🟡 Düşük  | PB-18 | Docker Compose Orchestration            | `devops`, `docker`, `sprint-3`                            | 1 gün        |

---

## Detaylı Backlog Öğeleri

---

### PB-01 — Menü Kategorileri ve Ürünleri Görüntüle

| Alan             | Değer                                   |
| ---------------- | --------------------------------------- |
| **ID**           | PB-01                                   |
| **Başlık**       | Menü Kategorileri ve Ürünleri Görüntüle |
| **Etiketler**    | `frontend` `customer` `sprint-1`        |
| **Tahmini Süre** | 3 gün                                   |
| **Öncelik**      | 🔴 Yüksek                               |

**Açıklama:**  
Müşteri olarak, menüyü kategorilere göre (Başlangıçlar, Ana Yemekler, İçecekler vb.) gezinmek ve ürünleri listelemek istiyorum; böylece ne sipariş edeceğimi kolayca bulabileyim.

**Görevler:**

- `ProductCard` bileşeni oluştur (ürün adı, fiyat, açıklama)
- `MenuPage` bileşeni ve kategori filtreleme mantığı
- `data/products.js` içinde mock ürün ve kategori verisi
- Menü öğeleri için responsive grid layout

---

### PB-02 — Sepete Ürün Ekle

| Alan             | Değer                            |
| ---------------- | -------------------------------- |
| **ID**           | PB-02                            |
| **Başlık**       | Sepete Ürün Ekle                 |
| **Etiketler**    | `frontend` `customer` `sprint-1` |
| **Tahmini Süre** | 2 gün                            |
| **Öncelik**      | 🔴 Yüksek                        |

**Açıklama:**  
Müşteri olarak, menüdeki ürünleri sepetime ekleyebilmek ve adetleri ayarlayabilmek istiyorum; böylece siparişimi oluşturabileyim.

**Görevler:**

- `CartContext` oluştur (ekleme / kaldırma / miktar güncelleme)
- `ProductCard` bileşenine "Sepete Ekle" butonu ekle
- Miktar artırma/azaltma mantığını `CartContext` içinde uygula

---

### PB-03 — Sepet Özetini Görüntüle

| Alan             | Değer                            |
| ---------------- | -------------------------------- |
| **ID**           | PB-03                            |
| **Başlık**       | Sepet Özetini Görüntüle          |
| **Etiketler**    | `frontend` `customer` `sprint-1` |
| **Tahmini Süre** | 2 gün                            |
| **Öncelik**      | 🔴 Yüksek                        |

**Açıklama:**  
Müşteri olarak, sipariş vermeden önce sepetimde hangi ürünlerin olduğunu ve toplam tutarı her an görmek istiyorum.

**Görevler:**

- `CartSidebar` bileşeni oluştur (ürün listesi + toplam fiyat)
- Toplam tutar hesaplama mantığını uygula
- `MenuPage` içine CartSidebar aç/kapat toggle'ı entegre et

---

### PB-04 — Masa Numarası Seç

| Alan             | Değer                            |
| ---------------- | -------------------------------- |
| **ID**           | PB-04                            |
| **Başlık**       | Masa Numarası Seç                |
| **Etiketler**    | `frontend` `customer` `sprint-1` |
| **Tahmini Süre** | 1 gün                            |
| **Öncelik**      | 🔴 Yüksek                        |

**Açıklama:**  
Müşteri olarak, ödeme aşamasında masa numaramı seçmek istiyorum; böylece garson doğru masaya servis yapabilsin.

**Görevler:**

- `TableSelectionModal` bileşeni oluştur
- Seçilen masa numarasını sipariş context'ine aktar

---

### PB-05 — Sipariş Ver

| Alan             | Değer                            |
| ---------------- | -------------------------------- |
| **ID**           | PB-05                            |
| **Başlık**       | Sipariş Ver                      |
| **Etiketler**    | `frontend` `customer` `sprint-1` |
| **Tahmini Süre** | 2 gün                            |
| **Öncelik**      | 🔴 Yüksek                        |

**Açıklama:**  
Müşteri olarak, siparişimi onaylayarak iletmek istiyorum; böylece mutfağa ulaşsın.

**Görevler:**

- `CartSidebar` içine "Sipariş Ver" butonu ekle
- Mock sipariş gönderme fonksiyonu oluştur (Sprint 1'de console.log)
- Başarılı siparişten sonra sepeti temizle

---

### PB-06 — Admin Girişi

| Alan             | Değer                                  |
| ---------------- | -------------------------------------- |
| **ID**           | PB-06                                  |
| **Başlık**       | Admin Girişi                           |
| **Etiketler**    | `frontend` `backend` `auth` `sprint-1` |
| **Tahmini Süre** | 2 gün                                  |
| **Öncelik**      | 🔴 Yüksek                              |

**Açıklama:**  
Admin olarak, kullanıcı adı ve şifreyle giriş yaparak yönetim paneline erişmek istiyorum; böylece kısıtlı alanlara ulaşabileyim.

**Görevler:**

- `AuthContext` oluştur (mock giriş/çıkış durumu yönetimi)
- Admin giriş formu sayfası oluştur
- `/admin` rotası için yetkisiz erişim koruması uygula

---

### PB-07 — Aktif Siparişleri Görüntüle (Admin)

| Alan             | Değer                               |
| ---------------- | ----------------------------------- |
| **ID**           | PB-07                               |
| **Başlık**       | Aktif Siparişleri Görüntüle (Admin) |
| **Etiketler**    | `frontend` `admin` `sprint-1`       |
| **Tahmini Süre** | 2 gün                               |
| **Öncelik**      | 🟠 Orta                             |

**Açıklama:**  
Admin olarak, tüm aktif siparişleri (masa numarası, ürünler, toplam tutar dahil) listeleyebilmek istiyorum; böylece anlık siparişleri takip edebileyim.

**Görevler:**

- `OrdersTable` bileşeni oluştur (Mock UI)
- `Admin.jsx` içinde görselleştirme için mock sipariş verisi oluştur

---

### PB-08 — Sipariş Durumunu Güncelle (Admin)

| Alan             | Değer                             |
| ---------------- | --------------------------------- |
| **ID**           | PB-08                             |
| **Başlık**       | Sipariş Durumunu Güncelle (Admin) |
| **Etiketler**    | `frontend` `admin` `sprint-1`     |
| **Tahmini Süre** | 1 gün                             |
| **Öncelik**      | 🟠 Orta                           |

**Açıklama:**  
Admin olarak, sipariş durumunu (Beklemede → Hazırlandı → Servis Edildi) güncelleyebilmek istiyorum; böylece mutfak iş akışını yönetirim.

**Görevler:**

- `OrdersTable` bileşenine durum güncelleme butonları ekle (Mock işlevsellik)

---

### PB-09 — Günlük İstatistikleri Görüntüle (Admin)

| Alan             | Değer                                   |
| ---------------- | --------------------------------------- |
| **ID**           | PB-09                                   |
| **Başlık**       | Günlük İstatistikleri Görüntüle (Admin) |
| **Etiketler**    | `frontend` `admin` `sprint-1`           |
| **Tahmini Süre** | 1 gün                                   |
| **Öncelik**      | 🟡 Düşük                                |

**Açıklama:**  
Admin olarak, toplam geliri ve sipariş sayısını içeren bir dashboard görünümü görmek istiyorum; böylece restoranın performansını izleyebileyim.

**Görevler:**

- `StatsDashboard` bileşeni oluştur (statik verilerle Mock UI)

---

### PB-10 — Veri Kalıcılığı (CSV Backend)

| Alan             | Değer                           |
| ---------------- | ------------------------------- |
| **ID**           | PB-10                           |
| **Başlık**       | Veri Kalıcılığı (CSV Backend)   |
| **Etiketler**    | `backend` `database` `sprint-2` |
| **Tahmini Süre** | 4 gün                           |
| **Öncelik**      | 🔴 Yüksek                       |

**Açıklama:**  
Sistem Admin olarak, sipariş ve kullanıcı verilerinin dosyaya/veritabanına kaydedilmesini istiyorum; böylece sunucu yeniden başladığında veriler kaybolmasın.

**Görevler:**

- Express ile `server.js` oluştur, `cors` ve `body-parser` middleware ekle
- `database/` dizini oluştur (CSV depolama için)
- `ensureFiles` fonksiyonu: `user.csv`, `admin.csv`, `order.csv` başlat
- CSV ayrıştırma ve yazma yardımcı fonksiyonları uygula
- Varsayılan Admin kullanıcısı yoksa oluştur

---

### PB-11 — Kalıcı Masa Seçimi

| Alan             | Değer                                                 |
| ---------------- | ----------------------------------------------------- |
| **ID**           | PB-11                                                 |
| **Başlık**       | Kalıcı Masa Seçimi                                    |
| **Etiketler**    | `frontend` `backend` `customer` `sprint-2` `sprint-3` |
| **Tahmini Süre** | 3 gün                                                 |
| **Öncelik**      | 🔴 Yüksek                                             |

**Açıklama:**  
Müşteri olarak, masa seçimimin hatırlanmasını ve masanın meşgul işaretlenmesini istiyorum; böylece her seferinde yeniden seçmek zorunda kalmayayım ve başkalarının masanın müsait olduğunu bilmesi sağlansın.

**Görevler:**

- `localStorage` veya `AuthContext` ile masa seçimini sakla
- Aktif masası olan kullanıcıları doğrudan menü sayfasına yönlendir
- Masa boşaltma ("Masayı Bırak" / "Ödeme") aksiyonunu uygula

---

### PB-12 — Backend API — Kimlik Doğrulama

| Alan             | Değer                          |
| ---------------- | ------------------------------ |
| **ID**           | PB-12                          |
| **Başlık**       | Backend API — Kimlik Doğrulama |
| **Etiketler**    | `backend` `auth` `sprint-2`    |
| **Tahmini Süre** | 2 gün                          |
| **Öncelik**      | 🟠 Orta                        |

**Açıklama:**  
Sistemin, gerçek kimlik doğrulama için API endpoint'lerine sahip olmasını istiyorum.

**Görevler:**

- `POST /api/register` — yeni müşteri kaydı
- `POST /api/login` — kullanıcı ve admin kimlik doğrulama

---

### PB-13 — Backend API — Sipariş Yönetimi

| Alan             | Değer                          |
| ---------------- | ------------------------------ |
| **ID**           | PB-13                          |
| **Başlık**       | Backend API — Sipariş Yönetimi |
| **Etiketler**    | `backend` `orders` `sprint-2`  |
| **Tahmini Süre** | 3 gün                          |
| **Öncelik**      | 🟠 Orta                        |

**Açıklama:**  
Sistemin, sipariş oluşturma, listeleme ve durum güncelleme için API endpoint'lerine sahip olmasını istiyorum.

**Görevler:**

- `GET /api/orders` — `order.csv`'den sipariş geçmişini al
- `POST /api/orders` — yeni siparişi `order.csv`'ye kaydet
- `PUT /api/orders/:id` — sipariş durumunu güncelle (Beklemede → Servis Edildi)

---

### PB-14 — Backend API — Masa Yönetimi

| Alan             | Değer                         |
| ---------------- | ----------------------------- |
| **ID**           | PB-14                         |
| **Başlık**       | Backend API — Masa Yönetimi   |
| **Etiketler**    | `backend` `tables` `sprint-2` |
| **Tahmini Süre** | 2 gün                         |
| **Öncelik**      | 🟠 Orta                       |

**Açıklama:**  
Sistemin, masa meşguliyetini takip etmek ve çift rezervasyonu önlemek için API endpoint'lerine sahip olmasını istiyorum.

**Görevler:**

- `POST /api/tables/occupy` — masayı belirli bir kullanıcı için meşgul işaretle
- `POST /api/tables/release` — masayı serbest bırak
- Backend'de masa müsaitliğini doğrula (çift rezervasyonu engelle)

---

### PB-15 — Backend — Frontend Entegrasyonu

| Alan             | Değer                                         |
| ---------------- | --------------------------------------------- |
| **ID**           | PB-15                                         |
| **Başlık**       | Backend — Frontend Entegrasyonu               |
| **Etiketler**    | `frontend` `backend` `integration` `sprint-2` |
| **Tahmini Süre** | 3 gün                                         |
| **Öncelik**      | 🟡 Düşük                                      |

**Açıklama:**  
Frontend'in, mock veriler yerine gerçek backend API'lerini kullanmasını istiyorum.

**Görevler:**

- `AuthContext`'i gerçek `/api/login` ve `/api/register` ile güncelle
- `CartContext`'i `/api/orders` üzerinden sipariş göndermesi için güncelle
- `Admin.jsx`'i `/api/orders`'dan canlı sipariş çekecek şekilde güncelle
- Admin panelinde API kullanarak sipariş durum güncelleme mantığını uygula

---

### PB-16 — Backend Containerization (Docker)

| Alan             | Değer                             |
| ---------------- | --------------------------------- |
| **ID**           | PB-16                             |
| **Başlık**       | Backend Containerization (Docker) |
| **Etiketler**    | `devops` `docker` `sprint-3`      |
| **Tahmini Süre** | 2 gün                             |
| **Öncelik**      | 🟡 Düşük                          |

**Açıklama:**  
DevOps olarak, Node.js/Express backend'ini container içinde çalıştırmak istiyorum; böylece ortama bağımsız dağıtım yapabileyim.

**Görevler:**

- Node.js/Express backend için `Dockerfile.server` oluştur
- `WORKDIR`, `COPY`, `EXPOSE` (Port 3000) talimatlarını yapılandır
- `server.js`'i çalıştırmak için `CMD` tanımla

---

### PB-17 — Frontend Containerization & Nginx

| Alan             | Değer                                |
| ---------------- | ------------------------------------ |
| **ID**           | PB-17                                |
| **Başlık**       | Frontend Containerization & Nginx    |
| **Etiketler**    | `devops` `docker` `nginx` `sprint-3` |
| **Tahmini Süre** | 2 gün                                |
| **Öncelik**      | 🟡 Düşük                             |

**Açıklama:**  
DevOps olarak, React frontend'ini çok aşamalı Docker yapısıyla container'a almak ve Nginx aracılığıyla sunmak istiyorum.

**Görevler:**

- React frontend için çok aşamalı `Dockerfile` oluştur
- **Aşama 1 (Build):** Bağımlılıkları yükle ve `npm run build` çalıştır
- **Aşama 2 (Serve):** Statik dosyaları sunmak için `nginx:alpine` kullan
- `nginx.conf`'u `/etc/nginx/conf.d/default.conf`'a kopyala
- Statik dosya sunumu için `nginx.conf` oluştur
- `/api` istekleri için backend servisine reverse proxy yapılandır

---

### PB-18 — Docker Compose Orchestration

| Alan             | Değer                        |
| ---------------- | ---------------------------- |
| **ID**           | PB-18                        |
| **Başlık**       | Docker Compose Orchestration |
| **Etiketler**    | `devops` `docker` `sprint-3` |
| **Tahmini Süre** | 1 gün                        |
| **Öncelik**      | 🟡 Düşük                     |

**Açıklama:**  
DevOps olarak, tüm servisleri tek bir komutla yönetmek için Docker Compose orchestration'ı kurmak istiyorum.

**Görevler:**

- `docker-compose.yml`'e `sprint3-backend` servisini tanımla
- `docker-compose.yml`'e `sprint3-frontend` servisini tanımla
- Veri kalıcılığı için `database/` dizinine **Volume Mapping** yapılandır
- Port eşlemelerini tanımla (ör. `5173:80`, `3003:3000`)

---

## Sprint Planı (Özet)

| Sprint       | Backlog Öğeleri                                               | Hedef                                                  | Toplam Süre |
| ------------ | ------------------------------------------------------------- | ------------------------------------------------------ | ----------- |
| **Sprint 1** | PB-01, PB-02, PB-03, PB-04, PB-05, PB-06, PB-07, PB-08, PB-09 | Mock verilerle çalışan React frontend                  | ~16 gün     |
| **Sprint 2** | PB-10, PB-11, PB-12, PB-13, PB-14, PB-15                      | Gerçek backend API, CSV veri kalıcılığı ve entegrasyon | ~17 gün     |
| **Sprint 3** | PB-16, PB-17, PB-18                                           | Dockerize edilmiş tam yığın uygulama                   | ~5 gün      |

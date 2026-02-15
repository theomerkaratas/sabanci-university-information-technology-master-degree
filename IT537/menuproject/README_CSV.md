# IT-526 Fine Dining - CSV Data Management System

## CSV Dosya Yönetimi Sistemi

Bu sistem, tüm login bilgilerini ve siparişleri CSV formatında saklayabilmenizi ve yönetebilmenizi sağlar.

## Özellikler

### 1. Otomatik Veri Kaydı
- **Login Activity**: Her kullanıcı girişi otomatik olarak kaydedilir
- **Order Tracking**: Her sipariş verildiğinde otomatik olarak kaydedilir
- Veriler localStorage'da tutulur ve CSV olarak export edilebilir

### 2. CSV Export İşlemleri (Admin Panelinde)

Admin paneline giriş yaptıktan sonra header'da 4 buton göreceksiniz:

#### 📥 Orders CSV
- Tüm siparişleri CSV formatında indirir
- İçerik: Sipariş ID, Müşteri, Masa, Toplam, Tarih, Durum, Ürünler
- Dosya adı: `orders_YYYY-MM-DD.csv`

#### 📥 Login CSV
- Tüm login aktivitelerini CSV formatında indirir
- İçerik: Kullanıcı adı, Kullanıcı tipi, Login zamanı, IP adresi
- Dosya adı: `login_activity_YYYY-MM-DD.csv`

#### 📥 All Data
- Hem siparişleri hem de login aktivitelerini tek CSV dosyasında indirir
- İçerik: Tüm veriler birleştirilmiş formatta
- Dosya adı: `all_data_YYYY-MM-DD.csv`

#### 📤 Import
- CSV dosyasından sipariş verilerini sisteme yükler
- Daha önce export ettiğiniz CSV dosyalarını geri yükleyebilirsiniz
- Mevcut veriler korunur, yeni veriler eklenir

### 3. CSV Dosya Formatı

#### Orders CSV Format:
```csv
Order ID,Customer,Table,Total,Date,Status,Items
1708012345678,customer,5,450₺,2026-02-15T10:30:00.000Z,pending,"Classic Burger (Medium) - 180₺; Coca Cola - 35₺"
```

#### Login Activity CSV Format:
```csv
Username,User Type,Login Time,IP Address
customer,customer,2026-02-15T10:25:00.000Z,Local
admin,admin,2026-02-15T10:28:00.000Z,Local
```

## Kullanım Adımları

### CSV Export (Dışa Aktarma)
1. Admin hesabıyla giriş yapın (`admin` / `admin123`)
2. Admin panelinde header'daki export butonlarından birini tıklayın
3. CSV dosyası otomatik olarak indirilecektir
4. CSV dosyasını istediğiniz yerde saklayın

### CSV Import (İçe Aktarma)
1. Admin panelinde "📤 Import" butonuna tıklayın
2. Daha önce export ettiğiniz CSV dosyasını seçin
3. Veriler otomatik olarak sisteme yüklenecektir
4. Sayfa yenilenerek yeni veriler görüntülenecektir

## Teknik Detaylar

### DataManager.js
Tüm CSV işlemleri `dataManager.js` dosyası tarafından yönetilir:

- `DataManager.exportOrdersToCSV()` - Siparişleri export eder
- `DataManager.exportLoginActivityToCSV()` - Login aktivitelerini export eder
- `DataManager.exportAllDataToCSV()` - Tüm verileri export eder
- `DataManager.importOrdersFromCSV(file)` - CSV'den sipariş import eder
- `DataManager.logLogin(username, type)` - Login kaydeder
- `DataManager.autoSaveOrderToCSV(order)` - Sipariş kaydeder

### Veri Saklama
- **localStorage**: Tarayıcıda kalıcı veri saklama
- **sessionStorage**: Oturum bazlı geçici saklama
- **CSV Files**: Dışa aktarılmış veri dosyaları

## Demo Login Bilgileri

### Müşteri Hesabı
- Kullanıcı adı: `customer`
- Şifre: `customer123`

### Admin Hesabı
- Kullanıcı adı: `admin`
- Şifre: `admin123`

## Önemli Notlar

1. **Veri Güvenliği**: CSV dosyaları hassas bilgiler içerebilir, güvenli bir yerde saklayın
2. **Yedekleme**: Düzenli olarak CSV export yaparak verilerinizi yedekleyin
3. **Tarayıcı Limitleri**: localStorage'ın boyut sınırı vardır (~5-10MB)
4. **CSV Format**: Excel veya Google Sheets ile açabilirsiniz
5. **Import Uyarısı**: Import işlemi mevcut verilere ekleme yapar, silme yapmaz

## Dosya Yapısı

```
frontend projesi/
├── index.html          # Müşteri menü sayfası
├── login.html          # Login sayfası
├── admin.html          # Admin panel sayfası
├── style.css           # CSS stilleri
├── dataManager.js      # CSV yönetim sistemi
└── README_CSV.md       # Bu dosya
```

## Sorun Giderme

### CSV dosyası indirilmiyor
- Tarayıcı pop-up engelleyici ayarlarını kontrol edin
- İndirmeler klasörünü kontrol edin

### Import çalışmıyor
- CSV dosyasının doğru formatta olduğundan emin olun
- Dosya encoding'inin UTF-8 olduğundan emin olun

### Veriler kayboldu
- localStorage temizlenmiş olabilir
- Daha önce export ettiğiniz CSV'den import yapın

## Gelecek İyileştirmeler

- Backend API entegrasyonu
- Otomatik backup sistemi
- Email ile CSV gönderimi
- Gelişmiş filtreleme ve raporlama
- Excel export desteği

---

**Not**: Bu sistem demo amaçlıdır. Production ortamında backend API ve veritabanı kullanılması önerilir.

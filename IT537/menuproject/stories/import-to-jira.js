/**
 * Jira Story Import Script
 * new_acceptance.md dosyasındaki 18 hikayeyi Jira'ya otomatik aktarır.
 * 
 * Kullanım: node import-to-jira.js
 * Gereksinim: Node.js 18+ (built-in fetch)
 */

const fs = require('fs');
const path = require('path');

// .env dosyasını oku
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) env[key.trim()] = valueParts.join('=').trim();
});

const JIRA_URL = env.JIRA_URL;
const JIRA_EMAIL = env.JIRA_EMAIL;
const JIRA_TOKEN = env.JIRA_API_TOKEN;
const PROJECT_KEY = env.JIRA_PROJECT_KEY;

const AUTH = Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64');

// Hikaye → Sprint eşlemesi
const storySprintMap = {
  1:  ['Sprint 1', 'Sprint 3'],
  2:  ['Sprint 1'],
  3:  ['Sprint 1'],
  4:  ['Sprint 1', 'Sprint 2'],
  5:  ['Sprint 1', 'Sprint 2'],
  6:  ['Sprint 1', 'Sprint 2', 'Sprint 3'],
  7:  ['Sprint 1', 'Sprint 2'],
  8:  ['Sprint 1', 'Sprint 2'],
  9:  ['Sprint 1'],
  10: ['Sprint 2'],
  11: ['Sprint 1', 'Sprint 2'],
  12: ['Sprint 3'],
  13: ['Sprint 3'],
  14: ['Sprint 3'],
  15: ['Sprint 3'],
  16: ['Sprint 3'],
  17: ['Sprint 3'],
  18: ['Sprint 2'],
};

// 18 hikaye tanımı — new_acceptance.md'den çıkarıldı
const stories = [
  {
    id: 1,
    title: 'Menü Kategorilerini & Ürünleri Görüntüleme',
    userStory: 'Bir Müşteri olarak, menüye kategorilere (Başlangıçlar, Ana Yemekler, Pizza, Tatlılar, İçecekler) göre göz atmak istiyorum, böylece sipariş etmek istediğim şeyi kolayca bulabilirim.',
    description: 'Müşteriler menü sayfasını açtığında tüm ürünler kategori başlıkları altında listelenir. Üst navigasyon çubuğunda "All" ve her kategori için ayrı filtre butonları bulunur. Ürünler kart (card) formatında gösterilir; her kartta ürün adı, fiyatı (₺) ve açıklaması yer alır.',
    acceptance: [
      'Menü sayfasında 5 kategori (Appetizers, Main Courses, Pizza, Desserts, Beverages) ve "All" filtresi bulunmalıdır',
      '"All" seçildiğinde tüm kategorilerdeki ürünler başlıklarıyla birlikte listelenmelidir',
      'Bir kategori seçildiğinde yalnızca o kategorideki ürünler gösterilmelidir',
      'Her ürün kartında ad, fiyat (₺) ve açıklama görünmelidir',
      'Ürün kartları duyarlı (responsive) ızgara düzeninde sıralanmalıdır',
    ],
  },
  {
    id: 2,
    title: 'Sepete Ürün Ekleme',
    userStory: 'Bir Müşteri olarak, menüden ürünleri sepetime eklemek istiyorum, böylece siparişimi oluşturabilirim.',
    description: 'Her ürün kartında "Add to Cart" butonu bulunur. Butona tıklandığında ürün sepete eklenir ve buton kısa süreliğine "✓ Added" olarak değişerek görsel geri bildirim sağlar. Pişirme seviyesi gerektiren ürünlerde (burger, steak) eklemeden önce seviye seçilmelidir.',
    acceptance: [
      'Her ürün kartında "Add to Cart" butonu bulunmalıdır',
      'Butona tıklandığında ürün sepete eklenmelidir',
      'Ekleme sonrası buton 1.5 saniye "✓ Added" göstermelidir',
      'hasCookingLevel: true olan ürünlerde pişirme seviyesi dropdown\'u gösterilmelidir',
      'Pişirme seviyeleri: Rare, Medium Rare, Medium, Medium Well, Well Done olmalıdır',
      'Seçilen pişirme seviyesi sepetteki ürünle birlikte kaydedilmelidir',
    ],
  },
  {
    id: 3,
    title: 'Sepet Özetini Görüntüleme',
    userStory: 'Bir Müşteri olarak, sepet içeriğimi ve toplam fiyatı görmek istiyorum, böylece sipariş vermeden önce seçimimi kontrol edebilirim.',
    description: 'Header\'daki "Cart (X)" butonuna tıklandığında sağdan açılan bir sepet kenar çubuğu (sidebar) görünür. Sepette eklenen ürünler, pişirme seviyeleri, birim fiyatları ve genel toplam listelenir. Her ürünün yanında "Remove" butonu bulunur.',
    acceptance: [
      'Header\'da sepetteki ürün sayısını gösteren "Cart (X)" butonu bulunmalıdır',
      'Butona tıklandığında sepet kenar çubuğu sağdan kayarak açılmalıdır',
      'Sepette her ürünün adı, pişirme seviyesi (varsa) ve fiyatı görünmelidir',
      'Genel toplam tutar doğru hesaplanmalı ve gösterilmelidir',
      'Her ürünün yanında "Remove" butonu ile ürün çıkarılabilmelidir',
      'Sepet boşken "Your cart is empty" mesajı gösterilmelidir',
      'Overlay\'e veya X butonuna tıklayarak sepet kapatılabilmelidir',
    ],
  },
  {
    id: 4,
    title: 'Masa Numarası Seçimi',
    userStory: 'Bir Müşteri olarak, sipariş vermeden önce masa numaramı seçmek istiyorum, böylece personel yemeği nereye servis edeceğini bilir.',
    description: 'Checkout butonuna tıklandığında 10 masalık bir seçim modalı açılır. Masalar numaralı kartlar olarak gösterilir. Tıklanan masa seçilerek sipariş o masaya atanır.',
    acceptance: [
      'Checkout sonrası masa seçim modalı açılmalıdır',
      '10 masa kartı numaralarıyla birlikte gösterilmelidir',
      'Masaya tıklandığında seçim yapılmalı ve sipariş akışına devam edilmelidir',
      'Modal, overlay\'e tıklanarak veya X butonuyla kapatılabilmelidir',
    ],
  },
  {
    id: 5,
    title: 'Sipariş Verme',
    userStory: 'Bir Müşteri olarak, siparişimi onaylamak ve göndermek istiyorum, böylece sipariş mutfağa iletilir.',
    description: 'Sepetteki "Checkout" butonuna tıklanıp masa seçildikten sonra sipariş tamamlanır. Sepet temizlenir ve toast mesajıyla onay bilgisi gösterilir.',
    acceptance: [
      'Sepet boşken checkout yapılmaya çalışılırsa "Your cart is empty!" uyarısı gösterilmelidir',
      'Masa seçimi sonrası sipariş başarıyla verilmelidir',
      'Sipariş verildikten sonra sepet otomatik temizlenmelidir',
      'Başarılı siparişte "Order placed for Table X!" toast mesajı gösterilmelidir',
      'Toast mesajı 3 saniye sonra otomatik kaybolmalıdır',
    ],
  },
  {
    id: 6,
    title: 'Kullanıcı Girişi',
    userStory: 'Bir Kullanıcı (Müşteri veya Yönetici) olarak, sisteme giriş yapmak istiyorum, böylece yetkili alanlara erişebilirim.',
    description: 'Kullanıcılar giriş yaparak sisteme erişir. Müşteriler menü sayfasına, yöneticiler admin paneline yönlendirilir. Yetkisiz erişim engellenir.',
    acceptance: [
      'Giriş sayfası kullanıcı adı ve şifre alanlarını içermelidir',
      'Doğru bilgilerle giriş yapılabilmelidir',
      'Müşteri girişinde menü sayfasına (/main), admin girişinde admin paneline (/admin) yönlendirilmelidir',
      'Hatalı giriş bilgilerinde hata mesajı gösterilmelidir',
      'Çıkış (Logout) butonu ile oturum sonlandırılabilmelidir',
      'Yetkisiz kullanıcılar korumalı sayfalara erişememeli, giriş sayfasına yönlendirilmelidir',
    ],
  },
  {
    id: 7,
    title: 'Aktif Siparişleri Görüntüleme (Yönetici)',
    userStory: 'Bir Yönetici olarak, tüm aktif siparişlerin listesini görmek istiyorum, böylece mevcut siparişleri takip edebilirim.',
    description: 'Admin panelinde tüm siparişler tablo formatında listelenir. Her satırda sipariş ID, masa numarası, müşteri adı, ürünler, toplam tutar, tarih/saat ve durum bilgisi bulunur. Durum filtreleme butonlarıyla siparişler filtrelenebilir.',
    acceptance: [
      'Siparişler tablo formatında listelenmeli: Order ID, Table, Customer, Items, Total, Date & Time, Status, Action',
      'Siparişler tarihe göre en yeniden en eskiye sıralanmalıdır',
      '"All", "Pending", "Preparing", "Ready", "Completed" filtre butonları çalışmalıdır',
      'Sipariş yoksa "No orders found" mesajı gösterilmelidir',
      'Durum badge\'leri duruma göre farklı renklerde gösterilmelidir',
    ],
  },
  {
    id: 8,
    title: 'Sipariş Durumunu Güncelleme',
    userStory: 'Bir Yönetici olarak, siparişlerin durumunu (Pending → Preparing → Ready → Completed) güncellemek istiyorum, böylece mutfak iş akışını yönetebilirim.',
    description: 'Her sipariş satırında durum değiştirme dropdown\'u bulunur. Yönetici bir durum seçtiğinde sipariş durumu güncellenir. Geçerli durumlar: Pending (Beklemede), Preparing (Hazırlanıyor), Ready (Hazır), Completed (Tamamlandı).',
    acceptance: [
      'Her sipariş satırında durum değiştirme dropdown\'u bulunmalıdır',
      'Dropdown\'da 4 durum seçeneği olmalıdır: Pending, Preparing, Ready, Completed',
      'Mevcut durum seçeneği disable (devre dışı) olmalıdır',
      'Durum değişikliği tabloya anında yansımalıdır',
      'Durum badge\'i güncellenen duruma göre renk değiştirmelidir',
    ],
  },
  {
    id: 9,
    title: 'Günlük İstatistikleri Görüntüleme',
    userStory: 'Bir Yönetici olarak, toplam gelir ve sipariş sayılarını gösteren istatistik kartlarını görmek istiyorum, böylece restoranın performansını izleyebilirim.',
    description: 'Admin panelinin üst kısmında 4 istatistik kartı yer alır: Toplam Sipariş, Bekleyen Siparişler, Toplam Gelir ve Bugünkü Siparişler. Kartlar mevcut sipariş verilerine göre hesaplanır.',
    acceptance: [
      '"Total Orders" kartı toplam sipariş sayısını göstermelidir',
      '"Pending Orders" kartı bekleyen sipariş sayısını göstermelidir',
      '"Total Revenue" kartı toplam geliri ₺ cinsinden göstermelidir',
      '"Today\'s Orders" kartı bugünkü sipariş sayısını göstermelidir',
      'Veriler mevcut sipariş listesinden doğru hesaplanmalıdır',
    ],
  },
  {
    id: 10,
    title: 'Veri Kalıcılığı',
    userStory: 'Bir Sistem Yöneticisi olarak, sipariş ve kullanıcı verilerinin sunucu tarafında dosyaya kaydedilmesini istiyorum, böylece sunucu yeniden başlatıldığında veriler kaybolmaz.',
    description: 'Backend sunucu, kullanıcı ve sipariş verilerini CSV dosyalarında saklar. Sunucu başlarken dosyalar yoksa otomatik oluşturulur. Docker volume mapping sayesinde container yeniden başlatılsa da veriler korunur.',
    acceptance: [
      'user.csv, admin.csv ve order.csv dosyaları sunucu tarafında oluşturulmalıdır',
      'Sunucu başlatıldığında dosyalar yoksa başlık satırlarıyla otomatik oluşturulmalıdır',
      'Varsayılan hesaplar (customer/customer123, admin/admin123) otomatik oluşturulmalıdır',
      'Siparişler order.csv\'ye kalıcı olarak kaydedilmelidir',
      'Docker volume mapping ile dosyalar container dışında tutulmalıdır',
      'Sunucu yeniden başlatıldığında veriler korunmalıdır',
    ],
  },
  {
    id: 11,
    title: 'Kalıcı Masa Seçimi',
    userStory: 'Bir Müşteri olarak, masa seçimimin oturum boyunca hatırlanmasını istiyorum, böylece her siparişte tekrar masa seçmek zorunda kalmam.',
    description: 'Seçilen masa localStorage\'da saklanır ve header\'da aktif masa badge\'i olarak gösterilir. Aynı masadan tekrar sipariş verildiğinde modal atlanır. "Leave Table" butonu veya logout ile masa bırakılır.',
    acceptance: [
      'Seçilen masa localStorage\'a kaydedilmelidir',
      'Sayfa yenilendiğinde masa seçimi korunmalıdır',
      'Header\'da aktif masa numarası badge olarak gösterilmelidir',
      'Aktif masası olan kullanıcı checkout yaptığında masa seçim modalı atlanmalıdır',
      '"Leave Table" (X) butonuyla masa bırakılabilmelidir',
      'Logout yapıldığında masa bilgisi temizlenmelidir',
    ],
  },
  {
    id: 12,
    title: 'Kullanıcı Kaydı',
    userStory: 'Bir Yeni Müşteri olarak, sisteme kayıt olmak istiyorum, böylece kendi hesabımla giriş yapabilir ve sipariş verebilirim.',
    description: 'Giriş sayfasında "Register" modu bulunur. Kullanıcı adı, şifre ve hesap tipi (Customer/Admin) seçilerek yeni hesap oluşturulur. Kayıt başarılı olunca kullanıcı giriş moduna yönlendirilir.',
    acceptance: [
      'Giriş sayfasında Login ve Register modları arasında geçiş yapılabilmelidir',
      'Kayıt formunda kullanıcı adı ve şifre alanları bulunmalıdır',
      'Hesap tipi seçimi (Customer / Admin) sağlanmalıdır',
      'Aynı kullanıcı adıyla tekrar kayıt engellenmelidir (hata mesajı gösterilmeli)',
      'Başarılı kayıt sonrası "Registration successful" mesajı gösterilmelidir',
      'Kullanıcı bilgileri user.csv\'ye kaydedilmelidir',
    ],
  },
  {
    id: 13,
    title: 'Ürün Görselleri',
    userStory: 'Bir Müşteri olarak, menüdeki ürünlerin fotoğraflarını görmek istiyorum, böylece ne sipariş ettiğimi görsel olarak anlayabilirim.',
    description: 'Her ürün kartının üst kısmında ürüne ait bir fotoğraf gösterilir. Görseller Unsplash/Pexels gibi kaynaklardan veya lokal dosyalardan yüklenir. Yükleme hatası durumunda yedek görsel gösterilir.',
    acceptance: [
      'Her ürün kartında ürün görseli bulunmalıdır',
      'Görseller lazy loading ile yüklenmelidir',
      'Görsel yüklenemezse fallback (yedek) görüntü gösterilmelidir',
      'Görseller kartın üst kısmında uygun boyutta görüntülenmelidir',
    ],
  },
  {
    id: 14,
    title: 'Sadakat Puanı Sistemi',
    userStory: 'Bir Müşteri olarak, her siparişte puan kazanmak ve biriken puanlarımı görmek istiyorum, böylece sadakatimin ödüllendirildiğini hissedebilirim.',
    description: 'Her 100₺\'lik siparişte 1 puan kazanılır. Kazanılan puanlar header\'da badge olarak gösterilir. Sipariş sonrası kazanılan puan toast mesajında görüntülenir. Puanlar sunucu tarafında user.csv\'deki Points sütununda saklanır.',
    acceptance: [
      'Her 100₺ harcama için 1 puan kazanılmalıdır (Math.floor(total / 100))',
      'Header\'da kullanıcının mevcut puan bakiyesi badge olarak gösterilmelidir',
      'Sipariş sonrası toast mesajında kazanılan puan bilgisi gösterilmelidir (+X pts)',
      'Puanlar user.csv dosyasındaki Points sütununda kalıcı olarak saklanmalıdır',
      'Kullanıcı puanı GET /api/users/:username/points endpoint\'inden çekilmelidir',
    ],
  },
  {
    id: 15,
    title: 'Puanla Ödeme',
    userStory: 'Bir Müşteri olarak, yeterli puanım varsa checkout sırasında puanlarımla ödeme yapmak istiyorum, böylece indirimli alışveriş yapabilirim.',
    description: 'Sepet kenar çubuğunda "Pay with Points" bölümü bulunur. 1 puan = 10₺ indirim olarak hesaplanır. Yeterli puan varsa toggle switch ile aktifleştirilebilir. Yeterli yoksa uyarı mesajı gösterilir.',
    acceptance: [
      'Sepette "Pay with Points" bölümü, Award ikonu ve puan bakiyesi gösterilmelidir',
      '1 puan = 10₺ indirim kuruyla hesaplama yapılmalıdır',
      'Yeterli puan varsa toggle switch gösterilmeli ve "Use X pts (-Y₺)" yazmalıdır',
      'Yeterli puan yoksa "Not enough points. You need X pts (Y more needed)" uyarısı gösterilmelidir',
      'Toggle aktifleştirildiğinde orijinal fiyat üstü çizili, indirimli toplam gösterilmelidir',
      'Checkout butonu "Checkout (X pts + Y₺)" olarak güncellenmelidir',
      'Puan harcama POST /api/users/:username/spend-points endpoint\'i üzerinden yapılmalıdır',
      'Harcanan puanlar kullanıcı bakiyesinden düşülmelidir',
    ],
  },
  {
    id: 16,
    title: 'Liderlik Tablosu',
    userStory: 'Bir Müşteri olarak, en çok puana sahip kullanıcıların sıralamasını görmek istiyorum, böylece kendi konumumu diğer müşterilerle karşılaştırabilirim.',
    description: 'Header\'daki Trophy ikonuna tıklandığında liderlik tablosu açılır/kapanır. İlk 5 kullanıcı puanlarına göre sıralanır. İlk 3 sıra altın, gümüş, bronz ikonlarıyla vurgulanır.',
    acceptance: [
      'Header\'da Trophy butonu bulunmalı ve tıklandığında liderlik tablosu açılmalıdır',
      'En yüksek puanlı 5 kullanıcı sıralanmalıdır',
      '1., 2. ve 3. sıra altın, gümüş, bronz ikonlarıyla gösterilmelidir',
      'Liderlik tablosu GET /api/leaderboard endpoint\'inden veri çekmelidir',
      'Admin panelinde tam boyutlu liderlik tablosu otomatik gösterilmelidir',
      'Her 30 saniyede otomatik yenilenmelidir',
    ],
  },
  {
    id: 17,
    title: 'Ürün Varyantları',
    userStory: 'Bir Müşteri olarak, bazı ürünlerde (örn. Coca Cola) alt seçenek belirlemek istiyorum, böylece istediğim varyantı sipariş edebilirim.',
    description: 'Varyant içeren ürünlerde (Coca Cola) sepete eklemeden önce "Type:" dropdown\'u ile seçim yapılır (Classic, Zero, Light). Seçilen varyant sepette ürün adının yanında gösterilir.',
    acceptance: [
      'hasVariant: true olan ürünlerde "Type:" dropdown\'u gösterilmelidir',
      'Coca Cola için Classic, Zero, Light varyantları sunulmalıdır',
      'Seçilen varyant sepetteki ürün bilgisiyle kaydedilmelidir',
      'Sepette varyant bilgisi ürün adının yanında parantez içinde gösterilmelidir (Classic hariç)',
    ],
  },
  {
    id: 18,
    title: 'Siparişleri CSV Olarak Dışa Aktarma',
    userStory: 'Bir Yönetici olarak, sipariş verilerini CSV dosyası olarak indirmek istiyorum, böylece verileri dış araçlarda analiz edebilirim.',
    description: 'Admin panelinde "Export CSV" butonu bulunur. Tıklandığında mevcut sipariş verileri CSV formatında tarayıcıya indirilir.',
    acceptance: [
      'Admin panelinde "Export CSV" butonu bulunmalıdır',
      'Butona tıklandığında siparişler CSV dosyası olarak indirilmelidir',
      'CSV dosyası tüm sipariş sütunlarını (ID, Customer, Table, Total, Date, Status, Items) içermelidir',
    ],
  },
];

// Jira ADF (Atlassian Document Format) builder
function buildDescription(story) {
  const content = [];

  // Kullanıcı Hikayesi
  content.push({
    type: 'heading',
    attrs: { level: 3 },
    content: [{ type: 'text', text: 'Kullanıcı Hikayesi' }],
  });
  content.push({
    type: 'paragraph',
    content: [{ type: 'text', text: story.userStory }],
  });

  // Açıklama
  content.push({
    type: 'heading',
    attrs: { level: 3 },
    content: [{ type: 'text', text: 'Açıklama' }],
  });
  content.push({
    type: 'paragraph',
    content: [{ type: 'text', text: story.description }],
  });

  // Kabul Kriterleri
  content.push({
    type: 'heading',
    attrs: { level: 3 },
    content: [{ type: 'text', text: 'Kabul Kriterleri' }],
  });

  // Bullet list for acceptance criteria
  const listItems = story.acceptance.map(criteria => ({
    type: 'listItem',
    content: [
      {
        type: 'paragraph',
        content: [{ type: 'text', text: '☐ ' + criteria }],
      },
    ],
  }));

  content.push({
    type: 'bulletList',
    content: listItems,
  });

  // Sprint bilgisi
  const sprints = storySprintMap[story.id];
  content.push({
    type: 'heading',
    attrs: { level: 3 },
    content: [{ type: 'text', text: 'Sprint Bilgisi' }],
  });
  content.push({
    type: 'paragraph',
    content: [{ type: 'text', text: sprints.join(', ') }],
  });

  return {
    version: 1,
    type: 'doc',
    content,
  };
}

async function createStory(story) {
  const labels = storySprintMap[story.id].map(s => s.replace(' ', '-'));

  const body = {
    fields: {
      project: { key: PROJECT_KEY },
      summary: `Hikaye ${story.id}: ${story.title}`,
      description: buildDescription(story),
      issuetype: { id: '10006' }, // Hikaye
      labels,
    },
  };

  const res = await fetch(`${JIRA_URL}/rest/api/3/issue`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${AUTH}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Hikaye ${story.id} oluşturulamadı: ${res.status} - ${err}`);
  }

  const data = await res.json();
  return data;
}

async function main() {
  console.log('=== Jira Story Import ===');
  console.log(`Proje: ${PROJECT_KEY}`);
  console.log(`URL: ${JIRA_URL}`);
  console.log(`Toplam hikaye: ${stories.length}\n`);

  let success = 0;
  let failed = 0;

  for (const story of stories) {
    try {
      const result = await createStory(story);
      console.log(`✅ Hikaye ${story.id}: ${story.title} → ${result.key}`);
      success++;
      // Rate limit — 200ms bekle
      await new Promise(r => setTimeout(r, 200));
    } catch (err) {
      console.error(`❌ Hikaye ${story.id}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n=== Sonuç ===`);
  console.log(`Başarılı: ${success} | Başarısız: ${failed}`);
  console.log(`Jira Board: ${JIRA_URL}/jira/software/projects/${PROJECT_KEY}/board`);
}

main();

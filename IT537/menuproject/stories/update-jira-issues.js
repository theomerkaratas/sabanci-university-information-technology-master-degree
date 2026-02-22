/**
 * Mevcut Jira issue'larını new_acceptance.md'ye göre güncelle
 * - Açıklamaları doldur (description)
 * - Alt görevler (Sub-task) oluştur
 * 
 * Kullanım: node update-jira-issues.js
 */

const fs = require('fs');
const path = require('path');

// .env
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...v] = line.split('=');
  if (key && v.length) env[key.trim()] = v.join('=').trim();
});

const JIRA_URL = env.JIRA_URL;
const AUTH = Buffer.from(`${env.JIRA_EMAIL}:${env.JIRA_API_TOKEN}`).toString('base64');
const PROJECT_KEY = env.JIRA_PROJECT_KEY;

const HEADERS = {
  Authorization: `Basic ${AUTH}`,
  'Content-Type': 'application/json',
};

// ADF paragraph helper
function p(text) {
  return { type: 'paragraph', content: [{ type: 'text', text }] };
}
function heading(text, level = 3) {
  return { type: 'heading', attrs: { level }, content: [{ type: 'text', text }] };
}
function bulletList(items) {
  return {
    type: 'bulletList',
    content: items.map(t => ({
      type: 'listItem',
      content: [p('☐ ' + t)],
    })),
  };
}
function adf(blocks) {
  return { version: 1, type: 'doc', content: blocks };
}

// ===== İssue tanımları =====

const issues = [
  {
    key: 'QR-20',
    description: adf([
      heading('Kullanıcı Hikayesi'),
      p('Bir Müşteri olarak, menüye kategorilere (Başlangıçlar, Ana Yemekler, Pizza, Tatlılar, İçecekler) göre göz atmak ve ürünleri sepetime eklemek istiyorum, böylece siparişimi kolayca oluşturabilirim.'),
      heading('Açıklama'),
      p('Müşteriler menü sayfasını açtığında tüm ürünler kategori başlıkları altında listelenir. Üst navigasyon çubuğunda "All" ve her kategori için ayrı filtre butonları bulunur. Ürünler kart (card) formatında gösterilir; her kartta ürün adı, fiyatı (₺) ve açıklaması yer alır. Her ürün kartında "Add to Cart" butonu bulunur. Butona tıklandığında ürün sepete eklenir ve buton kısa süreliğine "✓ Added" olarak değişerek görsel geri bildirim sağlar. Pişirme seviyesi gerektiren ürünlerde (burger, steak) eklemeden önce seviye seçilmelidir.'),
      heading('Kabul Kriterleri'),
      bulletList([
        'Menü sayfasında 5 kategori (Appetizers, Main Courses, Pizza, Desserts, Beverages) ve "All" filtresi bulunmalıdır',
        '"All" seçildiğinde tüm kategorilerdeki ürünler başlıklarıyla birlikte listelenmelidir',
        'Bir kategori seçildiğinde yalnızca o kategorideki ürünler gösterilmelidir',
        'Her ürün kartında ad, fiyat (₺) ve açıklama görünmelidir',
        'Ürün kartları duyarlı (responsive) ızgara düzeninde sıralanmalıdır',
        'Her ürün kartında "Add to Cart" butonu bulunmalıdır',
        'Butona tıklandığında ürün sepete eklenmelidir',
        'Ekleme sonrası buton 1.5 saniye "✓ Added" göstermelidir',
        'hasCookingLevel: true olan ürünlerde pişirme seviyesi dropdown\'u gösterilmelidir',
        'Pişirme seviyeleri: Rare, Medium Rare, Medium, Medium Well, Well Done olmalıdır',
        'Seçilen pişirme seviyesi sepetteki ürünle birlikte kaydedilmelidir',
      ]),
    ]),
    subtasks: [
      'ProductCard bileşeni oluştur (ad, fiyat, açıklama, pişirme seviyesi, sepete ekle butonu)',
      'data/products.js dosyasında 5 kategori ve ~20 ürün tanımla',
      'Menu.jsx sayfasında kategori filtreleme mantığını uygula',
      'Duyarlı (responsive) ızgara düzeni CSS\'ini uygula',
      'CartContext ile React Context API tabanlı sepet yönetimi uygula',
      'ProductCard içinde "Add to Cart" → "✓ Added" animasyonu ekle',
      'Pişirme seviyesi dropdown\'unu hasCookingLevel olan ürünlerde göster',
    ],
  },
  {
    key: 'QR-21',
    description: adf([
      heading('Kullanıcı Hikayesi'),
      p('Bir Müşteri olarak, sepet içeriğimi ve toplam fiyatı görmek istiyorum, böylece sipariş vermeden önce seçimimi kontrol edebilirim.'),
      heading('Açıklama'),
      p('Header\'daki "Cart (X)" butonuna tıklandığında sağdan açılan bir sepet kenar çubuğu (sidebar) görünür. Sepette eklenen ürünler, pişirme seviyeleri, birim fiyatları ve genel toplam listelenir. Her ürünün yanında "Remove" butonu bulunur. Sepetteki "Checkout" butonuna tıklanıp masa seçildikten sonra sipariş tamamlanır. Sepet temizlenir ve toast mesajıyla onay bilgisi gösterilir.'),
      heading('Kabul Kriterleri'),
      bulletList([
        'Header\'da sepetteki ürün sayısını gösteren "Cart (X)" butonu bulunmalıdır',
        'Butona tıklandığında sepet kenar çubuğu sağdan kayarak açılmalıdır',
        'Sepette her ürünün adı, pişirme seviyesi (varsa) ve fiyatı görünmelidir',
        'Genel toplam tutar doğru hesaplanmalı ve gösterilmelidir',
        'Her ürünün yanında "Remove" butonu ile ürün çıkarılabilmelidir',
        'Sepet boşken "Your cart is empty" mesajı gösterilmelidir',
        'Overlay\'e veya X butonuna tıklayarak sepet kapatılabilmelidir',
        'Sepet boşken checkout yapılmaya çalışılırsa "Your cart is empty!" uyarısı gösterilmelidir',
        'Sipariş verildikten sonra sepet otomatik temizlenmelidir',
        'Başarılı siparişte "Order placed for Table X!" toast mesajı gösterilmelidir',
        'Toast mesajı 3 saniye sonra otomatik kaybolmalıdır',
      ]),
    ]),
    subtasks: [
      'CartSidebar bileşeni oluştur (ürün listesi, tutar, Remove butonu)',
      'Toplam fiyat hesaplama mantığını CartContext\'e ekle',
      'Header\'da "Cart (X)" butonuyla açılma/kapanma geçişi uygula',
      'Checkout → sepet temizle + toast mesajı göster (mock)',
      'Toast bildirim bileşeni (3sn otomatik kapanma)',
    ],
  },
  {
    key: 'QR-22',
    description: adf([
      heading('Kullanıcı Hikayesi'),
      p('Bir Müşteri olarak, sipariş vermeden önce masa numaramı seçmek ve bu seçimin oturum boyunca hatırlanmasını istiyorum, böylece personel yemeği nereye servis edeceğini bilir ve her siparişte tekrar masa seçmek zorunda kalmam.'),
      heading('Açıklama'),
      p('Checkout butonuna tıklandığında 10 masalık bir seçim modalı açılır. Masalar numaralı kartlar olarak gösterilir. Tıklanan masa seçilerek sipariş o masaya atanır. Seçilen masa localStorage\'da saklanır ve header\'da aktif masa badge\'i olarak gösterilir. Aynı masadan tekrar sipariş verildiğinde modal atlanır. "Leave Table" butonu veya logout ile masa bırakılır.'),
      heading('Kabul Kriterleri'),
      bulletList([
        'Checkout sonrası masa seçim modalı açılmalıdır',
        '10 masa kartı numaralarıyla birlikte gösterilmelidir',
        'Masaya tıklandığında seçim yapılmalı ve sipariş akışına devam edilmelidir',
        'Modal, overlay\'e tıklanarak veya X butonuyla kapatılabilmelidir',
        'Seçilen masa localStorage\'a kaydedilmelidir',
        'Sayfa yenilendiğinde masa seçimi korunmalıdır',
        'Header\'da aktif masa numarası badge olarak gösterilmelidir',
        'Aktif masası olan kullanıcı checkout yaptığında masa seçim modalı atlanmalıdır',
        '"Leave Table" (X) butonuyla masa bırakılabilmelidir',
        'Logout yapıldığında masa bilgisi temizlenmelidir',
      ]),
    ]),
    subtasks: [
      'TableSelectionModal bileşeni oluştur (10 masa kartı)',
      'Masa tıklandığında seçim yapılıp modal kapansın',
      'localStorage\'da masa bilgisi saklama',
      'Header\'da aktif masa badge\'i + "Leave Table" butonu',
    ],
  },
  {
    key: 'QR-24',
    description: adf([
      heading('Kullanıcı Hikayesi'),
      p('Bir Yönetici olarak, tüm aktif siparişlerin listesini görmek, durumlarını güncellemek ve günlük istatistikleri takip etmek istiyorum, böylece restoranın operasyonunu yönetebilirim.'),
      heading('Açıklama'),
      p('Admin panelinde tüm siparişler tablo formatında listelenir. Her satırda sipariş ID, masa numarası, müşteri adı, ürünler, toplam tutar, tarih/saat ve durum bilgisi bulunur. Durum filtreleme butonlarıyla siparişler filtrelenebilir. Her sipariş satırında durum değiştirme dropdown\'u bulunur. Admin panelinin üst kısmında 4 istatistik kartı yer alır: Toplam Sipariş, Bekleyen Siparişler, Toplam Gelir ve Bugünkü Siparişler.'),
      heading('Kabul Kriterleri'),
      bulletList([
        'Siparişler tablo formatında listelenmeli: Order ID, Table, Customer, Items, Total, Date & Time, Status, Action',
        'Siparişler tarihe göre en yeniden en eskiye sıralanmalıdır',
        '"All", "Pending", "Preparing", "Ready", "Completed" filtre butonları çalışmalıdır',
        'Sipariş yoksa "No orders found" mesajı gösterilmelidir',
        'Durum badge\'leri duruma göre farklı renklerde gösterilmelidir',
        'Her sipariş satırında durum değiştirme dropdown\'u bulunmalıdır',
        'Dropdown\'da 4 durum seçeneği olmalıdır: Pending, Preparing, Ready, Completed',
        'Mevcut durum seçeneği disable (devre dışı) olmalıdır',
        'Durum değişikliği tabloya anında yansımalıdır',
        '"Total Orders" kartı toplam sipariş sayısını göstermelidir',
        '"Pending Orders" kartı bekleyen sipariş sayısını göstermelidir',
        '"Total Revenue" kartı toplam geliri ₺ cinsinden göstermelidir',
        '"Today\'s Orders" kartı bugünkü sipariş sayısını göstermelidir',
      ]),
    ]),
    subtasks: [
      'OrdersTable bileşeni oluştur (tablo formatında)',
      'Admin.jsx içinde 2 sahte sipariş ile UI demo',
      'Durum filtre butonları (All, Pending, Preparing, Ready, Completed)',
      'Durum değiştirme dropdown\'u (mock)',
      'StatsDashboard bileşeni (4 istatistik kartı)',
      'Sahte verilerle istatistik hesaplama',
    ],
  },
  {
    key: 'QR-28',
    description: adf([
      heading('Açıklama'),
      p('Sprint 1 için gerekli tüm altyapı ve kurulum görevleri. Vite + React projesi oluşturma, bağımlılık yönetimi, tema/stil tanımlama, routing yapılandırması ve Docker container kurulumu.'),
      heading('Kabul Kriterleri'),
      bulletList([
        'Vite + React projesi oluşturulmuş ve çalışır durumda olmalıdır',
        'react-router-dom ve lucide-react bağımlılıkları yüklenmiş olmalıdır',
        'CSS değişkenleri ile cozy renk paleti uygulanmış olmalıdır (--primary-color: #4A6B4A)',
        'React Router ile /main (Menu) ve /admin (Admin) rotaları tanımlanmış olmalıdır',
        'Docker: Tek container (Vite build → Nginx, port 5171) çalışır olmalıdır',
        'docker-compose up --build komutuyla proje başarıyla ayağa kalkmalıdır',
      ]),
    ]),
    subtasks: [
      'Vite + React projesi oluştur',
      'Bağımlılıklar: react-router-dom, lucide-react kurulumu',
      'CSS değişkenleri ile tema (cozy renk paleti) tanımla',
      'React Router: /main (Menu), /admin (Admin) rotalarını yapılandır',
      'Docker: Tek container (Vite build → Nginx, port 5171) Dockerfile oluştur',
      'docker-compose.yml yapılandırması',
    ],
  },
];

// Jira API: Description güncelle
async function updateDescription(issueKey, description) {
  const res = await fetch(`${JIRA_URL}/rest/api/3/issue/${issueKey}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify({ fields: { description } }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`${issueKey} description güncelenemedi: ${res.status} - ${err}`);
  }
}

// Jira API: Alt görev oluştur
async function createSubtask(parentKey, summary) {
  const body = {
    fields: {
      project: { key: PROJECT_KEY },
      parent: { key: parentKey },
      summary,
      issuetype: { id: '10110' }, // Alt görev
    },
  };
  const res = await fetch(`${JIRA_URL}/rest/api/3/issue`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Alt görev oluşturulamadı (${parentKey}): ${res.status} - ${err}`);
  }
  return await res.json();
}

async function main() {
  console.log('=== Jira Issue Güncelleme ===\n');

  for (const issue of issues) {
    console.log(`📌 ${issue.key} güncelleniyor...`);

    // 1. Description güncelle
    try {
      await updateDescription(issue.key, issue.description);
      console.log(`  ✅ Açıklama güncellendi`);
    } catch (err) {
      console.error(`  ❌ Açıklama: ${err.message}`);
      continue;
    }

    // 2. Alt görevler oluştur
    for (const task of issue.subtasks) {
      try {
        const result = await createSubtask(issue.key, task);
        console.log(`  ✅ Alt görev: ${result.key} — ${task}`);
        await new Promise(r => setTimeout(r, 150));
      } catch (err) {
        console.error(`  ❌ Alt görev: ${err.message}`);
      }
    }
    console.log('');
  }

  console.log('=== Tamamlandı ===');
}

main();

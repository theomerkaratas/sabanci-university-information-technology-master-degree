# IT 511: Veri İletişimi ve TCP/IP Ağları — Ders Notları

Bu sayfa, ders notlarının Türkçe anlatımını katmanlara göre düzenler. Protokol adları ve standart alan adları, kaynaklarla eşleşmesi için özgün biçimleriyle korunmuştur.

## Uygulama katmanı

Uygulama katmanı, ağ uygulamalarının ve uygulama protokollerinin çalıştığı en üst katmandır. Protokoller; mesaj türlerini, biçimini, alanların anlamını ve mesajların hangi koşullarda gönderileceğini belirler. Uygulama geliştiricileri yönlendiricilerde değil, ağ uçlarında çalışan programları yazar.

### İstemci-sunucu ve eşler arası mimari

- **İstemci-sunucu:** Sürekli açık, sabit adresli sunucu hizmet sağlar; istemciler isteği başlatır ve zaman zaman bağlanabilir. Yönetim merkezileşir, ancak sunucu yük altında darboğaz olabilir. HTTP, IMAP ve FTP örnektir.
- **Eşler arası (P2P):** Ayrılmış, sürekli açık sunucu yerine eşler doğrudan haberleşir; her eş hem istemci hem sunucu olabilir. Ölçeklenebilirlik sağlar, fakat eşlerin ağa girip çıkması (churn) ve IP adreslerinin değişmesi yönetimi zorlaştırır.

### Soketler, süreçler ve protokoller

Soket, uygulama süreciyle taşıma katmanı arasındaki arayüzdür. Bir süreç yalnızca IP adresiyle belirlenemez; aynı bilgisayarda birçok uygulama çalışır. Sürece ulaşmak için **IP adresi ve port numarası** birlikte kullanılır (ör. HTTP 80, SMTP 25).

Uygulama protokolü mesaj türlerini, sözdizimini, anlamını ve iletişim kurallarını tanımlar. Uygulamaların taşıma hizmetinden beklentileri güvenilirlik, gecikme, aktarım hızı ve güvenlik açısından farklıdır. Dosya aktarımı kayıpsızlığı; çevrimiçi ses ve oyunlar düşük gecikmeyi önceler.

### TCP, UDP ve TLS

- **TCP:** Güvenilir ve sıralı bayt akışı sağlar; akış denetimiyle alıcının, tıkanıklık denetimiyle ağın aşırı yüklenmesini önlemeye çalışır. Bağlantı kurulumu gerekir. Zamanlama veya en düşük aktarım hızı garantisi vermez.
- **UDP:** Bağlantı kurmadan datagram iletir; teslim, sıralama veya yinelenmeme garantisi vermez. Kurulum gecikmesinin önemli olduğu ve bir miktar kaybın tolere edildiği uygulamalarda kullanılabilir.
- **TLS:** TCP üzerinden şifreleme, veri bütünlüğü ve uç kimlik doğrulaması sağlar. Geleneksel TCP/UDP soketleri veriyi kendiliğinden şifrelemez.

## Web, HTTP ve önbellekler

Bir web sayfası çoğunlukla temel HTML belgesi ile resim, betik ve diğer nesnelerden oluşur. Nesne URL ile bulunur. HTTP, istemci (tarayıcı) ile sunucu arasındaki istek-yanıt protokolüdür ve geleneksel olarak TCP üzerinden çalışır.

HTTP **durumsuzdur**: Sunucu her isteği bağımsız işler. Oturum ve alışveriş sepeti gibi özellikler için çerezler gibi ek mekanizmalar kullanılır. Sunucu `Set-Cookie`, istemci sonraki isteklerde `Cookie` başlıklarını iletir. Kalıcı üçüncü taraf çerezleri siteler arası izlemeye yol açabileceğinden mahremiyet açısından önemlidir.

- **Kalıcı olmayan HTTP:** Her nesne için ayrı TCP bağlantısı kurulur. Nesne başına yaklaşık bir RTT bağlantı kurulumu ve bir RTT istek/yanıt başlangıcı gerekir; buna veri aktarım süresi eklenir.
- **Kalıcı HTTP:** Aynı TCP bağlantısından birden çok nesne istenir; bağlantı kurma yükünü ve gecikmeyi azaltır.
- **HTTP istekleri:** İstek satırı yöntem, URL ve sürümü; başlıklar ek bilgileri içerir. GET alır, POST veri gönderir, HEAD yalnızca başlık ister, PUT nesne yükler.
- **Yanıt kodları:** `200 OK`, `301 Moved Permanently`, `400 Bad Request`, `404 Not Found` ve `505 HTTP Version Not Supported` yaygın örneklerdir.

**Web önbelleği**, istenen nesnenin yerel kopyasını kullanarak erişim bağlantısındaki trafiği ve yanıt süresini azaltır. Koşullu GET isteğindeki `If-Modified-Since` başlığıyla tarayıcı nesnenin değişip değişmediğini sorabilir. Değişmemişse sunucu `304 Not Modified` döndürür; değişmişse `200 OK` ile yeni içeriği gönderir.

### HTTP/2, HTTP/3 ve QUIC

HTTP/2, nesneleri küçük çerçevelere bölüp tek bağlantıda iç içe gönderebilir (multiplexing). Böylece büyük bir nesnenin arkasında küçük nesnelerin beklemesi azaltılır. Ancak bütün akışlar TCP bağlantısını paylaştığı için kayıp bir TCP paketi tüm akışları durdurabilir.

HTTP/3, UDP üzerinde çalışan **QUIC** kullanır. QUIC güvenilir aktarım, tıkanıklık denetimi ve TLS 1.3 güvenliğini kendi protokolünde birleştirir. Akışlar arası kayıp etkisini sınırlar ve bağlantı kurulumunu hızlandırır: olağan durumda 1-RTT, uygun önceki bağlantılarda 0-RTT veri gönderimi mümkündür.

## E-posta ve DNS

E-posta sisteminde kullanıcı aracısı mesajı hazırlar, posta sunucuları gelen kutularını ve gönderim kuyruklarını yönetir, SMTP sunucular arasında ileti aktarır. SMTP, TCP'nin 25 numaralı portunda çalışan bir **push** protokolüdür. Bağlantı el sıkışması, mesaj aktarımı ve bağlantıyı kapatma aşamalarından oluşur. IMAP mesajları sunucuda tutup eşitler; POP3 mesajları çoğunlukla cihaza indirir. HTTP istemcinin veri çekmesine (pull), SMTP gönderen sunucunun iletiyi itmesine (push) dayanır.

**DNS**, alan adlarını IP adreslerine çeviren dağıtık, hiyerarşik veritabanı ve uygulama katmanı protokolüdür. Takma ad eşleme, posta sunucusu bulma ve yük dağıtımı da sağlar. Hiyerarşide kök sunucular, üst düzey alan adı (TLD) sunucuları ve alan için yetkili sunucular bulunur. Sorgu yinelemeli (iterative) veya özyinelemeli (recursive) biçimde yürütülebilir. Önbellekleme yanıtı hızlandırır ve sorgu yükünü azaltır. DNS kayıtları kaynak adı, tür ve değere göre bilgi taşır; DNS güvenliği sahte yanıt ve yönlendirme saldırılarına karşı önemlidir.

## Soket programlama

UDP soket programlamasında uygulama her datagram için hedef adresi belirtir; datagramlar farklı yollar izleyebilir, kaybolabilir veya sıraları değişebilir. TCP soketleri bağlantı kurar ve bayt akışı sağlar; uygulama mesaj sınırlarını kendisi tanımlamalıdır. İstemci-sunucu örneklerinde sunucu belirli bir portta dinler, istemci sunucunun adresine bağlanır veya datagram gönderir.

## Taşıma katmanı

Taşıma katmanı, farklı ana bilgisayarlardaki uygulama süreçleri arasında mantıksal iletişim sağlar. Ağ katmanı ana bilgisayarlar arası iletişimi taşırken taşıma katmanı süreçleri port numaralarıyla ayırt eder. Göndericide uygulama verisi segmentlere ayrılır; alıcıda segmentler doğrulanıp doğru sokete yönlendirilir.

### Çoklama ve ayrıştırma

Göndericide **çoklama**, farklı soketlerden gelen verileri taşıma segmentlerine ekleyip ağa gönderir. Alıcıda **ayrıştırma**, IP ve port bilgilerine göre segmenti doğru sokete teslim eder. UDP çoğunlukla hedef IP ve hedef portla; TCP ise kaynak/hedef IP ve kaynak/hedef port dörtlüsüyle bağlantıyı ayırt eder.

### UDP

UDP düşük gecikmeli, bağlantısız ve en az ek yüke sahip taşıma protokolüdür. Güvenilirlik, sıralama, akış denetimi veya tıkanıklık denetimi sağlamaz. DNS, gerçek zamanlı ses/video ve bazı oyunlar UDP'yi kullanabilir.

UDP segment başlığı kaynak portu, hedef portu, uzunluğu ve sağlama toplamını içerir. İnternet sağlama toplamı 16 bitlik sözcüklerin 1'ler tümleyeni toplamını kullanarak aktarım bozulmalarını saptamaya yardımcı olur; her hata örüntüsünü yakalayacağı garanti edilmez.

## Güvenilir veri aktarımı

Güvenilir veri aktarımı; bozulma, kayıp ve yeniden sıralama bulunan kanalda sıra numaraları, onaylar (ACK/NAK), zaman aşımı ve yeniden iletim kullanır. Protokolün karmaşıklığı kanalın hata özelliklerine bağlıdır. Gönderici ve alıcı, durum makineleriyle hangi paketleri kabul edip göndereceklerini belirler.

- **rdt1.0:** Güvenilir kanal varsayar; hata denetimi gerekmez.
- **rdt2.0:** Bit hatalarını sağlama toplamı, ACK ve NAK ile ele alır; bozuk ACK/NAK sorununu tek başına çözemez.
- **rdt2.1:** Paketlere sıra numarası ekler; bozuk onaylar ve yinelenen paketler ele alınır.
- **rdt2.2:** NAK kullanmadan, yinelenen ACK ile hata durumunu bildirir.
- **rdt3.0:** Kayıp olasılığına zaman aşımı ve yeniden iletimle karşılık verir. Stop-and-wait yapısı doğruluk sağlasa da uzun gecikmeli bağlantılarda hattı verimsiz kullanır.

**Boru hattı (pipelining)** birden fazla onaysız paketin aynı anda ağda bulunmasına izin vererek aktarım verimini artırır.

### Go-Back-N ve Selective Repeat

- **Go-Back-N (GBN):** Gönderici pencere içindeki birden çok paketi yollar. Alıcı yalnızca sıradaki paketi kabul eder ve kümülatif ACK gönderir. Paket kaybında zaman aşımı sonrası kayıp paketten başlayarak sonrakiler de tekrar yollanabilir.
- **Selective Repeat (SR):** Alıcı sırası dışındaki doğru paketleri tamponlayıp her paketi ayrı onaylar. Gönderici yalnızca kayıp veya zaman aşımına uğramış paketleri tekrar yollar. Sıra numarası alanı pencereye göre yeterince büyük seçilmelidir; aksi halde numara sarımı eski ve yeni paketlerin karışmasına neden olabilir.

## TCP

TCP, bağlantı yönelimli, güvenilir ve sıralı bir bayt akışı sağlar. Segment başlığı portları, sıra ve ACK numaralarını, pencereyi, bayrakları ve sağlama toplamını içerir. TCP sıra numarası segment numarasını değil, veri akışındaki baytları sayar. ACK numarası alıcının beklediği sonraki baytı belirtir.

TCP RTT ölçümlerinden yeniden iletim zaman aşımı (RTO) hesaplar. Kayıp, zaman aşımında veya yinelenen ACK'lerde fark edilebilir; hızlı yeniden iletim, yeterli yinelenen ACK alındığında zaman aşımını beklemeden segmenti yollar. Alıcı penceresi ve TCP akış denetimi, göndericinin alıcının tampon kapasitesini aşmasını önler.

### Bağlantı yönetimi ve tıkanıklık denetimi

TCP bağlantı kurulumundaki **üç yönlü el sıkışma** SYN, SYN-ACK ve ACK mesajlarıyla iki tarafın başlangıç sıra numaralarını eşleştirir. İki yönlü el sıkışma, eski veya gecikmiş yinelenen bağlantı istekleri karşısında belirsizlik yaratabilir. Bağlantı kapatılırken her yön ayrı FIN/ACK alışverişiyle sonlandırılabilir.

Tıkanıklık, ağ kaynaklarına talep kapasiteyi aştığında kuyrukları, kayıpları ve gecikmeyi artırır. TCP tıkanıklık penceresini **AIMD** ile ayarlar: tıkanıklık yokken toplamsal artırır, tıkanıklık belirtisinde çarpımsal azaltır. **Slow Start** penceresini hızlı büyütür; eşik sonrasında congestion avoidance daha yavaş artış uygular. Tahoe ve Reno kayıp tepkileriyle, CUBIC ise modern yüksek hızlı bağlantılarda pencere büyümesiyle öne çıkar.

## Ağ katmanı

Ağ katmanı datagramları kaynak ana bilgisayardan hedefe iletir. İki temel işlevi **iletme (forwarding)** —paketi giriş portundan uygun çıkış portuna taşımak— ve **yönlendirme (routing)** —kaynak/hedef arasında yol hesaplamak— olarak ayrılır.

- **Veri düzlemi:** Yönlendirici başına, paketleri yerel iletme tablosuna göre işler.
- **Kontrol düzlemi:** İletme tablolarının ve ağ yollarının nasıl belirleneceğini yönetir. Geleneksel yaklaşım her yönlendiricide dağıtık denetim kullanır; SDN'de yazılımla yönetilen denetim mantığı merkezi veya mantıksal olarak merkezidir.

Yönlendirici; giriş portlarında fiziksel bağlantı, bağlantı katmanı ve iletme tablosu araması yapar; anahtarlama yapısı paketi çıkış portuna taşır; çıkış kuyruğu paketleri bağlantıya iletir. Hedef tabanlı iletmede **en uzun önek eşleştirme (LPM)** kullanılır: hedef IP ile eşleşen en uzun ağ önekinin arabirimi seçilir.

### IP adresleme ve alt ağlar

IPv4 adresi 32 bittir ve bir arabirimi tanımlar. Alt ağ, yönlendirici geçmeden doğrudan iletişim kurabilen arabirim grubudur. CIDR gösterimi `/x`, ilk x bitin ağ öneki olduğunu belirtir (ör. `192.168.1.0/24`). Alt ağ maskesi ağ ve ana bilgisayar bitlerini ayırır.

**DHCP**, ana bilgisayara IP adresi, ağ maskesi, varsayılan ağ geçidi ve DNS sunucusu gibi ayarları dinamik verir (Discover, Offer, Request, ACK). Kurumlar adres bloğunu İnternet servis sağlayıcısından alır; sağlayıcılar da daha büyük adres bloklarını üst düzey tahsislerden edinir.

IPv4 datagramı sürüm, başlık uzunluğu, toplam uzunluk, TTL, üst katman protokolü, başlık sağlama toplamı, kaynak/hedef IP ve isteğe bağlı alanları taşır. IPv6 daha büyük adres alanı ve sadeleştirilmiş sabit başlık sunar.

## Yönlendirme temelleri

Yönlendirme, ağ grafiğinde bağlantı maliyetlerini kullanarak yolları hesaplar. Maliyet gecikme, kapasite veya idari tercihi yansıtabilir. Algoritmalar **merkezi (global bilgi)** ya da **dağıtık (komşulardan öğrenme)**; **statik** ya da **dinamik** olabilir. Dijkstra algoritması bilinen topolojide kaynak düğümden en düşük maliyetli yolları adım adım bulur. Mesafe vektörü yaklaşımı düğümlerin komşularıyla maliyet tahminlerini paylaşmasına dayanır.

## Laboratuvar ve alıştırmalar

Kavramları uygulamak için [IT511 laboratuvar kodlarını](https://github.com/theomerkaratas/sabanci-university-information-technology-master-degree/tree/main/IT511/Lab) ve [Türkçe soru-cevap sayfasını](../QuestionsAndAnswers/README.tr.md) kullanabilirsiniz. İngilizce notlarda yer alan ayrıntılı slayt açıklamaları ve tüm görsel örnekler [özgün ders notlarında](README.md) bulunur.

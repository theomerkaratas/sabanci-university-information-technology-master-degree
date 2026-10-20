# 2.1 Kişisel ve Kurumsal Siber Hijyen

Siber hijyen, hesapları, cihazları, ağları ve verileri düzenli olarak korumak için uygulanan alışkanlık ve kontroller bütünüdür. Kişisel ve iş yaşamı aynı cihaz, hesap veya ağ üzerinde birleşebildiğinden bir taraftaki zayıflık diğerini de etkileyebilir.

## Modül 1: Bilgi güvenliği

### 1.1 İç içe geçmiş dijital yaşam

Kişisel ve profesyonel hesaplar, cihazlar, bulut hizmetleri ve iletişim uygulamaları çoğu zaman birbiriyle bağlantılıdır. Bir hesabın ele geçirilmesi diğer hizmetler için parola sıfırlama veya kimlik doğrulama yolu sağlayabilir. İş verisini kişisel uygulamalara taşımamak, hesapları ayırmak ve kurumsal politikaları izlemek gerekir.

### 1.2 Temel kavram ve tanımlar

- **Varlık:** Korunması gereken veri, hizmet, sistem veya itibar.
- **Tehdit:** Bir varlığa zarar verebilecek olası olay veya aktör.
- **Güvenlik açığı:** Tehdidin yararlanabileceği zayıflık.
- **Risk:** Tehdidin bir açıktan yararlanıp zarar verme olasılığı ve etkisi.
- **Saldırı yüzeyi:** Sisteme erişim veya onu etkileme yollarının bütünü.
- **Kontrol:** Riski önleme, saptama veya etkisini azaltma önlemi.

Güvenlik yalnızca teknolojik ürün kurmak değildir; süreçleri, insan davranışını ve kurumun risk iştahını da kapsar.

### 1.3 Siber güvenliğin önemi

Hizmetler dijital altyapıya bağımlıdır; saldırılar veri sızıntısı, finansal kayıp, iş kesintisi, kimlik hırsızlığı, operasyonel hasar ve güven kaybı doğurabilir. Bireyler oltalama ve hesap ele geçirme gibi risklerle, kurumlar ise tedarik zinciri, fidye yazılımı ve veri ihlali gibi daha geniş ölçekli risklerle karşılaşır.

### 1.4 CIA üçlüsü

- **Gizlilik:** Bilgiyi yalnızca erişmeye yetkili kişilere aç.
- **Bütünlük:** Bilginin izinsiz veya fark edilmeden değiştirilmesini engelle.
- **Kullanılabilirlik:** Yetkili kullanıcı ve hizmetlerin ihtiyaç duyduğunda sisteme erişebilmesini sağla.

Bu hedefler yedekleme, erişim denetimi, şifreleme, izleme, kurtarma planı ve fiziksel güvenlik gibi tamamlayıcı önlemlerle desteklenir.

### 1.5 Saldırı vektörleri

Saldırı vektörü, saldırganın ilk erişim veya etki elde etmek için kullandığı yoldur. Oltalama e-postaları ve mesajları, çalıntı veya zayıf parolalar, yamalanmamış yazılımlar, yanlış yapılandırılmış bulut hizmetleri, kötü amaçlı web içeriği, taşınabilir medya, açık kablosuz ağ ve güvenilmeyen tedarik zinciri yaygın örneklerdir. Birden çok vektör aynı saldırı zincirinde kullanılabilir.

### 1.6 Virüsler ve diğer zararlı yazılımlar

- **Virüs:** Başka bir dosya veya programa eklenerek çoğalır.
- **Solucan:** Ağ üzerinden bağımsız yayılabilir.
- **Truva atı:** Yararlı yazılım gibi görünerek zararlı iş yapar.
- **Fidye yazılımı:** Dosyaları şifreler veya veriyi sızdırıp ödeme talep eder.
- **Casus yazılım/tuş kaydedici:** Kullanıcı etkinliğini ve kimlik bilgilerini toplar.
- **Bot/kök kullanıcı takımı:** Sistemin uzaktan yönetilmesini veya gizli ayrıcalıklı erişimi sağlar.

Güncel uç nokta koruması, uygulama kaynaklarının doğrulanması, yedekler, en az ayrıcalık ve kullanıcı farkındalığı zararlı yazılım riskini azaltır. Şüpheli ek ve bağlantılar açılmamalı, beklenmeyen makrolar etkinleştirilmemelidir.

### 1.7–1.8 Siber suç ve saldırı tekniklerinin gelişimi

Siber suç tekil meraklı saldırganlardan organize suç gruplarına ve devlet destekli aktörlere kadar çeşitlenir. Kimlik bilgisi hırsızlığı, hizmet engelleme, fidye yazılımı, tedarik zinciri saldırısı ve hedefli oltalama yaygındır. Saldırılar otomasyon, bulut altyapısı, ele geçirilmiş hesaplar ve halka açık güvenlik açıklarını kullanarak daha hızlı ölçeklenebilir. Savunma da sürekli güncelleme, tehdit istihbaratı ve olay müdahalesiyle evrilmelidir.

## Modül 2: Web'de gezinme ve bağlantılı cihazlar

### 2.1 Web'de gezinme riskleri

Sahte siteler, kötü amaçlı reklamlar, indirmeler, zararlı tarayıcı eklentileri, kimlik avı ve yönlendirmeler kullanıcıyı tehlikeye atabilir. Alan adını ve bağlantı hedefini kontrol edin; beklenmeyen dosyaları indirmeyin; işletim sistemi, tarayıcı ve eklentileri güncel tutun. HTTPS bağlantısı sitenin meşru veya güvenilir olduğunu tek başına kanıtlamaz.

### 2.2 TLS/SSL ve şifreli iletişim

TLS, istemci ile sunucu arasındaki trafiği şifreleyerek dinlemeye ve aktarım sırasında değiştirmeye karşı koruma sağlar; sertifikalarla sunucu kimliğinin doğrulanmasına da katkı verir. SSL'nin eski sürümleri güvensizdir; güncel TLS kullanılmalıdır. Şifreleme, uç cihazdaki kötü amaçlı yazılıma veya kullanıcının sahte siteye kendi bilgilerini vermesine karşı tek başına koruma sağlamaz.

### 2.3 Dijital sertifikalar

Sertifika, bir açık anahtarı alan adı veya kurum kimliğiyle ilişkilendirir ve sertifika yetkilisi tarafından imzalanır. Tarayıcı sertifika zincirini, alan adı eşleşmesini, geçerlilik süresini ve iptal bilgisini denetler. Sertifika uyarıları göz ardı edilmemeli; kullanıcı adı/parola veya ödeme bilgisi istenen sayfalarda alan adı dikkatle doğrulanmalıdır.

### 2.4 VPN'ler

VPN, cihaz ile VPN uç noktası arasında şifreli tünel kurar; özellikle güvenilmeyen ağlarda yerel ağ dinlemesi riskini azaltabilir. VPN, kullanıcıyı anonim yapmaz, kötü amaçlı siteyi güvenli kılmaz ve VPN sağlayıcısına duyulan güven ihtiyacını ortadan kaldırmaz. Kurumsal VPN erişimi güçlü kimlik doğrulama ve güncel cihaz politikalarıyla korunmalıdır.

### 2.5 Wi-Fi ağlarının riskleri

Açık veya sahte erişim noktaları trafiğin izlenmesine, kimlik bilgisi toplanmasına veya kullanıcıların saldırganın kontrolündeki portala yönlendirilmesine yol açabilir. WPA2/WPA3 kullanan güvenilir erişim noktalarını tercih edin; otomatik bağlanmayı ve dosya paylaşımını kapatın; hassas işlemde HTTPS ve kurum VPN'ini kullanın. Ev yönlendiricisinin varsayılan parolası değiştirilmeli ve yazılımı güncel tutulmalıdır.

### 2.6 Parmak izi ve gezinme izleri

Tarayıcı türü, işletim sistemi, yazı tipleri, ekran özellikleri, saat dilimi ve eklentiler bir araya getirilerek cihazın dijital parmak izi çıkarılabilir. Çerezler ve izleme pikselleri gezinme etkinliğini ilişkilendirebilir. Gereksiz eklentileri kaldırmak, izlemeyi sınırlayan tarayıcı ayarları kullanmak ve uygulama izinlerini gözden geçirmek veri toplamayı azaltır; tam anonimlik garanti edilmez.

### 2.7 Mobil ekosistemin riskleri

Mobil cihazlar kaybolabilir, eski işletim sistemi kullanabilir veya güvenilmeyen uygulamalara hassas izin verebilir. Uygulamaları resmî mağazadan yükleyin, izinleri en az gerekli düzeyde tutun, ekran kilidi ve cihaz şifrelemesini etkinleştirin, güncellemeleri kurun ve kayıp cihaz için uzaktan kilitleme/silme özelliğini hazırlayın. İş verisi kurumun yönetilen profili içinde tutulmalıdır.

### 2.8 Anlık mesajlaşma güvenliği

Uçtan uca şifreleme, mesaj içeriğini aktarım sırasında koruyabilir; ancak alıcı cihaz, yedek, ekran görüntüsü veya sosyal mühendislik riskini çözmez. Kimlik doğrulama kodları paylaşılmamalı, hassas işlem için gönderenin kimliği başka kanaldan doğrulanmalı, mesajlaşma uygulamaları güncel tutulmalı ve bulut yedekleme ayarları incelenmelidir.

## Günlük siber hijyen kontrolü

Yazılımı ve cihazları güncelleyin; her hizmette benzersiz parola ve parola yöneticisi kullanın; MFA'yı açın; önemli verileri çevrimdışı veya değiştirilemez yedekleyin; gereksiz erişimleri kaldırın; şüpheli mesajları bildirin; kurumsal cihaz ve veri politikalarına uyun.

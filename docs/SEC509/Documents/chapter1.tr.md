# Bölüm 1: Yazılımın Yaygınlığı ve Modern Bağımlılık

Yazılım sağlık, ulaşım, finans, iletişim ve kamu hizmetleri dahil günlük yaşamın neredeyse bütün alanlarında kullanılır. Kurumlar yazılım ve dijital hizmetlere bağımlı hale geldikçe bir yazılım hatası yalnızca teknik arıza olmaktan çıkar; mahremiyeti, güvenliği, hizmet sürekliliğini, geliri ve fiziksel güvenliği etkileyebilir.

## Yazılım hataları ve güvenlik açıkları

**Hata (bug)** programın amaçlanandan farklı çalışmasıdır. **Güvenlik açığı**, bir saldırganın sistemin gizlilik, bütünlük veya kullanılabilirlik hedeflerini ihlal etmek için kullanabildiği kusurdur. Her hata güvenlik açığı değildir; ancak girdi doğrulama, kimlik doğrulama, yetkilendirme, bellek yönetimi ve yapılandırma kusurları saldırı yüzeyi oluşturabilir. Bir kusurun etkisi; maruziyete, ayrıcalık seviyesine, sistemin bağlamına ve başka açıklarla birleştirilmesine bağlıdır.

Güvensiz yazılımın kök nedenleri arasında gereksinimlerde güvenliğin göz ardı edilmesi, tehditlerin tasarımda modellenmemesi, güvenli olmayan varsayılanlar, acele geliştirme, eski bağımlılıklar, yetersiz test ve güvenlik sorumluluğunun yalnızca son incelemeye bırakılması bulunur. Güvenlik, geliştirme sürecinin her aşamasına katılmalıdır.

Güvenlik açıklarının maliyeti; olay müdahalesi, kesinti, veri kaybı, yasal yükümlülükler, müşteri güveninin zedelenmesi, düzeltme ve itibar kaybını kapsar. Bir kusur üretime çıktıktan sonra giderilmesi çoğu zaman erken tasarım veya kod aşamasında çözmekten daha pahalıdır.

## McCumber Küpü ve CIA

McCumber Küpü, bilgi güvenliğini üç boyutta düşünmeye yardımcı olur: güvenlik hedefleri, bilginin durumları ve uygulanacak koruma önlemleri. En bilinen güvenlik hedefleri CIA üçlüsüdür:

- **Gizlilik (Confidentiality):** Bilgiye yalnızca yetkili tarafların erişmesi.
- **Bütünlük (Integrity):** Bilginin ve sistemin yetkisiz veya fark edilmemiş değişikliklere karşı korunması.
- **Kullanılabilirlik (Availability):** Yetkili kullanıcıların ihtiyaç duyduğunda hizmet ve veriye erişebilmesi.

Bilgi depolanırken, aktarılırken ve işlenirken korunmalıdır. Önlemler teknoloji (şifreleme, erişim denetimi, yedekleme), süreç (onay, olay müdahalesi) ve insan farkındalığı (eğitim, güvenli çalışma) boyutlarını kapsar. Güvenlik tek bir kontrolle sağlanmaz; kontrollerin farklı hücre ve durumlarda birlikte çalışması gerekir.

## Dayanıklılık ve işlevsel olmayan gereksinimler

**Dayanıklı yazılım**, arıza, saldırı veya beklenmeyen girdi karşısında güvenli biçimde çalışmayı sürdürür, sınırlı hasar görür ve toparlanabilir. Güvenlik işlevsel olmayan gereksinimlerin (NFR) bir parçasıdır. NFR'ler sistemin ne yaptığı kadar nasıl çalıştığını da tanımlar:

- Güvenlik ve mahremiyet
- Güvenilirlik ve kullanılabilirlik
- Performans ve ölçeklenebilirlik
- Bakım yapılabilirlik ve genişletilebilirlik
- Kullanılabilirlik ve erişilebilirlik
- Uyumluluk ve taşınabilirlik

Gereksinimler test edilebilir ve ölçülebilir olmalıdır. “Sistem güvenli olmalı” yerine, “kullanıcı ardışık beş başarısız denemeden sonra belirli süre kilitlenir” gibi doğrulanabilir kabul ölçütleri belirlenebilir. Güvenlik ile performans veya kullanılabilirlik arasında ödünleşimler oluştuğunda bunlar tasarımda açıkça değerlendirilmelidir.

## Güvenli yazılım geliştirme yaşam döngüsü (S-SDLC)

Güvenlik geliştirme sürecine son aşamada eklenen bir kontrol listesi değildir. Gereksinimlerden dağıtım ve bakıma kadar her aşamada ele alınır:

1. **Gereksinimler:** Korunacak varlıkları, güvenlik hedeflerini, yasal/kurumsal gereksinimleri ve kötüye kullanım senaryolarını belirle.
2. **Tasarım:** Tehdit modeli oluştur; güven sınırlarını, veri akışlarını ve güvenlik kontrollerini gözden geçir.
3. **Geliştirme:** Güvenli kodlama kurallarını, kod incelemesini, bağımlılık taramasını ve gizli bilgi yönetimini uygula.
4. **Test:** Güvenlik testlerini, kod analizini, yapılandırma kontrollerini ve istismar denemelerini çalıştır.
5. **Dağıtım:** Güvenli yapılandırma, en az ayrıcalık, sırların korunması, izleme ve geri alma planı kullan.
6. **İşletim ve bakım:** Güncellemeleri uygula, olayları izle, güvenlik açıklarını düzelt ve tehdit modelini güncel tut.

## Tehdit modelleme

Tehdit modelleme, saldırganın sistemi nasıl kötüye kullanabileceğini ürün tasarımına erken aşamada bakarak sistematik biçimde düşünür. Amacı yalnızca tehdit listesi çıkarmak değil; riskleri önceliklendirmek ve uygun azaltma yöntemlerini tasarıma yerleştirmektir.

### Yaklaşımlar

- **Varlık/risk odaklı:** Korunacak varlıkları, değerlerini ve olası zararları belirleyerek başlar.
- **Saldırgan odaklı:** Saldırganların amaçlarını, yeteneklerini, kaynaklarını ve olası hareketlerini inceler.
- **Uygulama odaklı:** Mimariyi, bileşenleri, veri akışlarını, giriş noktalarını ve güven sınırlarını inceler.

Yaklaşımlar birbirini dışlamaz. Tehdit modellemesi için mimari ve veri akışı belgeleri, geliştiriciler, güvenlik uzmanları, iş sahipleri, varlık envanteri ve dağıtım yapılandırmaları gerekebilir.

### İşlevsel ayrıştırma ve DFD

Veri Akış Diyagramı (DFD) sistemin bileşenlerini ve aralarındaki bilgi akışını gösterir. Temel öğeler:

- **Dış varlık:** Sistem dışındaki kullanıcı veya başka bir sistem.
- **Süreç:** Veriyi işleyen uygulama veya hizmet.
- **Veri deposu:** Verinin saklandığı veritabanı, dosya veya kuyruk.
- **Veri akışı:** Bileşenler arasındaki iletişim.
- **Güven sınırı:** Güven düzeyinin veya denetimin değiştiği yer.

DFD, gerçek mimariyi temsil etmeli; ağ, kimlik ve veri sınırlarını görünür kılmalıdır. Aşırı ayrıntılı tek diyagram yerine genel bağlam ve kritik alt akışlar için ayrı diyagramlar oluşturulabilir.

### STRIDE tehditleri

STRIDE, tehditleri altı başlıkta sınıflandırır:

| Tehdit | İhlal edilen özellik | Örnek |
| --- | --- | --- |
| **Spoofing (Kimliğe bürünme)** | Kimlik doğrulama | Saldırgan başka kullanıcının kimliğiyle giriş yapar. |
| **Tampering (Kurcalama)** | Bütünlük | İstek, dosya veya kayıt yetkisiz değiştirilir. |
| **Repudiation (İnkâr)** | İzlenebilirlik | İşlemi yapanı kanıtlayan kayıt bulunmaz veya değiştirilebilir. |
| **Information Disclosure (Bilgi ifşası)** | Gizlilik | Hassas veri yetkisiz kişiye açılır. |
| **Denial of Service (Hizmet engelleme)** | Kullanılabilirlik | Kaynak tüketimiyle hizmet erişilemez hale getirilir. |
| **Elevation of Privilege (Yetki yükseltme)** | Yetkilendirme | Kullanıcı hak etmediği işlemleri yapabilir. |

### Saldırı zincirleri, tehdit ağaçları ve risk sıralaması

Saldırılar çoğunlukla tek adımdan oluşmaz. Keşif, ilk erişim, ayrıcalık kazanma ve veri çıkarma gibi aşamalar birbirine bağlanır. **Tehdit ağacı**, saldırganın hedefe ulaşabileceği yolları VE/VEYA ilişkileriyle gösterir; savunmacı kritik dalları kontrol altına alır.

**DREAD** yaklaşımı riski Hasar (Damage), Tekrarlanabilirlik (Reproducibility), İstismar edilebilirlik (Exploitability), Etkilenen kullanıcılar (Affected users) ve Keşfedilebilirlik (Discoverability) boyutlarında puanlayarak göreli sıralama yapar. Puanlar karar desteğidir; bağlam ve uzman değerlendirmesinin yerini almaz.

### Azaltma ve güvenlik incelemeleri

Azaltma yöntemleri tehdide uygun olmalıdır: kimlik doğrulama, yetkilendirme ve en az ayrıcalık; doğrulama ve güvenli kodlama; şifreleme; oran sınırlama ve kaynak sınırları; yedekleme ve kurtarma; değiştirilemez günlükler; sırların yönetimi. Kontrollerin tehditlerle eşleştirilmesi, sorumlu ve doğrulama yönteminin tanımlanması gerekir. Güvenlik tasarım incelemesi mimari değiştikçe tekrarlanır.

## Geliştirme, test ve dağıtımda güvenlik

Kodlama aşamasında güvenli API'ler, girdi doğrulama, çıktı kodlama, güvenli hata işleme ve bağımlılık güncelliği gözetilir. Testte statik analiz (SAST), dinamik analiz (DAST), yazılım bileşen analizi (SCA), sır taraması, yapılandırma testi ve penetrasyon testi farklı kusur sınıflarını arar.

SAST kaynak kodu veya ikili dosyayı çalıştırmadan analiz eder; DAST çalışan uygulamayı dışarıdan sınar. Biri diğerinin yerine geçmez; yalancı pozitifler incelenmeli, kritik bulgular doğrulanmalıdır. Dağıtımda güvenli varsayılanlar, en az ayrıcalık, sırların kasada tutulması, güncel imajlar ve izleme uygulanır. Üretimde olaylar analiz edilip geliştirme ekibine geri bildirim olarak aktarılır.

DevSecOps, bu etkinlikleri otomatik ve tekrar edilebilir iş akışlarına ekler; güvenlik değerlendirmesini geliştirme ve CI/CD boyunca sürdürür.

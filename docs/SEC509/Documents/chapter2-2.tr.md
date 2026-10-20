# 2.2 DevSecOps'a Giriş

## 1. Giriş

Yazılım geliştirme ekipleri hızlı ve sık teslimat yaparken bilgi güvenliği riskleri de büyür. Güvenlik yalnızca dağıtım öncesi son bir onay aşamasına bırakılırsa kusurlar geç fark edilir, düzeltme maliyeti yükselir ve güvenlik ekibi darboğaz haline gelebilir. DevSecOps, güvenliği geliştirme ve operasyon çalışmalarının içine, ortak sorumluluk olarak yerleştirir.

## 2–4. DevSecOps ve DevOps

**DevOps**, geliştirme (Development) ve operasyon (Operations) ekiplerinin iş birliğini, otomasyonu ve sürekli teslimatı destekleyen kültür ve uygulamalardır. Amaç; fikirden üretim ortamına kadar iş akışını hızlandırmak, güvenilir kılmak ve geri bildirim döngüsünü kısaltmaktır.

**DevSecOps**, güvenlik ekibini ve güvenlik kontrollerini bu ortak sürece dahil eder. Güvenlik gereksinimleri baştan ele alınır, testler mümkün olduğunca otomatikleştirilir ve ekipler riskleri birlikte sahiplenir. Güvenlik uzmanları ortadan kalkmaz; uzmanlıklarını geliştirici ve operasyon ekiplerinin günlük süreçlerine taşırlar.

| Boyut | DevOps | DevSecOps |
| --- | --- | --- |
| Odak | Hızlı, güvenilir geliştirme ve operasyon | Aynı hedeflere güvenliği sürekli dahil etme |
| Güvenlik zamanı | Ayrı denetim veya geç aşama olabilir | Gereksinimden dağıtım ve izlemeye kadar sürekli |
| Sorumluluk | Geliştirme ve operasyon ortaklığı | Geliştirme, operasyon ve güvenlik ortaklığı |
| Kontroller | Otomasyon ve CI/CD | CI/CD'ye eklenmiş güvenlik testleri, politika ve geri bildirim |

## 5–6. Büyük resim ve karşılaştırma

DevSecOps, güvenliği yalnızca bir araç veya tarama olarak görmez. İnsan, süreç ve teknoloji birlikte ele alınır: ekiplerin becerisi ve iletişimi; güvenli geliştirme süreçleri; otomatik analiz, yapılandırma ve dağıtım araçları. Kontroller riskle orantılı olmalı, iş akışına erken eklenmeli ve bulgular düzeltilebilecek kişiye hızlıca iletilmelidir.

Geleneksel “geliştir, sonra test et, en sonda güvenlik incele” süreci güvenlik açıklarını geç keşfedebilir. DevSecOps yaklaşımında gereksinim ve tasarım incelemesi, kod analizi, bağımlılık kontrolleri, test ve üretim izlemesi aynı yaşam döngüsünde geri bildirim üretir. Otomasyon tekrarlanabilir kontrolleri hızlandırır; risk kararı ve bulguların yorumlanması yine insan değerlendirmesi gerektirir.

## 7. DevSecOps ilkeleri

### 1. Otomasyon

Güvenlik kontrollerini CI/CD işlem hatlarına ekleyerek kod, bağımlılık, yapılandırma, imaj ve altyapı değişikliklerini düzenli denetleyin. Otomatik kontroller tutarlı olmalı ve başarısızlıkta anlaşılır bulgu sağlamalıdır.

### 2. İş birliği

Güvenlik uzmanları, geliştiriciler ve operasyon ekipleri tehditleri ve ödünleşimleri birlikte ele alır. Güvenlik bilgisi paylaşılıp ekiplerin erken karar verebilmesi desteklenir.

### 3. Güvenliği sola kaydırma (Shift Left)

Güvenliği gereksinim, tasarım ve kodlama aşamalarında başlatın. Tehdit modelleme, güvenli tasarım incelemesi ve kod analizi erken yapıldığında kusurları üretime çıkmadan düzeltmek kolaylaşır.

### 4. Sürekli test

Statik/dinamik analiz, bağımlılık taraması, sır taraması, altyapı yapılandırma denetimi ve otomatik güvenlik testleri uygun aşamalarda tekrarlanır. Testler yalnızca “geçti/kaldı” sonucu vermemeli; risk, sahip ve düzeltme bilgisi sunmalıdır.

### 5. Sürekli tümleştirme ve dağıtım (CI/CD)

Kod değişiklikleri sık tümleştirilir, otomatik testlerden geçirilir ve onaylı süreçlerle dağıtılır. Güvenlik kapıları, risk düzeyine göre yapılandırılır; kritik bulguların geçişi durdurması, düşük riskli bulguların ise izlenerek planlanması mümkün olabilir.

### 6. İzleme ve geri bildirim

Üretim ortamında günlükler, ölçümler, uyarılar ve tehdit göstergeleri izlenir. Olaylardan öğrenilenler gereksinim, test ve geliştirme süreçlerine geri beslenir.

## 8. DevSecOps uygulamaları

### Otomatik test ve güvenlik açığı taraması

Otomatik test, her değişiklikte aynı kontrolleri çalıştırarak hata ve güvenlik sorunlarını erken gösterir. Statik analiz kodu çalıştırmadan inceler; dinamik analiz çalışan uygulamayı sınar; yazılım bileşen analizi bağımlılıklardaki bilinen açıkları arar. Tarama sonuçları doğrulanmalı; yanlış pozitifler ayıklanmalı ve gerçek bulgular önemine göre ele alınmalıdır.

### CI/CD işlem hattında güvenlik

Kaynak kod deposunda sır taraması ve inceleme; derleme sırasında statik analiz, bağımlılık ve lisans taraması; test ortamında DAST ve entegrasyon kontrolleri; dağıtımda imza, erişim politikası ve yapılandırma doğrulaması uygulanabilir. Üretim gizli bilgileri kaynak koda konmamalı, güvenli sır deposundan sağlanmalıdır.

### Kapsayıcı güvenliği

Temel imajları güvenilir kaynaktan ve güncel seçin; gereksiz paketleri azaltın; imajları tarayıp imzalayın; kapsayıcıları root olmayan kullanıcıyla ve en az ayrıcalıkla çalıştırın. Sırları imaja gömmeyin. Orkestrasyon yapılandırmasında ağ, depolama ve servis hesabı izinlerini kısıtlayın.

### İzleme ve olay müdahalesi

Sürekli izleme; sistem, uygulama, kimlik ve ağ günlüklerini ilişkilendirerek olağandışı davranışı arar. Olay müdahalesi hazırlık, tespit, sınırlama, ortadan kaldırma, kurtarma ve olay sonrası öğrenme adımlarını kapsar. Müdahale planı ve sorumlular olay gerçekleşmeden belirlenmelidir.

## 9. DevSecOps'un yararları

Güvenlik sorunlarının erken bulunması düzeltme maliyetini düşürür; otomasyon ve ortak sahiplik güvenlik ekiplerinin darboğaz olmasını önleyebilir. Daha sık geri bildirim, daha tutarlı yapılandırma, daha hızlı ve güvenilir sürümler, görünür risk ve mevzuat gereksinimlerine izlenebilir yanıt sağlar. Bu yararlar; araçları kurmakla kendiliğinden oluşmaz, sürekli bakım, eğitim ve ekip kültürü gerektirir.

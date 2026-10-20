# Kurumsal Java Çatıları ve Tasarım Kalıpları — Ders Notları

Bu sayfa, dönem notlarındaki nesne yönelimli ilkeler ve GoF tasarım kalıplarını Türkçe olarak açıklayan kapsamlı bir rehberdir. Özgün İngilizce notlar daha fazla kod örneği, UML diyagramı ve açıklama içerir.

## Genel tasarım ilkeleri

Nesne yönelimli tasarım ilkeleri, değişen gereksinimler karşısında yazılımın anlaşılır, test edilebilir ve bakımı yapılabilir kalmasına yardımcı olur. İlke ve kalıplar kesin reçete değil, tasarım kararlarını tartışmak için kullanılan araçlardır.

### DRY, YAGNI, sorumlulukların ayrılması ve basitlik

- **DRY (Don't Repeat Yourself):** Aynı iş kuralını farklı yerlerde kopyalamayın. Bir değişiklik olduğunda birden fazla kopyanın güncellenmesi tutarsızlık oluşturur. Ancak benzer görünen kodun iş anlamı farklıysa zorla birleştirmek doğru olmayabilir.
- **YAGNI (You Aren't Gonna Need It):** Henüz gerekmeyen, varsayımsal özellikleri erkenden eklemeyin. Geleceği tahmin ederek yapılan aşırı genelleme karmaşıklık ve bakım yükü doğurur.
- **Separation of Concerns:** Farklı nedenlerle değişen sorumlulukları ayırın; örneğin hesaplama mantığını terminal arayüzü ve dosya yazımından ayrı tutun.
- **En basit çalışan çözüm:** Gereksinimi karşılayan anlaşılır tasarımla başlayın. Basitlik, okunabilirlik ve doğru soyutlama demektir; kaliteyi veya doğrulamayı atlamak değildir.
- **İzci kuralı:** Değişiklik yaptığınız kodu küçük ölçüde daha temiz bırakın; kapsam dışı büyük yeniden yazımlara girişmeyin.

## Modüller arası tasarım ilkeleri

### Bağımlılığı azaltma

Bir modülün diğerinin iç ayrıntılarını bilmesi değişikliğin yayılmasına neden olur. Açık ve küçük arayüzler, bağımlılık enjeksiyonu ve tek yönlü katman sınırları bağımlılığı azaltır. İstemcinin hangi alt sınıfın kullanılacağını veya nesnenin iç alanlarının nasıl tutulduğunu bilmesine gerek kalmamalıdır.

### Demeter Yasası

Bir nesne mümkün olduğunca doğrudan işbirliği yaptığı nesnelerle konuşmalıdır. `a.getB().getC().doThing()` gibi uzun zincirler, çağıranı iç nesne yapısına bağlar. İşlemi uygun sınıfa taşıyarak “bir nesnenin arkadaşlarıyla konuş, yabancılarıyla değil” ilkesini uygulayın. Kural aşırı uygulanırsa tarpeksiz sarmalayıcı metotlar çoğalabileceğinden tasarım bağlamı önemlidir.

### Kalıtım yerine bileşim

Kalıtım “is-a” ilişkisini ve üst sınıf sözleşmesini paylaşmayı ifade eder. Bileşim “has-a” ilişkisiyle davranışları başka nesnelerden alır. Bileşim, davranışı çalışma anında değiştirmeyi ve farklı özellikleri birleştirmeyi kolaylaştırır; kalıtım ise sınıf hiyerarşisini derinleştirip alt sınıfı üst sınıfın kararlarına bağlayabilir. Gerçek tür ilişkisi ve substitutability yoksa kalıtım seçmeyin.

### Kontrolün tersine çevrilmesi (IoC)

Geleneksel akışta üst düzey kod somut nesneleri kendisi oluşturur. IoC'de nesnelerin oluşturulması veya çağrı akışının yönetimi bir dış çatıya, fabrika ya da enjekte edilen bağımlılığa bırakılır. Bu, bileşenleri arayüz üzerinden bağlayıp testte taklit (mock) nesneler kullanmayı kolaylaştırır. IoC, bağımlılık enjeksiyonu ve çatıların “Hollywood İlkesi” ile uygulanabilir: “Bizi çağırmayın, biz sizi çağırırız.”

## SOLID ilkeleri

- **Tek Sorumluluk İlkesi (SRP):** Bir sınıfın değişmesi için tek bir ana neden olmalıdır. Örneğin hesaplama, geçmiş kaydı ve terminal biçimlendirmesi tek sınıfta toplanmamalıdır.
- **Açık/Kapalı İlkesi (OCP):** Yazılım var olan davranışı değiştirmeden yeni davranışla genişletilebilmelidir. Arayüz, strateji veya eklenti kullanın; her genişletmeyi koşul zincirine eklemeyin.
- **Liskov Yerine Geçme İlkesi (LSP):** Alt tür, üst türün sözleşmesini bozmadan onun yerine kullanılabilmelidir. Alt sınıf beklenmeyen ön koşullar eklememeli veya üst sınıfın garantilerini zayıflatmamalıdır. Daire-oval örneği, değiştirilebilirlik açısından matematiksel kalıtımın yazılım kalıtımıyla aynı olmadığını gösterir.
- **Arayüz Ayrımı İlkesi (ISP):** İstemciler kullanmadıkları metotları uygulamak zorunda bırakılmamalıdır. Büyük “şişman” arayüzleri role ve istemciye göre küçük sözleşmelere ayırın.
- **Bağımlılığın Tersine Çevrilmesi İlkesi (DIP):** Üst düzey politika somut alt düzey ayrıntılara değil, soyutlamalara bağımlı olmalıdır. Soyutlama iş ihtiyacını tanımlar; altyapı ayrıntıları bu sözleşmeyi uygular.

![SOLID ilkeleri](assets/solid.png)

## Modül düzeyinde ilkeler

**Uyum (cohesion)** bir modül içindeki öğelerin aynı amaca hizmet etmesidir; işlevsel uyum tercih edilir. **Uygulama ayrıntısını gizlemek**, kararlı bir dış arayüz sunup değişebilir iç yapıyı saklar. **Curly Yasası**, tek bir varlığın tek ve iyi tanımlı bir şeyi yapmasını önerir; bir sınıf, metot veya değişkenin adı ve sorumluluğu belirsiz olmamalıdır.

Artımlı geliştirme küçük ve test edilebilir değişikliklerle ilerler. Değişime tasarım, beklenen değişiklik noktalarını sınırlandırmayı gerektirir; her olasılığa karşı soyutlama eklemek değildir. Yeniden tasarımın yaygın nedenleri gereksinim değişikliği, düşük uyum, yüksek bağımlılık, tekrarlanan iş mantığı, yanlış soyutlama ve birikmiş teknik borçtur.

## Yaratımsal tasarım kalıpları

Yaratımsal kalıplar nesne oluşturma bilgisini istemci kodundan ayırır. Nesnenin türü, yapılandırması veya ailesi değişirken oluşturma sürecini yönetir.

### Singleton

Singleton bir sınıftan tek örnek oluşturup bu örneğe ortak erişim sağlar. Paylaşılan yapılandırma veya tek bir kaynak yöneticisi gerektiğinde yararlı olabilir; global durum, testte izolasyon zorluğu ve gizli bağımlılık yaratabilir. Eager veya lazy örnek oluşturma ve eşzamanlı erişim düşünülmelidir. Java `enum` Singleton, serileştirme ve yansıma karşısında daha güvenli bir yöntem sunar. Önce bağımlılık enjeksiyonu veya normal nesne ömrünün yeterli olup olmadığını değerlendirin.

### Builder

Builder, çok parametreli veya isteğe bağlı alanları olan karmaşık nesneleri adım adım oluşturur. Kurucuda çok sayıda belirsiz parametre vermek yerine `withDate(...)`, `withGuest(...)` gibi adlandırılmış adımlar kullanılabilir. Oluşturma sonunda geçersiz kombinasyonlar doğrulanır. Rezervasyon gibi nesneler için anlaşılır kurulum sağlar; basit nesnelerde gereksiz tören olabilir.

### Factory, Factory Method ve Abstract Factory

- **Simple Factory**, bir belirteç veya koşula göre somut ürün nesnesini merkezi bir yerde oluşturur; GoF'nin bağımsız kalıbı değildir, ancak sınıf seçimini istemciden ayırır.
- **Factory Method**, üst sınıfta ürün oluşturma arayüzü tanımlar; alt sınıflar hangi somut ürünün oluşturulacağını belirler. Ürün aileleri veya farklı dağıtımlar için uygundur.
- **Abstract Factory**, birlikte kullanılacak birbiriyle ilişkili ürün ailesini (ör. Windows düğmesi ve menüsü) oluşturur. İstemci somut sınıfları bilmez; aile tutarlılığı sağlanır.

### Prototype ve Object Pool

**Prototype**, yeni nesneyi sınıfını doğrudan çağırarak kurmak yerine var olan prototipten kopyalar. Dinamik türler veya pahalı kurulumlarda işe yarar. Sığ kopya (shallow copy) iç içe nesne referanslarını paylaşabilir; derin kopya (deep copy) alt nesneleri de çoğaltır. Hangi alanların kopyalanacağı açık olmalıdır.

**Object Pool**, tekrar kullanılabilen pahalı nesneleri havuzda tutar (ör. bağlantılar). Nesne alınır, kullanılır, temizlenip geri verilir. Eşzamanlı erişim, havuz boyutu ve kirli durumun sonraki kullanıcıya taşınmaması yönetilmelidir. Nesne oluşturma ucuzsa havuz gereksiz karmaşıklık ekler.

## Davranışsal tasarım kalıpları

Davranışsal kalıplar nesneler arası işbirliği, olay akışı ve algoritma değişimini düzenler.

### Template Method

Üst sınıf algoritmanın sabit iskeletini tanımlar; değişebilir adımlar alt sınıflarda uygulanır. Kahve ve çay hazırlama örneğinde su kaynatma ve dökme ortak, kahve/çay demleme ve katkı ekleme adımları değişkendir. Ortak akışı korur; ancak alt sınıf kalıtımına ve üst sınıfın çağrı düzenine bağlar.

### Null Object

Bir bağımlılık olmadığında sürekli `null` kontrolü yapmak yerine aynı arayüzü uygulayan etkisiz nesne kullanılır. Çağrılar güvenli biçimde boş davranışla yanıtlanır. Varsayılan uygulamadan farklı olarak “yokluk” durumunu açıkça temsil eder. Etkisiz davranışın kullanıcıyı yanıltmaması gerekir; Null Object çoğunlukla değişmez ve paylaşımlı olduğundan Singleton olarak uygulanabilir.

### Observer

Subject durum değiştiğinde kayıtlı gözlemcilere haber verir. Gazete aboneliği benzetmesinde yayıncı içerik değişince aboneleri bilgilendirir. Hava istasyonu örneğinde `WeatherData` ölçümleri yayımlar, ekran bileşenleri güncellenir. Push modelinde Subject güncel veriyi gönderir; pull modelinde Observer güncelleme bildiriminden sonra veriyi kendisi alır. Gözlemci silindiğinde kayıt kaldırılmazsa bellek sızıntısı veya istenmeyen çağrı oluşabilir. Bir gözlemcinin birden çok Subject izlemesi ve bildirimin hangi katmanda başlatılacağı tasarlanmalıdır.

### State

State kalıbı, nesnenin davranışını iç durumuna göre farklı nesnelere devreder. Gumball makinesi gibi sistemlerde tüm durumları büyük bir `if/switch` bloğuna koymak yerine `NoCoin`, `HasCoin`, `Sold` gibi durum sınıfları kullanılır. Durum geçişleri ve her durumda izin verilen işlemler açık hale gelir. Durum sayısı az ve kararlıysa basit koşullar daha okunaklı olabilir.

### Strategy

Strategy değişebilir algoritmaları ortak arayüz arkasında kapsüller. Ördek simülatöründe uçma ve vaklama davranışlarını her alt sınıfta kopyalamak yerine `FlyBehavior` ve `QuackBehavior` nesneleri bileşimle verilir. Model ördeğine roketle uçma davranışı çalışma anında atanabilir. Algoritma seçimi ve değişimi alt sınıf hiyerarşisine yüklenmez.

### Command

Command bir isteği, parametreleri ve hedef alıcıyı taşıyan nesneye dönüştürür. İstemi başlatan, komutu yürüten, isteği alan ve komutu kuran roller ayrılır. Komutlar kuyruklanabilir, günlüğe alınabilir, tekrar oynatılabilir veya geri alınabilir. Hesap makinesindeki Undo/Redo uygulaması bu kalıbın örneğidir.

### Visitor

Visitor, nesne yapısındaki sınıflara yeni işlemler eklemeyi, sınıfların kendisini değiştirmeden sağlar. Her eleman `accept(visitor)` ile uygun `visit` metodunu çağırır. Yapıdaki türler sabit, eklenecek işlemler sık değişiyorsa yararlıdır. Yeni eleman türü eklemek bütün Visitor uygulamalarını güncellemeyi gerektirebilir. Ziyaretçi sınıfları dolaşımı kendi üstlenebilir veya dolaşım sorumluluğu yapıda tutulabilir. Iterator öğeleri dolaşmayı; Visitor ise her öğe türünde farklı bir işlem uygulamayı öne çıkarır.

## Yapısal tasarım kalıpları

Yapısal kalıplar sınıf ve nesneleri daha büyük, anlaşılır yapılar haline getirir.

### Adapter ve Façade

- **Adapter**, uyumsuz arayüzü istemcinin beklediği arayüze dönüştürür. Var olan sınıfı değiştirmeden sisteme uydurur.
- **Façade**, karmaşık alt sistemin önüne daha basit bir arayüz koyar. Derleyici veya medya sistemi gibi çok bileşenli bir yapıyı tek başlangıç noktasıyla kullanmayı sağlar.

Adapter arayüz biçimini değiştirir; Façade alt sistemin karmaşıklığını basitleştirir.

### Decorator

Decorator, nesneyi aynı temel arayüzü sağlayan sarmalayıcılarla katmanlayıp çalışma anında sorumluluk ekler. Starbuzz kahve örneğinde içecek temel nesnesi süt, mocha veya şurup dekoratörleriyle sarılır; maliyet ve açıklama katmanlardan hesaplanır. Her kombinasyon için alt sınıf oluşturmaktan kaçınır, fakat nesne zincirini anlamayı ve hata ayıklamayı zorlaştırabilir.

### Proxy

Proxy gerçek nesneyle aynı arayüzü sunup erişimi denetler. Uzak erişim proxy'si ağ çağrısını; sanal proxy pahalı nesnenin geç oluşturulmasını; koruma proxy'si yetki denetimini; önbellek proxy'si sonuçların tekrar kullanımını sağlayabilir. İstemci gerçek nesneye doğrudan eriştiğini düşünebilir; proxy'nin ek gecikme ve durum davranışı göz önünde tutulmalıdır.

### Composite

Composite, tekil nesneyle nesne gruplarını aynı arayüz üzerinden kullanmayı sağlar. Dosya ve klasör hiyerarşisinde hem dosya hem klasör ortak `Component` arayüzü sağlayabilir; klasör çocuklarını dolaşarak işlem uygular. Ağaç yapılarında istemci kodunu basitleştirir, fakat bazı işlemlerin yaprakta anlamı olmayabilir; arayüz sözleşmesi dikkatle tasarlanmalıdır.

### Bridge

Bridge, soyutlama ile uygulama ayrıntısını iki ayrı hiyerarşide tutup aralarında bileşim kurar. Bir sınıf hiyerarşisinin her varyasyonla çarpılarak büyümesini önler. Örneğin farklı uzaktan kumandalar, farklı cihaz uygulamalarını kullanabilir. Her iki boyut bağımsız değişebiliyorsa uygundur.

### Flyweight

Flyweight, çok sayıda benzer nesnede ortak ve değişmez **içsel durumu (intrinsic state)** paylaşır; bağlama göre değişen **dışsal durum (extrinsic state)** çağrı sırasında sağlanır. Metin editöründe karakter glifleri paylaşılabilir, konum bilgisi dışsal kalır. Bellek tasarrufu sağlar; nesne sayısı yüksek değilse paylaşım altyapısı gereksizdir. Bridge iki değişim boyutunu ayırır, Flyweight ise ortak durumu paylaşarak bellek kullanımını azaltır.

## Kalıp seçimi

Önce değişen davranışı, sorumluluğu veya bağımlılığı tanımlayın; sonra en basit uygun çözümü seçin. Factory nesne oluşturmayı, Strategy algoritmayı, State iç duruma göre davranışı, Command isteği, Observer olay bildirimini, Decorator ek sorumluluğu yönetir. Kalıp kullanmak kendi başına kalite göstergesi değildir; gereksiz soyutlama öğrenme ve bakım maliyeti ekleyebilir.

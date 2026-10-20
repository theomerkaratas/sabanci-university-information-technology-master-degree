# Tasarım Kalıpları Gerekçelendirme Raporu

## İleri Hesap Makinesi Sistemi — IT526 Dönem Projesi

Bu rapor, terminal tabanlı hesap makinesi altyapısında kullanılan beş GoF tasarım kalıbını ve bu seçimlerin genişletilebilirlik, sorumluluk ayrımı ve kullanıcı arayüzü üzerindeki etkisini açıklar.

## 1. Seçilen kalıplar

| Kalıp | Kategori | Temel rol |
| --- | --- | --- |
| **Strategy (Strateji)** | Davranışsal | Her matematik algoritmasını değiştirilebilir ayrı bir sınıfta kapsüller. |
| **Command (Komut)** | Davranışsal | Hesaplamayı kaydedilebilir, yeniden çalıştırılabilir ve geri alınabilir bir nesne olarak temsil eder. |
| **Factory (Fabrika)** | Yaratımsal | Kullanıcı girdisinden işlem nesnesi oluşturmayı merkezileştirir. |
| **Observer (Gözlemci)** | Davranışsal | Durum değişikliğinde geçmiş kaydına ve terminal arayüzüne otomatik bildirim gönderir. |
| **Decorator (Dekoratör)** | Yapısal | İşlemleri çalışma anında girdi doğrulama gibi çapraz kesen davranışlarla sarar. |

## 2. Strategy kalıbı

### Sorun

Hesap makinesinde her işlemi `if-else` veya `switch` zincirine gömmek başlangıçta kolay görünür. Ancak her yeni matematik işlemi `CalculatorEngine` kodunu değiştirmeyi gerektirir; işlem sayısı büyüdükçe motor bakım açısından kırılgan hale gelir ve Açık/Kapalı İlkesini (OCP) ihlal eder.

### Çözüm ve roller

Her algoritma `Operation` arayüzünü uygulayan ayrı bir sınıfta tutulur. Örnek somut stratejiler `AddOperation`, `DivideOperation`, `SinOperation`, `SqrtOperation` ve `PowerOperation` sınıflarıdır. Arayüz `execute()`, `getSymbol()` ve `getOperandCount()` gibi bilgileri sağlar. `CalculatorEngine`, hangi somut işlem olduğunu bilmeden `operation.execute(operands)` çağırır.

Tekli ve ikili işlemler `getOperandCount()` ile aynı akışta ele alınır; arayüz, kaç değer isteyeceğini işlem sınıflarından öğrenir. Yeni `TangentOperation` eklemek için yeni sınıf yeterlidir; motor ve arayüz değişmez.

## 3. Command kalıbı

### Sorun

İşlem geçmişi ve Undo/Redo, kullanıcı hesaplamasının saklanabilen, yeniden oynatılabilen ve geri alınabilen bir nesne olmasını gerektirir. Motorun önceki işlemi elle tersine çevirmesi, hesaplama mantığını geri alma mantığıyla birbirine bağlar.

### Çözüm ve roller

`CalculationCommand`; çalıştırılacak `Operation` stratejisini, operandları, çalıştırma öncesi motor durumu görüntüsünü ve sonucun bulunduğu değiştirilebilir durumu bir araya getirir. `Command` arayüzü `execute`, `undo` ve açıklama alma davranışlarını tanımlar. `CalculatorEngine.executeCommand()` çağrıyı başlatan (Invoker), motor durumunu değiştiren taraf (Receiver); `TerminalUI` ise isteği hazırlayan istemcidir.

Motor iki yığın kullanır:

```text
İşlemi yürüt: Komutu undoStack'e ekle; redoStack'i temizle
Geri al:      undoStack'ten çıkar → undo() → redoStack'e ekle
Yinele:       redoStack'ten çıkar → execute() → undoStack'e ekle
```

Önceki durum komutta saklandığı için geri alma, işlemi matematiksel olarak tersine çözmeye ihtiyaç duymaz. Komut, geçmiş günlüğünün kullanabileceği biçimlendirilmiş açıklamayı da sağlayabilir.

## 4. Factory kalıbı

Kullanıcı `+` veya `sin` yazdığında uygun `Operation` örneği seçilmelidir. Bu eşleme arayüzde yapılırsa TUI somut sınıfları bilir ve aynı eşleme farklı katmanlarda tekrarlanabilir.

`OperationFactory.create(token)` kullanıcı metnini işlem nesnesine dönüştürür. Fabrika, sembolik işaretleri ve metinsel takma adları (ör. `+` ve `add`) Java `switch` ifadesiyle eşleyebilir. Arayüz somut `AddOperation` sınıfını içe aktarmadan fabrika üzerinden işlem isteyebilir. Desteklenen işlemlerin listesi de yardım metninde kullanılmak üzere tek yerde tutulur.

## 5. Observer kalıbı

Motorun durum değişikliğinde hem **History Log** kalıcı kayıt tutmalı hem de **TerminalUI** kullanıcıya canlı geri bildirim göstermelidir. Motor bu sınıflara doğrudan bağlanırsa her yeni dinleyici motor kodunun değişmesini gerektirir.

`CalculatorEngine` Subject rolündedir ve `CalculatorObserver` arayüzünü uygulayan dinleyicileri listesinde tutar. Durum değiştiğinde `notifyObservers()` ile olay bilgisini yayınlar. `HistoryLog` ve `TerminalUI` somut gözlemcilerdir. Gözlemciyi kaydetme veya kaldırma, motoru bu bileşenlerin somut sınıflarına bağlamadan güncelleme sağlar.

## 6. Decorator kalıbı

İşlemler için girdi doğrulama veya günlükleme gibi ek davranışlar gerekir. Bunları her işlem sınıfına kopyalamak tekrar ve tutarsızlık oluşturur; motor içine eklemek de motoru bu çapraz kesen ayrıntılarla doldurur.

Decorator, `Operation` arayüzünü uygulayan sarmalayıcılarla bir işlemi çalışma anında sarar. Örneğin `ValidatedOperation` operand sayısını, geçersiz değerleri veya sıfıra bölmeyi işlem çalıştırılmadan denetleyip ardından sarılmış stratejiye devredebilir. Aynı arayüz sayesinde sarılmış nesne motor açısından normal bir işlem gibi görünür. Birden çok dekoratör sırayla katmanlanabilir; buna karşılık sarmalayıcılar izlemeyi zorlaştırabileceğinden ölçülü kullanılmalıdır.

## 7. Genişletilebilirlik örneği

Yeni bir teğet işlemi eklemek için:

1. `Operation` arayüzünü uygulayan `TangentOperation` sınıfını oluşturun.
2. `OperationFactory` içine `tan` belirtecinin eşlemesini ekleyin.
3. İstenirse desteklenen işlemler açıklamasını güncelleyin.

Motor, Command yığınları, Observer altyapısı ve TUI'nin geri kalanı değişmeden kalabilir. Tek yeni davranış strateji sınıfında kapsüllenir; kullanıcı girdisinin çözümlemesi fabrikada tutulur.

## 8. Çalışma zamanı ve terminal arayüzü

Proje Java çalışma zamanı ve derleyicisiyle çalışır. TUI kullanıcıdan işlem belirtecini ve gereken operandları alır, fabrikayla işlemi çözer, motor üzerinden komut olarak yürütür ve sonucu gösterir. Yardım ekranındaki desteklenen işlemler fabrikadan sağlanabilir. Hesaplama motoru terminal biçimlendirmesinden ayrıdır; aynı motor farklı arayüzle kullanılabilir.

## 9. Testler

### Derleme ve çalıştırma

Özgün depodaki testler düz Java ile hazırlanmıştır; test çerçevesi gerektirmeyen `expect(...)` ve `expectThrows(...)` yardımcıları kullanılır. Projenin kaynak klasöründeki derleme/çalıştırma yönergelerini izleyin.

### Kapsam

Testler matematik işlemlerini, tekli ve ikili operandları, hatalı girdileri ve istisnaları; Undo/Redo durumunu; geçmiş ve gözlemci bildirimlerini; yeni işlemlerin fabrikaya eklenmesini kapsayabilir. Testler sonucu toleranslı kayan nokta karşılaştırmasıyla doğrulayabilir. Örneğin derece cinsinden `tan(45)` değerinin yaklaşık 1 olması ve `tan(90)` için tanımsız durumun ele alınması sınanabilir.

Yeni test eklemek için açıklayıcı bir `test...()` metodu yazın, başarılı koşullarda `expect`, beklenen hatalarda `expectThrows` kullanın ve test giriş noktasından çağırın. Tam komutlar, testlerin tüm listesi ve sınıf diyagramları için [İngilizce rapora](README.md) başvurun.

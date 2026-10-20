# SEC509 Laboratuvar 4: Web Uygulaması Güvenlik Açığı Analizi

Bu laboratuvarın amacı, hedef bir web uygulamasını değerlendirerek yaygın güvenlik açıklarını belirlemek ve olası istismar yollarını incelemektir.

## Proje özeti

Değerlendirme, OWASP Top 10 kategorileri dikkate alınarak hedef web uygulamasında yapılmıştır. Elle keşif, uç nokta bulma ve otomatik veri toplama adımları uygulanmıştır.

## Depodaki dosyalar

- `omerkaratas_38160.pdf`: Güvenlik açıklarını, istismar adımlarını ve etkileri açıklayan kapsamlı laboratuvar raporu.
- `README.md`: İngilizce proje açıklaması.

## Belirlenen açıklar

1. **Bilgi ifşası (`robots.txt`):** Yönetim ve bankacılık uç noktalarının dosyada listelenmesi keşif çalışmalarını kolaylaştırıyordu.
2. **Güvenlik yapılandırma hatası:** Hassas bankacılık portalı (`/tombankhadi-login`), ana haber uygulamasıyla aynı altyapıda açıktı.
3. **IDOR / kaynak numaralandırma:** `/news/[ID]` yolundaki tahmin edilebilir sıralı kimlikler tüm makalelerin sistematik taranmasına imkân veriyordu.
4. **API uç noktasında IDOR:** `/api/user/[ID]` yetkilendirme denetimi yapmadığından giriş yapmış bir kullanıcı diğer kullanıcıların e-posta ve rollerini görebiliyordu.
5. **Otomatik kullanıcı keşfi:** Python betiğiyle kullanıcı veritabanının tamamının toplanabildiği gösterildi.
6. **Zayıf kimlik doğrulama:** “Hangi şehirde doğdunuz?” gibi tahmin edilebilir güvenlik soruları, yönetici dahil ayrıcalıklı hesapların ele geçirilmesine yol açabiliyordu.

## Yöntem

Yapılandırma dosyaları (`robots.txt`, `sitemap.xml`) ve yollar elle incelendi; giriş, kayıt ve arama gibi saldırı yüzeyleri belirlendi. IDOR açıkları ve Python ile otomatik numaralandırma değerlendirildi. Her bulgunun gizlilik ve bütünlük üzerindeki etkisi analiz edildi.

## Paylaşım notu

Sahiplik uyarısı nedeniyle ödevin tüm materyalleri paylaşılmamıştır.

> BU MATERYAL SABANCI ÜNİVERSİTESİ'NİN MÜLKİYETİDİR. İZİNSİZ KULLANIM VEYA DAĞITIM KESİNLİKLE YASAKTIR.

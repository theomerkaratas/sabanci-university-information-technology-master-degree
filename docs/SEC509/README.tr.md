# SEC 509: Güvenli Kodlama ve Yazılım Güvenliği

**SEC 509: Güvenli Kodlama ve Yazılım Güvenliği** dersine ait notlar ve çalışmalar. Ders; dayanıklı yazılım tasarımının ilkelerini, güvenlik açıklarının bulunmasını ve güvenliğin modern yazılım geliştirme yaşam döngüsüne (DevSecOps) katılmasını ele alır.

## Ders izlencesi

| Hafta | Konu |
| --- | --- |
| 1 | Güvenli yazılım tasarımının temel kavramları |
| 2 | Güvenli yazılım geliştirme yaşam döngüsü |
| 3 | Güvenli programlama tasarım ilkeleri |
| 4 | Honeypot ve diğer güvenlik araçlarındaki tasarım kusurlarını belirleme |
| 5–6 | OWASP Top 10: web uygulaması güvenlik riskleri |
| 7–8 | PHP ve PHP güvenlik açıkları |
| 9 | Enjeksiyon saldırıları ve azaltma yöntemleri |
| 10–11 | OWASP API Top 10 |
| 12–13 | C ve C++ güvenlik açıkları |
| 14 | DevSecOps ve statik analiz araçları |

## Ders bölümleri

| Bölüm | Başlık | Konular |
| --- | --- | --- |
| 1 | Yazılım güvenliğinin temelleri | Yazılımın yaygınlığı, McCumber Küpü ve CIA, işlevsel olmayan gereksinimler, güvenlik açıklarının kök nedenleri. |
| 2 | Güvenlik duruşu ve DevSecOps | Siber hijyen, SDLC'de güvenlik, PAM ve parola politikaları, insan davranışı. |
| 2.1 | Kişisel ve kurumsal siber hijyen | Kişisel ve profesyonel dijital ortamlarda güvenli çalışma alışkanlıkları. |
| 2.2 | DevSecOps'a giriş | Güvenliği erkene alma, otomasyon ve ortak sorumluluk. |
| 2.3 | PAM ve parola karmaşıklığı | PAM ile kimlik doğrulama ve parola kurallarının uygulanması. |
| 2.4 | Siber güvenlik kültürü | Güvenliğin psikolojik ve kurumsal yönleri. |

## Ödevler ve laboratuvar çalışmaları

- [**Laboratuvar 1: Tehdit modelleme**](./Homeworks/Lab1/README.md): OrcunCorp Belge Paylaşım Aracı için Microsoft Threat Modeling Tool ve STRIDE ile tehdit modeli oluşturma.
- [**Laboratuvar 2: Siber güvenlik farkındalığı**](./Homeworks/Lab2/README.md): AB destekli CYRUS projesinde DevSecOps, parola politikası ve insan davranışı eğitimlerini tamamlama.
- [**Laboratuvar 3: Elasticsearch honeypot'ları**](./Homeworks/Lab3/README.md): Elasticsearch honeypot'larını dağıtma ve kötü amaçlı trafiği kaydeden HoneyPHP aracını geliştirme.
- [**Laboratuvar 4: Web uygulaması güvenlik analizi**](./Homeworks/Lab4/README.md): IDOR, bilgi ifşası ve kimlik doğrulama kusurlarını inceleme.

## Dokümanlar ve sınav özetleri

[Bölüm notları](./Documents/chapter1.md) yazılım güvenliği temellerini; [Bölüm 2](./Documents/chapter2.md) siber hijyen, DevSecOps, PAM ve güvenlik kültürünü kapsar. Ders kuralları ve akademik dürüstlük gereği burada yalnızca seçili konular belgelenmiştir.

[**Final sınavı için el yazısı özetler**](./Cheatsheets/README.md) 14 sayfada OWASP Top 10 ve API güvenliği, honeypot'lar, PHP açıkları, C bellek güvenliği ve dayanıklı uygulama ilkelerini toplar.

*Bu depo, Sabancı Üniversitesi Bilgi Teknolojileri Yüksek Lisans Programı kapsamında hazırlanmıştır.*

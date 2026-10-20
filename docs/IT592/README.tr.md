# IT 592: Mezuniyet Projesi ☁️

Bu bölümde Sabancı Üniversitesi Bilgi Teknolojileri Yüksek Lisans Programı kapsamında tamamlanan mezuniyet projesinin genel tanıtımı ve raporu bulunur.

## Mezuniyet projesi: Free Cloud Initiative (FCI)

- **GitHub organizasyonu:** [github.com/freecloudinitiative](https://github.com/freecloudinitiative)
- **Yazar:** Ömer Faruk Karataş
- **Proje raporu:** [Mezuniyet projesi raporunu oku](./graduation_report.md)
- **İmzalı resmi rapor (PDF):** [PDF'yi indir](./omer_karatas_report.pdf)

**Free Cloud Initiative (FCI)**, yedi ARM64 Raspberry Pi 5 tek kart bilgisayardan oluşan bare-metal Kubernetes kümesi üzerinde çalışan, açık kaynaklı ve kendi sunucusunda barındırılabilen bir bulut platformudur. Ticari bulut hizmetlerinin temel yapı taşlarını; eğitim, geliştirici deneyleri ve platform mühendisliği gösterimleri için hafif, kapsayıcı tabanlı bileşenlere dönüştürür.

## Mimari ve temel bileşenler

| Katman | Teknolojiler | Açıklama |
| --- | --- | --- |
| **Kontrol düzlemi** | Go, REST, WebSocket, JWT | İşlem, kimlik ve erişim yönetimi, depolama, veritabanı ve terminal erişimi için mikro hizmetler. |
| **Veri ve kalıcılık** | PostgreSQL, Garage S3 | CloudNativePG operatörü ve S3 uyumlu dağıtık nesne depolama. |
| **Küme ve donanım** | 7 × Raspberry Pi 5 (ARM64), K3s | Bare-metal üzerinde kaynak verimli Kubernetes dağıtımı. |
| **GitOps ve teslimat** | Argo CD, Helm, GitHub Actions | Bildirimsel App-of-Apps eşitlemesi ve çok mimarili CI/CD işlem hatları. |
| **Uç katman ve güvenlik** | Cloudflare Zero Trust, OpenBAO | Tünellerle otomatik erişim, OIDC kimlik doğrulaması ve sır yönetimi. |
| **Gözlemlenebilirlik** | Prometheus, Grafana, Loki, Tempo | Metrikler, dağıtık izler ve merkezi günlükleme. |

## Ayrıntılı dokümantasyon

Gereksinim tanımları, şema tasarımları, mikro hizmet uygulamaları ve performans incelemesi için [Free Cloud Initiative mezuniyet projesi raporuna](./graduation_report.md) veya [imzalı PDF raporuna](./omer_karatas_report.pdf) bakabilirsiniz.

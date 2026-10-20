# IT 535: Mobil Programlama 📱

**Sabancı Üniversitesi Bilgi Teknolojileri Yüksek Lisans Programı** kapsamında tamamlanan IT 535 Mobil Programlama dersinin dokümantasyon, ders çalışmaları ve proje bağlantıları.

## Ders özeti

IT 535, **React Native** ve **Expo** ekosistemiyle iOS ve Android için modern, platformlar arası mobil uygulama geliştirmeye odaklanır. Ders; ölçeklenebilir uygulama mimarisi, kullanıcı kimlik doğrulama, arayüz stillendirme, ürün analitiği, dosya tabanlı yönlendirme ve bulut derleme süreçlerini kapsar.

## Ana proje: Subscrio 💳

- **Depo:** [theomerkaratas/subscrio](https://github.com/theomerkaratas/subscrio)

**Subscrio**, dersin ana projesi olarak geliştirilen bir mobil uygulamadır. Kullanıcıların yinelenen aboneliklerini, yaklaşan yenileme tarihlerini ve harcama analizlerini yönetip takip etmelerine yardımcı olur.

## Teknoloji yığını ve araçlar

- **Çatı ve temel:** [React Native](https://reactnative.dev/) ve [Expo](https://expo.dev/)
- **Gezinme ve dosya tabanlı yönlendirme:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **Kimlik doğrulama ve kullanıcı yönetimi:** [Clerk](https://clerk.com/)
- **Ürün analitiği ve olay takibi:** [PostHog](https://posthog.com/)
- **Derleme ve bulut dağıtımı:** [EAS (Expo Application Services)](https://expo.dev/eas)
- **Stil:** [NativeWind](https://www.nativewind.dev/) (React Native için Tailwind CSS)
- **Dil ve çalışma zamanı:** TypeScript / Node.js

## İşlenen konular

| Konu | Açıklama | Temel teknolojiler |
| --- | --- | --- |
| **Mobil mimari ve gezinme** | Dosya tabanlı yönlendirme, yığın ve sekme gezinmesi, modal akışları | Expo Router, React Native |
| **Kullanıcı kimlik doğrulama ve yetkilendirme** | OAuth, güvenli oturum saklama, korumalı ekranlar | Clerk |
| **Arayüz tasarımı ve yardımcı sınıf tabanlı stillendirme** | Duyarlı yerleşimler, açık/koyu temalar, Tailwind sınıfları | NativeWind |
| **Analitik ve telemetri** | Kullanıcı davranışı takibi, özellik bayrakları, olay kaydı | PostHog |
| **Derleme ve dağıtım işlem hatları** | Bulut derlemeleri, OTA güncellemeleri, üretim kimlik bilgileri ve sağlama | EAS Build ve Submit |
| **Durum yönetimi ve eşzamansız veri** | Yerel ve genel durum, eşzamansız veri getirme | React Hooks, Context API |

# IT 501: Bilgisayar Programlamaya Giriş 🐍

Bu ders, Sabancı Üniversitesi Bilgi Teknolojileri Yüksek Lisans Programı'nın temel programlama dersidir. Python kullanarak algoritmik problem çözme, modüler yazılım tasarımı ve temel programlama yaklaşımlarını ele alır.

> **Kaynak kodu:** Uygulamalar, ASCII çizimleri ve çalıştırılabilir terminal programları [IT501 GitHub klasöründe](https://github.com/theomerkaratas/sabanci-university-information-technology-master-degree/tree/main/IT501) bulunur.

## Projeler

| Proje | Temel konular | Açıklama |
| --- | --- | --- |
| **Blackjack** | Oyun döngüleri, koşullar, dinamik puanlama | As değerini 1 veya 11 sayabilen kurallı kart oyunu. |
| **Hesap Makinesi** | Aritmetik işlemler, özyineleme, girdi denetimi | Sıfıra bölme kontrolü ve ardışık işlem desteği olan hesap makinesi. |
| **Sezar Şifrelemesi** | Metin işleme, modüler aritmetik, kriptografi | Harfleri kaydırarak metin şifreleyen ve çözen araç. |
| **Kahve Makinesi** | Durum yönetimi, kaynak takibi, ödeme işlemleri | Malzeme stoklarını ve para üstünü yöneten otomat simülasyonu. |
| **Adam asmaca** | Metin ayrıştırma, durum takibi, görsel geri bildirim | ASCII aşamaları ve kelime listeleri içeren kelime tahmin oyunu. |
| **Higher-Lower** | Sözlük verisi, rastgele seçim, puanlama | Sosyal medya takipçi sayılarını karşılaştıran bilgi oyunu. |

## Kodlama yaklaşımı

- **Hatalı girdilere dayanıklılık:** Sayısal olmayan, boş veya geçersiz aralıktaki girdiler kontrollü biçimde ele alınır.
- **Sorumlulukların ayrılması:** İş mantığı, görsel metinler ve veriler `main.py`, `art.py` ve `game_data.py` gibi ayrı modüllerde tutulur.
- **Taşınabilirlik:** Uygulamalar platforma özgü veya yalnızca bulutta çalışan kütüphanelere bağlı olmadan standart Python 3.x ile çalışacak şekilde hazırlanır.

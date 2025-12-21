# TrueBank Java Hesap Uygulaması

## Proje Hakkında
Bu proje, Java ile yazılmış temel bir banka hesap yönetim uygulamasıdır. Hesap açma, para yatırma, çekme, transfer ve işlem geçmişi gibi temel bankacılık işlemlerini destekler. Konsol üzerinden veya (geliştirirseniz) web arayüzü ile kullanılabilir.

## Klasörler
- `src/` : Tüm Java kaynak kodları burada bulunur.
- `bin/` : Derlenmiş .class dosyaları burada tutulur.

## Derleme
Projeyi derlemek için:

```
javac -d bin src/*.java
```

## Çalıştırma
Ana sınıfı çalıştırmak için:

```
java -cp bin Main
```

## Özellikler
- Hesap açma, kapama
- Para yatırma ve çekme
- Hesaplar arası transfer (kur dönüşümlü)
- Hesap durumu değiştirme
- İşlem geçmişi görüntüleme

## Notlar
- Uygulama varsayılan olarak konsol tabanlıdır. Web arayüzü eklemek için SparkJava veya Spring Boot gibi bir framework entegre edebilirsiniz.
- Veritabanı bağlantısı için PostgreSQL kullanılır.

## Geliştiriciler
- [Ömer Karataş](https://www.linkedin.com/in/omerfarukkaratas/)
- [Erkin Mahmatlı](https://www.linkedin.com/in/erkin-mahmatlı-a201bb19b/)
- [Onur Vatandaş](https://www.linkedin.com/in/onurvatandas/)

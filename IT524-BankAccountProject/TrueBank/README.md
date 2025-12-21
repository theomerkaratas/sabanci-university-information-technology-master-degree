### Alternatif: src Klasöründe Çalıştırmak
Eğer doğrudan `src` klasörüne geçtiyseniz, aşağıdaki komutla uygulamayı çalıştırabilirsiniz:

```
java Main
```

> Not: Bu yöntemde derlenmiş .class dosyalarının da `src` klasöründe olması gerekir. Tavsiye edilen yöntem üstteki gibi `bin` klasörünü kullanmaktır.
# TrueBank Java Hesap Uygulaması

## Proje Hakkında
Bu proje, Java ile yazılmış temel bir banka hesap yönetim uygulamasıdır. Hesap açma, para yatırma, çekme, transfer ve işlem geçmişi gibi temel bankacılık işlemlerini destekler. Konsol üzerinden veya (geliştirirseniz) web arayüzü ile kullanılabilir.

## Klasörler
- `src/` : Tüm Java kaynak kodları burada bulunur.
- `bin/` : Derlenmiş .class dosyaları burada tutulur.



## Terminalden Java Kodunu Çalıştırma
### Alternatif: src Klasöründe 'java Main' ile Çalıştırma
Eğer doğrudan `src` klasörüne geçtiyseniz, aşağıdaki komutla uygulamayı çalıştırabilirsiniz:

```
java Main
```

> Not: Bu yöntemde derlenmiş `.class` dosyalarının da `src` klasöründe olması gerekir. Eğer `javac *.java` ile derlediyseniz, bu şekilde çalıştırabilirsiniz. Tavsiye edilen yöntem ise yukarıdaki gibi `bin` klasörünü kullanmaktır.

### 1. Klasöre Girin
Proje ana dizininde aşağıdaki komutla `Accounts` klasörüne girin:

```
cd Accounts
```

### 2. Java Dosyalarını Derleyin
Tüm Java kaynak dosyalarını derlemek için:

```
javac -d bin src/*.java
```

### 3. Uygulamayı Çalıştırın
Ana sınıfı (örneğin Main) çalıştırmak için:

```
java -cp bin Main
```

> Eğer farklı bir ana sınıf kullanıyorsanız, örneğin `BankApp`, şu şekilde çalıştırabilirsiniz:
>
> ```
> java -cp bin BankApp
> ```

> Eğer terminalde src klasöründeyseniz, önce bir üst dizine çıkıp yukarıdaki adımları uygulayın.

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

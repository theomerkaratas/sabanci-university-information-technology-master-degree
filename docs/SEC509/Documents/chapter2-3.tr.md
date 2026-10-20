# 2.3 PAM ve Parola Karmaşıklığı Politikasını Anlama

## 1. Giriş

Parola ilkeleri, kolay tahmin edilen veya ele geçirilmiş kimlik bilgilerinin hesaplara erişim sağlamasını zorlaştırır. Linux'ta PAM modülleri kimlik doğrulama sürecine eklenerek parola denetimlerini merkezi biçimde uygular.

## 2. PAM nedir?

**PAM (Pluggable Authentication Modules / Takılabilir Kimlik Doğrulama Modülleri)**, Unix/Linux sistemlerinde uygulamalarla kimlik doğrulama yöntemleri arasında yapılandırılabilir bir katmandır. Yerel parola, Kerberos veya SSSD gibi farklı doğrulayıcılar ilgili PAM modülü üzerinden kullanılabilir.

### PAM nasıl çalışır?

Bir hizmet (ör. parola değiştirme veya oturum açma) PAM yapılandırmasını çağırır. Yapılandırma sıralı modülleri ve bu modüllerin başarı/başarısızlık durumunda nasıl davranacağını belirler. Bu nedenle PAM dosyalarını değiştirirken yedek almak ve dağıtıma özgü yapılandırmayı dikkatle incelemek önemlidir.

## 3. Parola karmaşıklığı

Parola karmaşıklığı, zayıf ve tahmin edilebilir parolaları reddedip daha dayanıklı parola seçimini teşvik eden kurallardır. `pam_pwquality.so`, yeni parola belirlenmeden önce sözlük, uzunluk, önceki parolaya benzerlik ve karakter kurallarını denetler. Eski Red Hat sistemlerinde kullanılan `pam_cracklib` modülünün yerini almıştır.

Modül yaygın sözlük sözcüklerini, palindromları, yalnızca büyük/küçük harf değiştirilen parolaları, eski parolaya fazla benzeyen veya karakterleri kaydırılmış parolaları reddedebilir. Kısa parola, art arda yinelenen karakter ve kullanıcı adının parolada bulunması da yapılandırılabilir kurallardır. Kurallar geçerse parola genellikle yazım hatasına karşı yeniden girilir.

## 4. Kuralları yapılandırma

### Yöntem 1: PAM yapılandırma dosyası

Sistem dosyalarını değiştirmeden önce yedekleyin:

```bash
sudo cp /etc/security/pwquality.conf /etc/security/pwquality.conf.original
sudo cp /etc/pam.d/system-auth /etc/pam.d/system-auth.original
```

Ardından ilgili PAM dosyasını açın:

```bash
sudo vim /etc/pam.d/system-auth
```

`pam_pwquality.so` satırını bulun. Örnek satır:

```text
password requisite pam_pwquality.so try_first_pass local_users_only retry=3 authtok_type=.
```

Dağıtımlar PAM yapılandırmasını farklı yönetebilir. Yanlış bir değişiklik parola değiştirmeyi veya oturum açmayı bozabileceğinden, değişiklik öncesi yapılandırmayı ve kurtarma yolunu doğrulayın.

## 5. Parola karmaşıklığı seçenekleri

| Seçenek | Anlamı |
| --- | --- |
| `minlen=N` | İzin verilen en kısa parola uzunluğu. `minlen=15`, en az 15 karakter ister. |
| `lcredit=N` | Küçük harf gereksinimi. `-1`, en az bir küçük harf ister. |
| `ucredit=N` | Büyük harf gereksinimi. `-1`, en az bir büyük harf ister. |
| `dcredit=N` | Rakam gereksinimi. `-1`, en az bir rakam ister. |
| `ocredit=N` | Özel karakter gereksinimi. `-1`, en az bir özel karakter ister. |
| `maxrepeat=N` | Aynı karakterin art arda kaç kez bulunabileceğini sınırlar. `3`, `aaaa` dizisini reddeder. |
| `enforce_for_root` | Kuralların root kullanıcısına da uygulanmasını sağlar. |

Örneğin en az 15 karakter, her karakter sınıfından en az bir örnek ve en çok üç ardışık tekrar isteyen satır:

```text
password requisite pam_pwquality.so try_first_pass local_users_only retry=3 authtok_type= minlen=15 lcredit=-1 ucredit=-1 dcredit=-1 ocredit=-1 maxrepeat=3
```

### Yöntem 2: `pwquality.conf`

Ayarlar `/etc/security/pwquality.conf` içinde de tanımlanabilir:

```bash
sudo vim /etc/security/pwquality.conf
```

İlgili satırların yorum işaretini kaldırıp değerleri belirleyin:

```text
minlen = 15
maxrepeat = 3
lcredit = -1
ucredit = -1
dcredit = -1
ocredit = -1
```

Vim'de kaydedip çıkmak için `Esc`, `:wq` ve `Enter` tuşlarına basın.

## 6–7. Normal kullanıcıda doğrulama

Kuralı etkinleştirdikten sonra normal kullanıcı hesabında zayıf ve güçlü parolalarla test edin:

```bash
passwd
```

Zayıf veya eski parolaya çok benzeyen bir parola reddedilir; sistem sınırlı sayıda yeniden deneme sunar. Güçlü parola tüm yapılandırılmış kuralları karşılamalıdır. Başarılı işlemde `all authentication tokens updated successfully` mesajı görünür. Örnek notlardaki parola yalnızca açıklama amaçlıdır; gerçek sistemlerde örnek parolaları kullanmayın.

## 8. Root hesabı için kuralları uygulama

Bazı yapılandırmalarda yönetici/root kullanıcısı parola kalitesi denetimini atlayabilir. Politikayı bütün kullanıcılar için zorunlu kılmak üzere `pam_pwquality.so` satırına `enforce_for_root` eklenebilir:

```text
password requisite pam_pwquality.so try_first_pass local_users_only retry=3 authtok_type= minlen=15 lcredit=-1 ucredit=-1 dcredit=-1 ocredit=-1 maxrepeat=3 enforce_for_root
```

Root olarak zayıf parola denendiğinde uzunluk, rakam veya büyük harf kurallarını karşılamadığı için reddedilmelidir. `retry=3` üç başarısız denemeden sonra daha fazla denemeyi durdurur. Güçlü ve bütün kuralları karşılayan parola kabul edilir.

## 9. Eski parolaların tekrar kullanılmasını önleme

Parola geçmişi, kullanıcıların daha önce kullandıkları parolalara geri dönmesini engeller. `pam_pwhistory.so` önceki parolaların özetlerini saklar ve yeni parolayı bu geçmişle karşılaştırır. Örnek PAM satırı, parola kalite kontrolünün ardından eklenir:

```text
password requisite pam_pwhistory.so debug use_authtok remember=12 retry=3 enforce_for_root
```

| Seçenek | Açıklama |
| --- | --- |
| `debug` | Sorun giderme için ayrıntılı günlük üretir. |
| `use_authtok` | Önceki modülün kabul ettiği parolayı tekrar istemeden kullanır. |
| `remember=12` | Önceki 12 parolanın yeniden kullanılmasını engeller. |
| `retry=3` | Yeni parola için deneme sayısını sınırlar. |
| `enforce_for_root` | Geçmiş kuralını root için de uygular. |

Yeni ve kurallara uygun parola ilk değişiklikte kabul edilir; aynı parola hemen tekrar seçilirse `Password has been already used` benzeri iletiyle reddedilir. Bu, parola değiştirme politikasının eski parolaya geri dönülerek aşılmasını önler.

## 10. Özet: Katmanlı parola güvenliği

- **`pam_pwquality.so`:** Uzunluk ve karakter kurallarıyla zayıf parola seçimini engeller.
- **`enforce_for_root`:** Yöneticilerin de aynı kurallara uymasını sağlar.
- **`pam_pwhistory.so`:** Yakın zamanda kullanılan parolaların tekrarını önler.

Bu kontroller güçlü ve farklı parolaları teşvik eder. Güvenlik için parola yöneticisi, MFA, hesap kurtarma süreçleri ve PAM yapılandırmasının yedeklenmesiyle birlikte ele alınmalıdır.

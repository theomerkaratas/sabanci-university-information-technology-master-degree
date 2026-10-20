# SEC509 Laboratuvar 3: Elasticsearch Honeypot'ları

Bu laboratuvarda kötü amaçlı etkinlikleri yakalayıp kaydetmek amacıyla farklı Elasticsearch honeypot'ları dağıtılmış, yapılandırılmış ve incelenmiştir.

## Proje özeti

Üç honeypot değerlendirilmiştir:

1. **Elastichoney:** Elasticsearch sunucusunu taklit eden Go tabanlı honeypot.
2. **ElasticPot:** Benzer işlev sağlayan Python tabanlı honeypot.
3. **HoneyPHP (özel):** Her iki araçtan özellikler birleştirilerek PHP ile geliştirilen Enhanced Elasticsearch Honeypot v2.0.

## Depodaki dosyalar

- `index.php`: Özel PHP honeypot uygulaması.
- `history.txt`: Ortamı hazırlama ve servisleri dağıtma komutlarının geçmişi.
- `omerkaratas_lab4.pdf`: Ayrıntılı laboratuvar raporu ve analiz. Belge Lab 4 olarak adlandırılsa da Lab 3 klasöründeki çalışmayla ilgilidir.
- `README.md`: İngilizce proje açıklaması.

## HoneyPHP özellikleri

HoneyPHP v2.0, **9500** numaralı portta çalışacak şekilde hazırlanmıştır. `/`, `/_cluster/health`, `/_nodes` ve `/_search` uç noktalarını taklit eder; Painless, `script` veya `eval` içeren betik enjeksiyonu ve uzaktan kod çalıştırma (RCE) girişimlerini tespit edip kaydeder. Dizin sorgularına benzetilmiş meta verilerle yanıt verir. IP adresi, istek türü ve ham istek gövdesi `/var/log/honeyphp/` altında ayrıntılı biçimde kaydedilir.

## Kurulum ve dağıtım

Gerekli ortam Go, Python 3 ve PHP içerir. Örnek bağımlılık kurulumu:

```bash
sudo apt update && sudo apt install -y golang python3-pip php-cli git screen curl jq
```

### HoneyPHP

`index.php`, PHP'nin yerleşik sunucusuyla sunulur. Süreklilik için systemd servisi etkinleştirilip başlatılır:

```bash
sudo systemctl enable honeyphp
sudo systemctl start honeyphp
```

Ana günlük `/var/log/honeyphp/honeyphp.log`, ayrıntılı günlük `/var/log/honeyphp/honeyphp_detailed.log` konumundadır.

### Elastichoney ve ElasticPot

Elastichoney port çakışmasını önlemek için 9300 numaralı portta `screen` ile çalıştırılır. ElasticPot bir Python sanal ortamında çalışır ve yine `screen` ile yönetilir.

## Günlük analizi

Her honeypot kendi biçiminde kayıt tutar. `history.txt`, günlükleri izlemek ve honeypot'ların çalışmasını doğrulamak için kullanılan komut sırasını içerir.

*Ömer Karataş tarafından Sabancı Üniversitesi Bilgi Teknolojileri Yüksek Lisans Programı kapsamında hazırlanmıştır.*

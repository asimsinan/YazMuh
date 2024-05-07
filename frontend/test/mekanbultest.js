const { Builder, By } = require("selenium-webdriver");
const mekanlar = [
  {
    isim: "Hanedan Restaurant & Steak Isparta",
    koordinat: "37.938895,32.554225",
    acilis: "10:00",
    kapanis: "23:00",
    gunler1: "Pazartesi-Cuma",
    gunler2: "Cumartesi-Pazar",
    imkanlar: "Et, Steak, Izgara, Salata, Meze, Tatlı",
    adres: "Fatih Mahallesi, Ertokuş Caddesi 4511 Sokak No:2/1 Merkez",
  },
  {
    isim: "ANTRE GURME KITCHEN ISPARTA",
    koordinat: "37.939847,32.553545",
    acilis: "10:00",
    kapanis: "23:00",
    gunler1: "Pazartesi-Cuma",
    gunler2: "Cumartesi-Pazar",
    imkanlar:
      "Kahvaltı, Türk Mutfağı, Dünya Mutfağı, Pizza, Makarna, Salata, Tatlı",
    adres: "Isparta Merkez/Isparta",
  },
  {
    isim: "Yıldız Lokantası",
    koordinat: "37.940254,32.553040",
    acilis: "08:00",
    kapanis: "22:00",
    gunler1: "Pazartesi-Cuma",
    gunler2: "Cumartesi-Pazar",
    imkanlar: "Ev Yemekleri, Kebap, Izgara, Salata, Meze, Tatlı",
    adres: "3237. Sk. No:30",
  },
  {
    isim: "Köfteci Yusuf",
    koordinat: "37.940838,32.552346",
    acilis: "09:00",
    kapanis: "24:00",
    gunler1: "Pazartesi-Cuma",
    gunler2: "Cumartesi-Pazar",
    imkanlar: "Köfte, Izgara, Dürüm, Salata, Ayran, Tatlı",
    adres: "Atatürk Mahallesi, Süleyman Demirel Bulvarı No:100/A Merkez",
  },
  {
    isim: "Ferah Kebap Salonu",
    koordinat: "37.941422,32.551652",
    acilis: "11:00",
    kapanis: "01:00",
    gunler1: "Pazartesi-Cuma",
    gunler2: "Cumartesi-Pazar",
    imkanlar: "Kebap, Lahmacun, Pide, Dürüm, Salata, Meze, Ayran, Tatlı",
    adres: "Atatürk Mahallesi, Süleyman Demirel Bulvarı No:114/A Merkez",
  },
  {
    isim: "Lavanta Cafe & Bistro",
    koordinat: "37.942006,32.550958",
    acilis: "09:00",
    kapanis: "01:00",
    gunler1: "Pazartesi-Cuma",
    gunler2: "Cumartesi-Pazar",
    imkanlar: "Kahvaltı, Cafe, Sandviç, Salata, Tatlı, Kahve, Çay, Smoothie",
    adres: "Atatürk Mahallesi, 3242. Sk. No:10/A Merkez",
  },
  {
    isim: "Gramofon Cafe Bistro",
    koordinat: "37.942590,32.550264",
    acilis: "10:00",
    kapanis: "02:00",
    gunler1: "Pazartesi-Cuma",
    gunler2: "Cumartesi-Pazar",
    imkanlar: "Cafe, Bar, Kokteyl, Canlı Müzik, Burger, Pizza, Salata, Tatlı",
    adres: "Atatürk Mahallesi, Süleyman Demirel Bulvarı No:144/A Merkez",
  },
];
var rastgeleMekan = mekanlar[Math.floor(Math.random() * mekanlar.length)];
describe("MekanbulTest", function () {
  let driver;
  let vars;
  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    vars = {};
  });
  it("MekanbulTest", async function () {
    await driver.get("http://localhost:5173/");
    await driver.manage().window().setRect({ width: 1280, height: 689 });
    await driver.manage().setTimeouts({ implicit: 2000 });
    await driver.findElement(By.linkText("Test")).click();
    await driver.findElement(By.linkText("Yorum Ekle")).click();
    await driver.executeScript("window.scrollTo(0,0)");
    await driver.findElement(By.css(".btn-login")).click();
    await driver.findElement(By.name("text")).click();
    await driver.findElement(By.name("text")).sendKeys("Harika");
    await driver.findElement(By.css(".btn")).click();
    await driver.findElement(By.linkText("Yönetici")).click();
    await driver.findElement(By.name("Güncelle")).click();
    await driver.findElement(By.name("name")).clear();
    await driver
      .findElement(By.name("name"))
      .sendKeys("SDÜ Bilgisayar Mühendisliği");
    await driver.findElement(By.name("Güncelle")).click();
    await driver.executeScript("window.scrollTo(0,0)");
    await driver.findElement(By.name("Mekan Ekle")).click();
    await driver.findElement(By.name("name")).sendKeys(rastgeleMekan.isim);
    await driver.findElement(By.name("address")).sendKeys(rastgeleMekan.adres);
    await driver
      .findElement(By.name("foodanddrink"))
      .sendKeys(rastgeleMekan.imkanlar);
    await driver
      .findElement(By.name("coordinates"))
      .sendKeys(rastgeleMekan.koordinat);
    await driver.findElement(By.name("day1")).sendKeys(rastgeleMekan.gunler1);
    await driver
      .findElement(By.name("openclose1"))
      .sendKeys(rastgeleMekan.acilis + "-" + rastgeleMekan.kapanis);
    await driver.findElement(By.name("day2")).click();
    await driver.findElement(By.name("day2")).sendKeys(rastgeleMekan.gunler2);
    await driver
      .findElement(By.name("openclose2"))
      .sendKeys(rastgeleMekan.acilis + "-" + rastgeleMekan.kapanis);
    await driver.findElement(By.name("Ekle")).click();
    await driver.executeScript("window.scrollTo(0,0)");
  });
});

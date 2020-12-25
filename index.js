const {Builder, By} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromeDriver = require("chromedriver");
const config = require("./config.js");
const baseUrl = "https://gallog.dcinside.com";



chrome.setDefaultService(new chrome.ServiceBuilder(chromeDriver.path).build());

async function login({baseUrl, id, pw}) {
  let driver = await new Builder().forBrowser("chrome").build();

  // login
  await driver.get(`${baseUrl}/${id}`);
  await driver.findElement(By.className("btn_top_loginout")).click();
  await driver.findElement(By.id("id")).sendKeys(id);
  await driver.findElement(By.id("pw")).sendKeys(pw);
  await driver.findElement(By.className("btn_wfull")).click();

  return {
    driver
  };
}

async function clean(config) {
  const {id, pw, category = 'post', interval = 500} = config;

  const {driver} = await login({baseUrl, d, pw});
  let isContinue = true;

  // go to category
  driver.get(`${baseUrl}/${id}/${category}`);

  while (isContinue) {
    try {
      // delete
      await driver.findElement(By.className("btn_delete")).click();
      await driver.sleep(interval);

      // confirm
      const alert = await driver.switchTo().alert();
      await alert.accept();

      await driver.sleep(interval);
    } catch (e) {
      switch (e.name) {
        case 'NoSuchElementError': {
          isContinue = false;
          await driver.quit();
          break;
        }
        case 'NoSuchAlertError': {
          await driver.sleep(interval);
          break;
        }
        default: {
          await driver.quit();
        }
      }
      await driver.sleep(interval);
    }
  }
}

clean(config);



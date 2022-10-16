const {Builder, By} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromeDriver = require("chromedriver");
const config = require("./config.js");
const {pipe, range, each} = require("@fxts/core");
const baseUrl = "https://gallog.dcinside.com";

chrome.setDefaultService(new chrome.ServiceBuilder(chromeDriver.path).build());

const getDriver = () => Promise.resolve(new Builder().forBrowser("chrome").build());
const navigateToWebsite = (baseUrl, id) => (driver) => driver.get(`${baseUrl}/${id}`).then(() => driver);
const loginByIdPw = (id, pw) => (driver) =>
    driver.findElement(By.className("btn_top_loginout")).click()
        .then(() => driver.findElement(By.id("id")).sendKeys(id))
        .then(() => driver.findElement(By.id("pw")).sendKeys(pw))
        .then(() => driver.findElement(By.className("btn_wfull")).click())
        .then(() => driver);

const login = ({baseUrl, id, pw}) =>
    getDriver()
        .then(navigateToWebsite(baseUrl, id))
        .then(loginByIdPw(id, pw));

/*async function login({baseUrl, id, pw}) {
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
}*/

const wait = ({interval}) => (driver) => driver.sleep(interval).then(() => driver);
const navigateToCategory = (config) => (driver) => driver.get(`${config.baseUrl}/${config.id}/${config.category}`).then(() => driver);
const deletePost = ({interval}) => (driver) =>
    driver.findElement(By.className("btn_delete")).click()
        .then(() => driver.sleep(interval))
        .then(() => driver);
const confirmDelete = (driver) =>
    driver.switchTo().alert()
        .then((alert) => alert.accept())
        .then(() => driver);

const onDeleteFailed = ({interval}) => (driver) => (e) => {
    switch (e.name) {
        case 'NoSuchElementError': {
            return driver.quit();
        }
        case 'NoSuchAlertError': {
            return driver.sleep(interval);
        }
        case 'NoSuchSessionError': {
            return driver.sleep(interval);
        }
        default: {
            return driver.quit();
        }
    }
}

const clean = (config) => {

    login(config)
        .then(navigateToCategory(config))
        .then(driver => {

            pipe(
                range(Infinity),
                each(() => deletePost(config)(driver)
                    .then(confirmDelete)
                    .then(wait(config))
                    .catch(onDeleteFailed(config)(driver)))
            )

        });


}

/*async function clean(config) {
    const {id, pw, category = 'post', interval = 500} = config;

    const {driver} = await login({baseUrl, id, pw});
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
                case 'NoSuchSessionError': {
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
}*/

clean({...config, baseUrl});



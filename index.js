const {Builder, By} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const config = require("./config.js");
const baseUrl = "https://gallog.dcinside.com";

const options = new chrome.Options();

const getDriver = () => Promise.resolve(new Builder().setChromeOptions(options).forBrowser("chrome").build());
const navigateToWebsite = (baseUrl, id) => (driver) => driver.get(`${baseUrl}/${id}`).then(() => driver);
const loginByIdPw = (id, pw) => (driver) => driver.findElement(By.className("btn_top_loginout")).click()
    .then(() => driver.findElement(By.id("id")).sendKeys(id))
    .then(() => driver.findElement(By.id("pw")).sendKeys(pw))
    .then(() => driver.findElement(By.className("btn_wfull")).click())
    .then(() => driver);

const login = ({baseUrl, id, pw}) => getDriver()
    .then(navigateToWebsite(baseUrl, id))
    .then(loginByIdPw(id, pw));

const wait = ({interval}) => (driver) => driver.sleep(interval).then(() => driver);
const navigateToCategory = (config) => (driver) => driver.get(`${config.baseUrl}/${config.id}/${config.category}`).then(() => driver);
const deletePost = ({interval}) => (driver) => driver.findElement(By.className("btn_delete")).click()
    .then(() => driver.sleep(interval))
    .then(() => driver);
const confirmDelete = (driver) => driver.switchTo().alert()
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
        .then(async (driver) => {
            while(true) {
                try {
                    const driver1 = await deletePost(config)(driver);
                    const driver2 = await confirmDelete(driver1);
                    const driver3 = await wait(config)(driver2);
                }
                catch(e) {
                    onDeleteFailed(config)(driver)(e);
                }
            }
        });


}

clean({...config, baseUrl});



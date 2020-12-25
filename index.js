const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromeDriver = require("chromedriver");
const user = require("./user.js");
const baseUrl = "https://gallog.dcinside.com";

chrome.setDefaultService(new chrome.ServiceBuilder(chromeDriver.path).build());

async function login() {
    let driver = await new Builder().forBrowser("chrome").build();

    // login
    await driver.get(`https://gallog.dcinside.com/${user.id}`);
    await driver.findElement(By.className("btn_top_loginout")).click();
    await driver.findElement(By.id("id")).sendKeys(user.id);
    await driver.findElement(By.id("pw")).sendKeys(user.pw);
    await driver.findElement(By.className("btn_wfull")).click();

    return {
        driver
    };
}

async function clean({ category }) {
    const {
        driver
    } = await login();
    let isContinue = true;

    // go to category
    driver.get(`${baseUrl}/${user.id}/${category}`);

    while (isContinue) {
        try {
            // delete
            await driver.findElement(By.className("btn_delete")).click();
            await driver.sleep(500);

            // confirm
            const alert = await driver.switchTo().alert();
            await alert.accept();

            await driver.sleep(500);
            // await driver.navigate().refresh();
        } catch (e) {
            if (e.name === "NoSuchElementError") {
                isContinue = false;
                await driver.quit();
            }
            if (e.name === "NoSuchAlertError") {
                await driver.sleep(500);
            }
            await driver.sleep(500);
        }
    }
}

async function cleanComment() {

}

clean({
    category: "posting"
    // category: 'comment'
});



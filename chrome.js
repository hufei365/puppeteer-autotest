const puppeteer = require('puppeteer');

async function run(params) {
 
const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
});
const page = await browser.newPage();
await page.goto('https://google.com');
}

run();
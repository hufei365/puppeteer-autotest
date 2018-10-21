const puppeteer = require('puppeteer');

const START_URL = 'https://www.zhihu.com/pub/reader/119570742/chapter/1033783972714803200';

const LOGIN_URL = '';

async function run(params) {
    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();

    await page.goto()
}
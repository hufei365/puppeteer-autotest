const puppeteer = require('puppeteer');

const PAGE_OPTIONS = {
    width: 1400,
    height: 900
};


async function init(){
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    page.setViewport(Object.assign({}, device.viewport, PAGE_OPTIONS));
    

    return {
        browser: browser,
        page: page
    }
}

module.exports=init;
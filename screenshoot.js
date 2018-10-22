const puppeteer = require('puppeteer');

// const HOME_URL = 'https://mp.weixin.qq.com/s/0n-YgY_zV-CrXoS8U8fQDg';
const HOME_URL = 'https://mp.weixin.qq.com/s/jJEITN52JN7yh2ttibniFg';
// const HOME_URL = 'https://zhuanlan.zhihu.com/p/29442105';

const IPHONE_X = {
    'name': 'iPhone X',
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'viewport': {
        'width': 375,
        'height': 812,
        'deviceScaleFactor': 3,
        'isMobile': true,
        'hasTouch': true,
        'isLandscape': false
    }
};

(async () => {
    const browser = await puppeteer.launch({
        // headless: false
    });
    const page = await browser.newPage();
    await page.emulate(IPHONE_X);
    await page.goto(HOME_URL);

    await page.setViewport(Object.assign({}, IPHONE_X.viewport));

    await page.waitFor(200);
    let len = 1;

    console.log(new Date());
    console.log('page loading......');
    while (len > 0) {
        len = await page.$$eval('#page-content .img_loading', (loadings) => {
            if (loadings.length) loadings[0].scrollIntoView();
            return loadings.length;
        });
        console.log(`current loading imgs count: ${len}`);
        await page.waitFor(1000);
    }
    console.log('page loaded!!');
    let result = await page.evaluate(() => {
        const scrollElement = document.querySelector('#page-content');
        const titleElem = document.querySelector('#activity-name');
        return {
            height: scrollElement.scrollHeight,
            title: titleElem.innerText
        };
    });
    await page.setViewport(Object.assign({}, IPHONE_X.viewport, result));

    console.log('start screenshootting......');
    await page.screenshot({
        path: `./output/${result.title}.jpg`
    });
    console.log('finish screenshoot');
    console.log(new Date());

    await browser.close();

})();
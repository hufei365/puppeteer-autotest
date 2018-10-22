const puppeteer = require('puppeteer');

const PAGE_OPTIONS = {
    width: 1400,
    height: 1080
};


async function init() {



    const browser = await puppeteer.launch({
        headless: false
        ,args: [
            '--window-size=1200,900'
        ]
    });
    const page = await browser.newPage();

    // page.setViewport(Object.assign({}, PAGE_OPTIONS));

    // 启用 JavaScript 和 CSS 覆盖
    await Promise.all([
        page.coverage.startJSCoverage(),
        page.coverage.startCSSCoverage()
    ]);

    // 导航至页面
    await page.goto('https://jiaoshi.okjiaoyu.cn');

    // await page.evaluate('document.documentElement.webkitRequestFullscreen()');
// await page.waitFor(5000);


    // 禁用 JavaScript 和 CSS 覆盖
    const [jsCoverage, cssCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
        page.coverage.stopCSSCoverage(),
    ]);
    let totalBytes = 0;
    let usedBytes = 0;
    const coverage = [...jsCoverage, ...cssCoverage];
    console.log(coverage);
    for (const entry of coverage) {
        totalBytes += entry.text.length;
        for (const range of entry.ranges)
            usedBytes += range.end - range.start - 1;
    }
    console.log(`Bytes used: ${usedBytes / totalBytes * 100}%`);

    return {
        browser: browser,
        page: page
    }
}

module.exports = init;
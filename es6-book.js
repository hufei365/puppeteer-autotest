const puppeteer = require('puppeteer');

const URL = 'http://es6.ruanyifeng.com/';


async function run() {
    const browser = await puppeteer.launch({
        // headless: false
    });

    const page = await browser.newPage();

    console.log(`go to ${URL}`)
    await page.goto(URL, {
        timeout: 0
    });
    await page.waitFor(1000);

    const hrefs = await page.$$eval('#sidebar ol a', (as) => {
        let arr = [];
        Array.prototype.map.call(as, async (a) => {
            arr.push(a.href);
        });
        return arr;
    });

    for(let i = 0; i< hrefs.length; i++){
        let href = hrefs[i];
        await page.goto(href);
        await page.waitFor(500);
        let title = await page.$eval('#content', content=>{
            content.querySelector('#留言').remove();
            content.querySelector('#disqus_thread').remove();
            document.body.innerHTML = content.outerHTML;
            return content.querySelector('h1').innerText;
        });

        await page.pdf({
            path: `./output/es6/${i}_${title}.pdf`
        });

    }

    console.log('to pdf finish');

    await browser.close();

}

run();
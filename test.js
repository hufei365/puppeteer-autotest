const puppeteer = require('puppeteer');

const HOME_URL = 'http://jiaoshi.okjiaoyu.cn';

const PAGE_OPTIONS = {
    width: 1920,
    height: 1080
};

const FORM = {
    USERNAME : '6160381',
    PASSWORD : 'Wuxin123'
};

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    page.setViewport(PAGE_OPTIONS);
    await page.goto(HOME_URL);
      
    await login(page);

   
    
    page.on('load', async ()=>{
        console.log(`page load ${page.url()}`);

        setTimeout(async ()=>{
            await page.click('.ui-icon-closethick');
        }, 7000);

        console.log('page closeBtn');
    });


    // user[0].value = FORM.USERNAME;
    
    // await browser.close();
})();

async function login( page ){
    let user = await page.$('#input-username');
    let pass = await page.$('#input-password');

    await user.focus();
    await user.type(FORM.USERNAME);
    await pass.focus();
    await pass.type(FORM.PASSWORD);

    await page.click('.btn-login');
}


function closeDlg(target, name, descriptor){
    let oldValue = descriptor.value;

    return function(page){
        setTimeout(async ()=>{
            await page.click('.ui-icon-closethick');
        }, 7000);

    }
}






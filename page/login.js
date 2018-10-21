
const HOME_URL = 'http://jiaoshi.okjiaoyu.cn';
const PAGE_OPTIONS = {
    width: 1400,
    height: 900
};
const FORM = {
    USERNAME : '6160381',
    PASSWORD : 'Wuxin123'
};

async function enter(browser){

    // const page = await browser.newPage();
    // page.setViewport(PAGE_OPTIONS);
    await page.goto(HOME_URL);
    await login(page);
    await page.close();

}

async function login( page ){
    let user = await page.$('#input-username');
    let pass = await page.$('#input-password');

    await user.focus();
    await user.type(FORM.USERNAME);
    await pass.focus();
    await pass.type(FORM.PASSWORD);

    await page.click('.btn-login');
}

module.exports = enter;





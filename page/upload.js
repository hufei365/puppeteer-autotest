const HOME_URL = 'https://jiaoshi.okjiaoyu.cn/resource_vm/create_bat';
const PAGE_OPTIONS = {
    width: 1400,
    height: 900
};

async function enter(browser){
    const page = await browser.newPage();
    page.setViewport(PAGE_OPTIONS);
    await page.goto(HOME_URL);
      
    await upload(page);

    return true;

}

async function upload( page ){
    // await page.click('#upload-file-btn');
}

module.exports = enter;





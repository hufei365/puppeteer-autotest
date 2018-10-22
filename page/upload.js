const HOME_URL = 'https://jiaoshi.okjiaoyu.cn/resource_vm/create_bat';
const PAGE_OPTIONS = {
    width: 1400,
    height: 900
};

async function enter(page) {

    await page.goto(HOME_URL);

    await upload(page);

    return true;

}

async function upload(page) {

    await page.waitFor(1000);
    const input = await page.$('#drop-file-section input');

    if (input) await input.uploadFile('./output/1.jpg');

   
    await page.waitForSelector('.uploaded-panel', {
        visible: true
    }).then(async () => {
        let resName = await page.$('input.resource-name');
        await resName.focus();
        await resName.type(String(+new Date()));

        await page.click('.chapter-container .drop-menu-input');
        await page.click('.drop-menu-list .menu-item:nth-child(2)');

        await page.click('.resource-type-box label');

        page.click('.add-res-btn');
        console.log('clicked add btn');

        const firstResponse = await page.waitForResponse('https://jiaoshi.qa-hotfix.xk12.cn/resource/res_create_bat');
        console.log(`sdkfj : === ${firstResponse.ok()}`);
    });


}

module.exports = enter;
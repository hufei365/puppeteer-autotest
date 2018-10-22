
const tasks = require('./tasks.js');
const init = require('./init.js');



(async function() {
    console.log('start auto test ......\n\n');

    const {browser, page} = await init();

    // for(let task of tasks){
    //     console.log(`start ${task.name} test\n`);
    //     await task.do(page);
    // }

    await browser.close();
    
})();


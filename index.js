
const tasks = require('./tasks.js');
const init = require('./init.js');



(async function() {
    console.log('start auto test ......\n\n');

    const {browser, page} = await init();

    let iter = tasks;

    

    await tasks[0].do(browser);

    // await tasks[1].do(browser);

    // for(let task of tasks){

    //     console.log(`start ${task.name} test\n`);
    //     await task.do();

    // }
    
})();

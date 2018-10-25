const mongoose = require('mongoose');
const chalk = require('chalk');



mongoose.connect('mongodb://localhost/movies', ()=>{
    console.log(chalk.green('link mongodb success'));
});

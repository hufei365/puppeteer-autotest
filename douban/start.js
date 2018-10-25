const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const URL = 'https://movie.douban.com/subject_search?cat=1002&search_text=';

const movies = ['历史的天空', '士兵突击', 'sdasldie', '复仇者联盟'];

const results = [];

const rootDir = process.argv[2] || __dirname;

async function run() {

    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();

    await walk();
    console.log('end');
    // await browser.close();

    async function walk() {

        for (let movie of movies) {
            await page.goto(URL + encodeURIComponent(movie));

            let _r = await Promise.race([page.waitForSelector('.item-root'), page.waitForSelector('.sc-dnqmqq')]);

            let href = await _r.$('a');
            if (!href) {
                continue;
            } else {
                await _r.click('a');
                await page.waitForNavigation();
                
            }

            let data = await page.$eval('.subjectwrap', async (item)=>{
                    let [country, ...tmps] = item.querySelector('.meta').innerText.replace(/ /g, '').split('/');
                let [duration, ...tags] = tmps.reverse();
                return {
                    name: item.querySelector('.title a').innerText,
                    img: item.querySelector('img').src,
                    country: country,
                    tags: tags,
                    duration: duration
                }
            })

            // let data = await page.$eval('.item-root', async (item) => {
            //     let [country, ...tmps] = item.querySelector('.meta').innerText.replace(/ /g, '').split('/');
            //     let [duration, ...tags] = tmps.reverse();
            //     return {
            //         name: item.querySelector('.title a').innerText,
            //         img: item.querySelector('img').src,
            //         country: country,
            //         tags: tags,
            //         duration: duration
            //     }
            // });
            results.push(data);
        }

        console.log(results);

    }

}

async function save() {

    const Movie = mongoose.model('Movie', {
        name: String,
        duration: String,
        tags: String,
        country: String,
        img: String
    });

    // const movie = new Movie({ name: 'Zildjian' });
    // movie.save().then(() => console.log('meow'));
}

async function getMovies(dir) {

    if (await isDir(dir)) {
        let files = await promisitify(fs.readdir, dir);

        for (let file of files) {
            if (await isDir(path.join(dir, '/' + file))) {
                getMovies(path.join(dir, '/' + file))
            } else {
                movies.push(file);
            }
        }
    }
}



async function isFile(path) {
    let stats = await promisitify(fs.stat, path);
    return stats.isFile()
}

async function isDir(path) {
    let stats = await promisitify(fs.stat, path);
    return stats.isDirectory()
}

function promisitify(fn, path) {
    return new Promise(function (resolve, reject) {
        fn(path, (err, data) => {
            if (err) reject(err);

            resolve(data);
        })
    })
}

// (async function () {
//     console.log(await getMovies('.'));
//     // let data = await promisitify(fs.readFile, path.resolve('./db.js'));
//     // console.log(data.toString());
//     // console.log(await isDir('..'));
//     // console.log(await isFile('./db.js'));
// })()

run();

//TODO: 计划加入机器学习的内容，进行名称鉴别 
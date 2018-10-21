const http = require('http');


const server = require('http').createServer((req, res)=>{

});





server.listen(3000, ()=>{
    console.log('server has started......');
});



function getParams(url){

    url = String(url);
    
    if(!url || url.indexOf('?') === -1 ){
        return '';
    }

    console.log(` URL is : [${url}]`);
    let query = /\w+\?url=(\w)/g.exec(url)[1];
    console.log(`target URL is : [${query}]`);

    return query;
}
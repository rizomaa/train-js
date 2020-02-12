const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');

const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {
    
    const pathName = url.parse(req.url, true).pathname;
    
    console.log(url.parse(req.url, true));
    
    const id = url.parse(req.url, true).query.id;
    
    //console.log(url);
    
    // PRODUCTS OVERVIEW
    if (pathName === '/products' || pathName === '/') {
        
        res.writeHead(200, {'Content-type': 'text/html'});
        
        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
          
            let overviewOutput = data;
            
            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
          
                const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join('');
                
                overviewOutput = overviewOutput.replace(/{%CARDS%}/g, cardsOutput);
                
                //console.log(cardsOutput);
                
                res.end(overviewOutput);
            
            });
            //res.end(data);            
        });
                
    // LAPTOP PAGE
    } else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, {'Content-type': 'text/html'});
        
        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            
            const laptop = laptopData[id];            
            const output = replaceTemplate(data, laptop);
            res.end(output);            
        });
        
    // IMAGES ROUTE
    } else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
        
        fs.readFile(`${__dirname}/data/img/${pathName}`, (err, data) => {
            res.writeHead(200, {'Content-type': 'image/jpg'});
            res.end(data);
    // IMAGES ROUTE
            
        });
        //console.log(pathName);
               
    //There is no page 
    } else {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end('Page are not found on server');
    }
    
    //console.log('Someone did access to the server');
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for request now!!!');
});

function replaceTemplate(originalHTML, laptop) {
    let output = originalHTML.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);

    return output;
}


//console.log(__dirname);
//console.log(laptopData);
const path = require('path');
const fs = require('fs');
const {stdout} = require('process');

const txt = path.join(__dirname, 'text.txt');

fs.createReadStream(txt,'utf8').pipe(stdout);
// fs.createReadStream(txt).on('data', chunk => console.log(chunk.toString()));


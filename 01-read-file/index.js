const path = require('path');
const fs = require('fs');

const txt = path.join(__dirname, 'text.txt');

fs.createReadStream(txt).pipe(process.stdout);
// fs.createReadStream(txt).on('data', chunk => console.log(chunk.toString()));


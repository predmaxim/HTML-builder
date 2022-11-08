const path = require('path');
const fs = require('fs');
const process = require('process');

const outputFile = path.join(__dirname, 'output.txt');
const writeStream = fs.createWriteStream(outputFile);

const hello = () => console.log('Hello! please, enter your text below:');
const goodbye = () => {
  console.log(`\nGoodbye!, your data in ${outputFile}`);
  writeStream.end();
  process.exit();
};

process.stdin.write('', hello);
process.on('SIGINT', goodbye);

process.stdin.on('data', (data) => data.toString().match(/exit(.)*\n/g) ? goodbye() : writeStream.write(data));
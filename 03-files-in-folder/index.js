const path = require('path');
const fs = require('fs/promises');

const secretDir = path.join(__dirname, 'secret-folder');

const getFiles = (dirPath) => fs.readdir(dirPath, { withFileTypes: true });
const getFileSize = (filePath) => fs.stat(filePath, (err, file) => err ? console.log(err) : file.size);

getFiles(secretDir).then(filesStats =>

  filesStats.map(el => {

    const fileName = el.name.slice(0, el.name.lastIndexOf('.'));
    const filePath = path.join(secretDir, el.name);
    const isFile = el.isFile();
    const fileExt = path.extname(el.name).slice(1);

    if (isFile) {
      return getFileSize(filePath).then(stats =>
        console.log( `${fileName} - ${fileExt} - ${stats.size / 1024} kb` )
      );
    }

  }));

const path = require('path');
const fs = require('fs/promises');

const secretDir = path.join(__dirname, 'secret-folder');

const getFiles = (dirPath) => fs.readdir(dirPath, { withFileTypes: true });
const getFileSize = (filePath) => fs.stat(filePath, (err, file) => file);

getFiles(secretDir).then(filesStats =>

  filesStats.map(el => {

    const fileName = el.name.slice(0, el.name.lastIndexOf('.') === -1
      ? el.name.length
      : el.name.lastIndexOf('.'));

    const filePath = path.join(secretDir, el.name);
    const isFile = el.isFile();

    const fileExt = path.extname(el.name)
      ? path.extname(el.name).slice(1)
      : 'none';

    if (isFile) {

      return getFileSize(filePath)
        .then(stats =>
          console.log(`${fileName} - ${fileExt} - ${stats.size > 1024
            ? stats.size / 1024 + ' kb'
            : stats.size + ' b'}`)
        );

    }

  }));

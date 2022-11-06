
const path = require('path');
const { readdir } = require('fs/promises');
const { rm, mkdir, copyFile } = require('fs');

const dir = path.join(__dirname, 'files');
const dirToCopy = `${dir}-copy`;

const getFilesData = (dirPath) => readdir(dirPath, { withFileTypes: true });

const copyDir = (dir, dirToCopy) => {

  const copyDirMessage = (err, fileName) => err
    ? console.log(err.message)
    : console.log(`OK: file '${path.basename(dir)}/${fileName}' copied to '${path.basename(dirToCopy)}/${fileName}'`);

  const mkDirMessage = (err) =>
    err && err.code === 'EEXIST'
      ? console.log(`EEXIST: directory allready exist, copydir '${dir}' -> '${dirToCopy}'`)
      : false;

  rm(dirToCopy, { recursive: true, force: true }, () => {

    mkdir(dirToCopy, { recursive: false }, (err, path) => {
      mkDirMessage(err, path);
    });

    getFilesData(dir).then(filesData => {
      for (const fileData of filesData) {

        copyFile(
          `${dir}/${fileData.name}`,
          `${dirToCopy}/${fileData.name}`,
          (err) => copyDirMessage(err, fileData.name)
        );

      }
    });

  });

};

copyDir(`${dir}/`, `${dirToCopy}/`);

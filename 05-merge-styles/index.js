const path = require('path');
const { readdir } = require('fs/promises');
const { rm, readFile, appendFile } = require('fs');

const stylesDir = path.join(__dirname, 'styles');
const projectDir = path.join(__dirname, 'project-dist');
const bundleCss = path.join(projectDir, 'bundle.css');

// Чтение содержимого папки styles
const getFilesInDir = (dirToView) => {
  return readdir(dirToView, { withFileTypes: true });
};


// Проверка является ли объект файлом и имеет ли файл нужное расширение
const getFilesWithExt = (dirToCheck, fileExtToCheck) => {

  const res = [];

  for (const el of dirToCheck) {
    if (el.isFile() && path.extname(el.name).slice(1) === fileExtToCheck) {
      res.push(el);
    }
  }

  return res;
};


const setBundle = async (dir, filePathForWrite) => {

  const allFiles = await getFilesInDir(dir);
  const filesWithExt = getFilesWithExt(allFiles, 'css');

  filesWithExt.forEach((file) => {

    const filePathForRead = path.join(stylesDir, file.name);

    rm(filePathForWrite, () => {
      readFile(filePathForRead, (err, filePathForReadContent) => {
        if (err) throw err;
        appendFile(filePathForWrite, filePathForReadContent, () => { });
      });
    });

  });
};


setBundle(stylesDir, bundleCss);

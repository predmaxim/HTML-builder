const path = require('path');
const { readdir } = require('fs/promises');
const { rm, readFile, appendFile } = require('fs');

const stylesDir = path.join(__dirname, 'styles');
const projectDir = path.join(__dirname, 'project-dist');
const bundleCss = path.join(projectDir, 'bundle.css');

const getFilesWithExt = (dirToCheck, fileExtToCheck) => {

  return dirToCheck.filter(el => {
    return el.isFile() && path.extname(el.name).slice(1) === fileExtToCheck;
  });

};

const createBundle = async (dir, fileForWritePath) => {

  const allFiles = await readdir(dir, { withFileTypes: true });
  const filesWithExt = getFilesWithExt(allFiles, 'css');

  filesWithExt.forEach((file) => {

    const fileForReadPath = path.join(stylesDir, file.name);

    rm(fileForWritePath, () => {
      readFile(fileForReadPath, (err, content) => {
        if (err) throw err;
        appendFile(fileForWritePath, content, () => { });
      });
    });

  });
};

createBundle(stylesDir, bundleCss);

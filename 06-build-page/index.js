const { mkdir, readFile, readdir, appendFile, copyFile, rm } = require('fs/promises');
const path = require('path');

const createProjectDir = async (dir) => {
  const projectDir = path.join(__dirname, dir);
  await rm(projectDir, { recursive: true, force: true });
  await mkdir(projectDir, { recursive: true });
};

const getFilesWithExt = (dirToCheck, fileExtToCheck) => {
  return dirToCheck.filter(el => {
    return el.isFile() && path.extname(el.name).slice(1) === fileExtToCheck;
  });
};

const createHTML = async () => {
  const templatePath = path.join(__dirname, 'template.html');
  const htmlPath = path.join(__dirname, 'project-dist', 'index.html');
  const componentsPath = path.join(__dirname, 'components');

  let template = await readFile(templatePath, 'binary');
  const componentsPathDir = await readdir(componentsPath, { withFileTypes: true });
  const components = await getFilesWithExt(componentsPathDir, 'html');

  for (let component of components) {

    const componentName = (component.name).split('.')[0];
    if (template.replace(/\s/g, '').includes(`{{${componentName}}}`)) {
      const componentPath = path.join(componentsPath, `${componentName}.html`);
      const componentContent = await readFile(componentPath);
      template = template.replace(`{{${componentName}}}`, componentContent);
    }
  }

  await appendFile(htmlPath, template);
};

const createCSS = async () => {
  const cssPath = path.join(__dirname, 'styles');
  const cssDirData = await readdir(cssPath, { withFileTypes: true });
  const target = path.join(__dirname, 'project-dist', 'style.css');

  const filesData = await getFilesWithExt(cssDirData, 'css');

  for (const fileData of filesData) {
    const filePath = path.resolve(cssPath, fileData.name);
    const fileContent = await readFile(filePath, 'binary');

    await appendFile(target, fileContent);
  }
};

const copyAssets = async function (from, to) {
  try {

    await mkdir(to, { recursive: true });

    const files = await readdir(from, { withFileTypes: true });
    for (let file of files) {
      if (file.isDirectory()) {
        copyAssets(
          path.join(from, file.name),
          path.join(to, file.name)
        );
      } else {
        await copyFile(
          path.join(from, file.name),
          path.join(to, file.name)
        );
      }
    }
  } catch (err) { console.log(err); }
};

const createProject = async () => {

  await createProjectDir('project-dist');
  await createHTML();
  await createCSS();
  await copyAssets(
    path.join(__dirname, 'assets'),
    path.join(__dirname, 'project-dist', 'assets')
  );

};

createProject();
const fs = require('fs');
const path = require('path');

module.exports = function createSmart(dirName, componentName) {
    const stylesName = `${componentName.substr(0, 1).toLowerCase()}${componentName.substr(1)}`;
    const storeName = `${componentName}Store`;

    fs.mkdirSync(path.join(dirName, componentName), '0744');

    fs.readFile(path.join(__dirname, 'templates', 'smart.template'), 'utf-8', (err, data) => {
        if (err) return console.error(err.message);

        const file = data
            .replace(/{{componentName}}/g, componentName)
            .replace(/{{stylesName}}/g, stylesName)
            .replace(/{{storeName}}/g, storeName);

        fs.writeFile(path.join(dirName, componentName, `${componentName}.tsx`), file, err => { if (err) console.error(err.message) });
    });

    fs.readFile(path.join(__dirname, 'templates', 'store.template'), 'utf-8', (err, data) => {
        if (err) return console.error(err.message);

        const file = data.replace(/{{storeName}}/g, storeName);

        fs.writeFile(path.join(dirName, componentName, `${storeName}.ts`), file, err => { if (err) console.error(err.message) });
    });

    const readStyles = fs.createReadStream(path.join(__dirname, 'templates', 'styles.template'));
    const writeStyles = fs.createWriteStream(path.join(dirName, componentName, `${stylesName}.scss`));
    readStyles.pipe(writeStyles);
};
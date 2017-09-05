const dirName = process.cwd();
const componentName = process.argv[2];
const flag = process.argv[3];
const isSmart = !!flag && (flag === '-s' || flag === '--smart');

const creator = isSmart
    ? require('./smart')
    : require('./stupid');

creator(dirName, componentName);
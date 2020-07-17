const testFolder = '../gite';
const fs = require('fs');

fs.readdir(testFolder,(error, files) => {
console.log(files)
});
const fs = require('fs');
fs.readFile('prac.txt', 'utf8',function(err,data){
    console.log(data);
})
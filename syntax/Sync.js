let fs = require('fs');

//readFileSync


/*
console.log('start');

let result = fs.readFileSync('Sync_sample.txt','utf-8'); //여기서 경로는 내가 cmd로
                                                         //실행하는 위치 기준
//let result = fs.redaFileSync('syntax/Sync_sample.txt','utf-8');
console.log(result);
console.log('return0');
*/

console.log('start');
//이거는 함수로 리턴을 해주기 때문에 변수 필요X
fs.readFile('syntax/Sync_sample.txt','utf-8',(error,result) => {
    console.log(result);
})
console.log('return0');  //비동기 작동
/*
function a(){
    console.log('A');
}*/

let a = function(){
    console.log('A')
}

function slowfunc(callback){
    callback();
}

slowfunc(a); //a는 함수이므로 callback함수인 a가 실행이된다.
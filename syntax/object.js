let role = {
    'programer' : '경태',
    'designer' : '누물보',
    'manager' : '누군가'
}
console.log(role.programer);

for(let name in role){
    console.log('object = ',name, '\n name = ', role[name]); //키 값과 value 값
}

let f = () => {
    console.log(2)
    console.log(3)
}

let a = [f];
a[0]();

var o = {
    func : f
}
o.func();

let q ={
    v1 : 'v1',
    v2 : 'v2',
    f1 : () => {
        console.log(this.v1);
    },
    f2 : () => {
        console.log(this.v2);
    }
}

q.f1;
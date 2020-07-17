let http = require('http');
let cookie = require('cookie')

http.createServer(function (request, response) {
    console.log(request.headers.cookie)
    let cookies = [];
    if (request.headers.cookie !== undefined) {
        cookies = cookie.parse(request.headers.cookie); //parse는 undefined시 못찾아서 에러가 남.
    }
    console.log(cookies.yummy_cookie)
    response.writeHead(200, {
        'Set-Cookie': [
        'yummy_cookie=choco',
        'tasty_cookie=strawberry; Secure',
        `Permanent=cookies; Max-Age=${60*60*24*30}`,
        'Secure=Secure; Secure',
        'HttpOnly=HttpOnly; HttpOnly', //HTTP로서만 보임, javascript로 cookie값 추출 못함
        'Path=Path; Path=/cookie', //하위 디렉토리 cookie에서 cookie가 활성
        'Domain=Domain; Domain=koo.net'
    ]
    })
    response.end('Cookie!');
}).listen(3000);
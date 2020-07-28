let express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression')
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var authorRouter = require('./routes/author');
var serchRouter = require('./routes/serch');
var authIsOwner = require('./lib/authLogin');

var cookie = require('cookie');
var helmet = require('helmet');
app.use(helmet());

app.use(compression());//Content-Encoding: gzip zip으로 압축하고 보내고 웹브라우저는 해제해서 사용
                      //데이터 트레픽 줄음
app.use(bodyParser.urlencoded({ extended: false }));//form data는 이런형식
                                                  //미들웨어 표시
                                                  //post 데이터를 내부적으로 분석해서
                                                  //모든데이터를 가져온 다음에
                                                  //경로에 해당되는 callback을 호출함
                                                  //첫번째 인자인 req 뒤 body를 만들어줌


app.get('*',function(req,res,next){ // *로 get으로 들어오는 모든 함수에 적용한다.
  fs.readdir('./data', function (error, filelist) {
  req.list = filelist;
  next(); //다음 middleware를 동작하게 결정 한다. 
  }) //함수를 또 작성할 수 있음. if로 어떤 미들웨어가 실행될지 조건을 걸 수도있다.
}) //middleware 작성 application-level middleware (use, get)

app.use(express.static('public')); //public 디렉토리 안에서 static 파일을 찾겠다. public 디렉토리 안을 
                                    //url 방식으로 접근하고, public을 제외한 다른곳에는
                                    //접근이 불가능하기에 안전하기도 하다.

const port = 3000;

app.use('/',indexRouter);
app.use('/login',loginRouter);
app.use('/topic',topicRouter);
app.use('/author',authorRouter);
app.use('/serch',serchRouter);

app.use(function(req,res,next){
  res.status(404).send('Sorry you wrong')
})

app.use(function (err, req, res, next) { //err인자 값이 있을시 호출
  console.error(err.stack)
  res.status(500).send('Something broke! (ex. address wrong)')
});

app.listen(port, () => console.log(`Project app listening on port ${port}!`))
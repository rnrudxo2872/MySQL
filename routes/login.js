var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');
var authIsOwner = require('../lib/authLogin');
var cookie = require('cookie');


router.get('', (req, res) => {
  title = `login`;
  var list = template.list(req.list, ``);
  var IsOwner = authIsOwner.IsOwner(req,res);
  console.log(IsOwner);
  var html = template.control_HTML(title, list, `<div id="article">
    <h2>${title}</h2>
    <form action="/login/login_process" method="post">
    <p><input type="text" name="email" placeholder="email"></p>
    <p><input type="password" name="password" placeholder="password"></p>
    <p><input type="submit"></p>
    <p><a href="/sign_up">sign_up</a></p>
    </form>
  </div>`)

  res.send(html);

}) //route,routing 갈림길에서 적당한 응답을 해주는 역할


router.post('/login_process', (req, res) => {
  var post = req.body;
  var id = post.id;
  if(post.email === 'rnrudxo@gmail.com' && post.password === '111111') {
    res.writeHead(302, {
      'Set-Cookie':[
        `email=${post.email}`,
        `password=${post.password}`,
        `nickname=Koo`
      ],
      Location:`/`
    })
    res.end();
  }else{
    res.end('who');
  }
})
module.exports = router;
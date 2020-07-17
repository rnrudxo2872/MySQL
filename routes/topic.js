var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');
var authIsOwner = require('../lib/authLogin');
var cookie = require('cookie');

router.get('/page_create', (req, res) => {
  var IsOwner = authIsOwner.IsOwner(req,res);
  console.log(IsOwner);
    title = `WEB - create`;
    let descrip = '안녕? 경태페이지란다';
    var list = template.list(req.list, ``);
    var html = template.control_HTML(title, list, `<form action="/topic/create_process" method="POST">
    <p><input type="text" name="title" placeholder="title"></p>
    <p>
        <textarea name="description" id="" cols="30" rows="10" placeholder="discription"></textarea>
    </p>
    <p>
        <input type="submit">
    </p>
  </form>`)
  
    res.send(html);
  })
  
  router.post('/create_process', (req, res) => {
  /*var body = '';
  req.on('data', function (data) {
    body += data; //조각조각 데이터가 들어옴
  })
  req.on('end', function () {
    var post = qs.parse(body);
    title = post.title;
    description = post.description;
    fs.writeFile(`./data/${title}`, description, (err) => {
      res.redirect(302, `/page/${title}`) //redirect과정 = res.writeHead(302, {Location: `/page/${title}) 
      res.end();
    })
  })*/
  var post = req.body;
  title = post.title;
  description = post.description;
  fs.writeFile(`./data/${title}`, description, (err) => {
    res.redirect(302, `/topic/${title}`) //redirect과정 = res.writeHead(302, {Location: `/page/${title}) 
    res.end();
  })
  })
  
  router.get('/updata/:pageId', (req, res) => {
    title = req.params.pageId;
    filleredId = path.parse(req.params.pageId).base;
    list = template.list(req.list, ``);
    fs.readFile(`data/${filleredId}`, 'utf8', function (err, descrip) {
      var html = template.control_HTML(title, list, `<form action="/updata_process" method="POST">
        <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
            <textarea name="description" id="" cols="30" rows="10" placeholder="discription">${descrip}</textarea>
        </p>
        <p>
            <input type="submit">
        </p>
    </form>`)
  
      res.send(html);
    });
  })
  
  router.post('/updata_process', (req, res) => {
  /*var body = '';
  req.on('data', function (data) {
    body += data;
  })
  req.on('end', function () {
    var post = qs.parse(body);
    title = post.title;
    var id = post.id;
    description = post.description;
    fs.rename(`./data/${id}`, `./data/${title}`, (err) => {
      fs.writeFile(`./data/${title}`, description, 'utf8', (err) => {
        res.redirect(302,`/page/${title}`); //redirect
        res.end();
      })
    })
  })*/
  var post = req.body;
    title = post.title;
    var id = post.id;
    description = post.description;
    fs.rename(`./data/${id}`, `./data/${title}`, (err) => {
      fs.writeFile(`./data/${title}`, description, 'utf8', (err) => {
        res.redirect(302,`/topic/${title}`); //redirect
        res.end();
      })
    })
  })
  
  router.post('/delete_process',(req,res) => {
    /*var body = '';
    req.on('data', function (data) {
      body += data;
    })
    req.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      filleredId = path.parse(id).base;
      fs.unlink(`data/${id}`, (err) => {
        res.redirect(302,`/`);
        res.end();
      })
    })*/
    var post = req.body;
    var id = post.id;
    filleredId = path.parse(id).base;
    fs.unlink(`data/${id}`, (err) => {
      res.redirect(302,`/`);
      res.end();
    })
  })
  
  
  router.get('/:pageId', (req, res, next) => {
      title = req.params.pageId;
      let filleredId = path.parse(req.params.pageId).base; //return confirm 해야지 false 시 페이지가 안넘어감
      list = template.list(req.list, `<a href="/topic/page_create">create</a><br>
                                  <a href="/topic/updata/${title}">updata</a><br>
                                  <form action="/topic/delete_process" method="POST" onsubmit="return confirm('정말로 삭제하시겠습니까?')">
                                  <input type="hidden" name="id" value="${title}">
                                  <input type="submit" value="delete">
                                  </form>`);
      fs.readFile(`data/${filleredId}`, 'utf8', function (err, descrip) {
        if(err){
          next(err);
        }else{
          let sanitizedTitle = sanitizeHtml(title);
          let sanitizedDiscript = sanitizeHtml(descrip, {
            allowedTags: ['h1', 'h2'] //여기 허락된 태그는 sanitize(살균)를 안한다.
          }, {
            allowedIframeHostnames: ['www.youtube.com']
          });
          var html = template.HTML(sanitizedTitle, list, `<div id="article">
          <img src="/images/${sanitizedTitle}.jpg" alt="" style="width:300px; display:block; margin-bottom: 5px;">
          <h2>${sanitizedTitle}</h2>
          <p>
          ${sanitizedDiscript}
         </p>
        </div>`)
          console.log(sanitizedTitle)
          res.send(html)
      }
    }) 
  });

  module.exports = router;
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');//create 혹은 update시 코드를 입력하여 에러 발생 방지.
var template = require('../lib/template.js');
var authIsOwner = require('../lib/authLogin');
var cookie = require('cookie');
var db = require('../lib/db.js');
var sortdb = require('../lib/resortdb.js');
const multer = require('multer');
const _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
})
const upload = multer({storage : _storage });

router.get('/page_create', (req, res) => {
  var IsOwner = authIsOwner.IsOwner(req, res);
  console.log(IsOwner);
  title = `WEB - create`;
  db.query('select * from topic', function (error, topics) {
    db.query('select * from author', function (error2, authors) {
      var list = template.list(topics, ``);
      var html = template.control_HTML(title, list, `<form action="/topic/create_process" method="POST" enctype="multipart/form-data">
    <p><input type="text" name="title" placeholder="title"></p>
    <p>
        <textarea name="description" id="" cols="30" rows="10" placeholder="discription"></textarea>
    </p>
    ${template.author_list(authors)}
    <p>
    <input type="file" name="image">
    </p>
    <input type="submit">
  </form>`)

      res.send(html);
    })
  })
})

router.post('/create_process', upload.single('image'), (req, res) => {
  var post = req.body;
  console.log(post);

  db.query(`INSERT INTO topic (title, description, created, author_id) 
  VALUES(?, ?, NOW(),?)`, [post.title, post.description, post.author], function (error, result) {
    if(error){
      throw error;
    }
    res.redirect(302, `/topic/${result.insertId}`) //redirect과정 = res.writeHead(302, {Location: `/page/${title}) 
    res.end();
  })
})

router.get('/updata/:pageId', (req, res) => {
  db.query('select * from topic', function (error, topics) {
    if (error) {
      throw error;
    }
    db.query('select * from topic where id = ?', [req.params.pageId], function (error2, topic) {
      if(error2){
        throw error2;
      }
      db.query('select * from author', function (error3, authors) {
        if(error3){
          throw error3;
        }
        list = template.list(topics, ``);
        var html = template.control_HTML(topic[0].title, list, `<form action="/topic/updata_process" method="POST">
          <input type="hidden" name="id" value="${topic[0].id}">
          <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
          <p>
              <textarea name="description" id="" cols="30" rows="10" placeholder="discription">${topic[0].description}</textarea>
          </p>
          ${template.author_list(authors,topic[0].author_id)}
          <p>
              <input type="submit">
          </p>
      </form>`)
        res.send(html);
      })
    })
  })
})

router.post('/updata_process', (req, res) => {
  var post = req.body;
  title = post.title;
  db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`, [post.title, post.description, post.author, post.id], function (error, result) {
    res.redirect(302, `/topic/${post.id}`) //redirect과정 = res.writeHead(302, {Location: `/page/${title}) 
    res.end();
  })
})

router.post('/delete_process', (req, res) => {

  var post = req.body;
  // fs.unlink(`data/${id}`, (err) => {
  // res.redirect(302,`/`);
  // res.end();
  // })
  fs.unlinkSync(`public/images/${post.title}.jpg`);
  db.query('select * from topic', function (error, topic) {
    db.query('DELETE FROM topic WHERE id=?', [post.id], function (error, result) {
      let length = topic.length;
      //fs.unlinkSync('/pu')
      sortdb.query('SET @cnt = 0;' +
        'UPDATE topic SET topic.id = @cnt:=@cnt+1;' +
        'alter table topic auto_increment=?;', [length],
        function (error2, reresult) {
          res.redirect(302, `/`);
          res.end();
        })
    })
  })
})


router.get('/:pageId', (req, res, next) => {
  db.query('select * from topic', function (error, topics) {
    if (error) {
      throw error;
    }
    db.query('SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id=?', [req.params.pageId], function (error2, topic) {
      title = topic[0].title;
      //let filleredId = topic[0].title; //return confirm 해야지 false 시 페이지가 안넘어감
      list = template.list(topics, `<a href="/topic/page_create">create</a><br>
                                    <a href="/topic/updata/${req.params.pageId}">updata</a><br>
                                    <form action="/topic/delete_process" method="POST" onsubmit="return confirm('정말로 삭제하시겠습니까?')">
                                    <input type="hidden" name="id" value="${req.params.pageId}">
                                    <input type="hidden" name="title" value="${title}">
                                    <input type="submit" value="delete">
                                    </form>`);


      let sanitizedTitle = sanitizeHtml(title);
      let sanitizedDiscript = sanitizeHtml(topic[0].description, {
        allowedTags: ['h1', 'h2'] //여기 허락된 태그는 sanitize(살균)를 안한다.
      }, {
        allowedIframeHostnames: ['www.youtube.com']
      });
      var html = template.HTML(sanitizedTitle, list, `<div id="article">
            <img src="/images/${sanitizedTitle}.jpg" alt="Nonexistent" style="width:300px; display:block; margin-bottom: 5px;">
            <h2>${sanitizedTitle}</h2>
            <p>
            ${sanitizedDiscript}
           </p>
           <p>
           <span style="color:white;border:1px solid aquamarine;border-radius:10%;background-color: coral;opacity: 0.5;">by ${topic[0].author}</span>
           </p>
          </div>`)
      console.log(sanitizedTitle)
      res.send(html)
    })
  })
});

module.exports = router;
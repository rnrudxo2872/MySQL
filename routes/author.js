var express = require('express');
var router = express.Router();
var db = require('../lib/db.js')
var template = require('../lib/template.js');
var sanitizeHtml = require('sanitize-html');

router.get('', (req, res) => {
    db.query('select * from topic', function (error, topics) {
      if (error) {
        throw error;
      }
      db.query('select * from author', function (error2, authors) {
        title = `Author List`;
        list = template.list(topics, `<a href="/topic/page_create">create</a>`);
  
  
        let sanitizedTitle = sanitizeHtml(title);

        var html = template.HTML(sanitizedTitle, list, `
        <div id="article">
        <h2>${sanitizedTitle}</h2>
        <p>
        ${template.author_list_table(authors)}
        </p>
        <p>
        <a href="/author/create" style="color: lightgrey;border:1px solid aquamarine;
        border-radius:10%;background-color: steelblue;opacity: 0.5;">
        저자 추가
        </a>
        </p>
        </div>
        `)
        console.log(sanitizedTitle)
        res.send(html)
      })
    })
});

router.get('/create',(req,res) =>{
    db.query('select * from topic', function (error, topics) {
        if (error) {
          throw error;
        }
          title = `Author Add`;
          list = template.list(topics, `<a href="/topic/page_create">create</a>`);
    
          let sanitizedTitle = sanitizeHtml(title);
  
          var html = template.HTML(sanitizedTitle, list, `
          <div id="article">
          <h2>${sanitizedTitle}</h2>
          <p>
          ${template.author_create()}
          </p>
          </div>
          `)
          console.log(sanitizedTitle)
          res.send(html)
      })
});

router.post('/create_process',(req,res) => {
    var post = req.body;

    db.query(`INSERT INTO author (author, profile) 
    VALUES(?, ?)`, [post.author, post.profile], function (error, result) {
      res.redirect(302, `/author`) //redirect과정 = res.writeHead(302, {Location: `/page/${title}) 
      res.end();
    })
});

router.get('/update/:authorId',(req,res) =>{
    
    db.query(`select * from topic`,function(error,topics){
        db.query(`select * from author where id=?`,[req.params.authorId],function(error2,author){
            list = template.list(topics, ``);
            var html = template.control_HTML('Author_update', list, `<form action="/author/updata_process" method="POST">
              <input type="hidden" name="id" value="${author[0].id}">
              <p>
              <input type="text" name="author" placeholder="author name" value="${author[0].author}">
              </p>
              <p>
              <input type="text" name="profile" placeholder="information" value="${author[0].profile}">
              </p>
              <p>
                  <input type="submit">
              </p>
          </form>`)
    
            res.send(html);
        })
    })
});

router.post('/updata_process',(req,res) => {
    let post = req.body;
    
    db.query(`UPDATE author SET author=?, profile=? where id=?`,[post.author,post.profile,post.id],function(error,result){
       res.redirect(302,`/author`);
       res.end(); 
    })
})

router.post('/delete_process',(req,res) =>{
    let post = req.body;
    console.log("delelelelel")
    db.query('select * from author', function (error, authors) {
        db.query('DELETE FROM author WHERE id=?', [post.id], function (error, result) {
          let length = authors.length;
          db.query('SET @cnt = 0;' +
            'UPDATE author SET author.id = @cnt:=@cnt+1;' +
            'alter table author auto_increment=?;', [length],
            function (error2, reresult) {
              res.redirect(302, `/author`);
              res.end();
            })
    
        })
      })
})

module.exports = router;
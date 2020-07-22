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

module.exports = router;
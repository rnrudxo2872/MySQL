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
        </div>
        `)
        console.log(sanitizedTitle)
        res.send(html)
      })
    })
});

module.exports = router;
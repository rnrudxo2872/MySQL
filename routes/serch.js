var express = require('express');
var router = express.Router();
var template= require('../lib/template');
var db = require('../lib/db.js');

router.get('', (req, res) => {
    let word = req.query.title;
    //word = '%' + word + '%'
    
    db.query('SELECT * FROM topic',function(error, topics){
        let ds = db.query('SELECT * FROM (select * from topic where title REGEXP ?)topic LEFT JOIN author ON topic.author_id = author.id;',[word],function(serch_error,result){
            
            console.log(ds.sql);
            let list = template.list(topics,'<a href="/topic/page_create">create</a>');
        var html = template.control_HTML('', list, `<div id="article">
            <h2>검색 결과</h2>
            
            <p>
            <table class="type09">
            <thead>
            <tr>
                <th scope="cols">Title</th>
                <th scope="cols">Author</th>
                <th scope="cols">Create</th>
            </tr>
            </thead>
            <tbody>
            ${template.serch_result(result)}
            </tbody>
        </table>
           </p>
          </div>`)
          console.log(topics)
      res.send(html)
    
        })
    })
    
    
})

module.exports = router;
module.exports = { //refactoring
  HTML: function (title, list, temp_body) {
    return `<!doctype html>
    <html>
    <head>
      <title>경태 페이즤 - ${title} </title>
      <meta charset="utf-8">
      <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-125138219-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'UA-125138219-1');
    </script>
    
    <style>
    input[type="submit"]{
      height: 30px; /* 높이값 초기화 */ 
      line-height : normal; /* line-height 초기화 */ 
      padding: .0em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */ 
      font-family: inherit; /* 폰트 상속 */ 
      background-color: #af95c5;
      border: 1px solid #999; 
      border-radius: 20px; /* iSO 둥근모서리 제거 */
      text-align: center; 
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
    a{
      color:black;
      text-decoration:none;
    }
    #grid{
      display:grid;
      grid-template-columns: 150px 1fr;
    }
    #article{
      padding-left: 10px;
    }
    h1{
      font-size:40px;
      text-align:center;
      border-bottom: 1px solid gray;
      margin:0;
    }
    #grid ol{
      border-right: 1px solid gray;
      margin:0;
       style="padding-left: 23px"
    }
    </style>
    
    </head>
    
    <body>
    <a href="/login">login</a>
      <h1><a href="/"style="padding:0px 5px 0px 22px">WEB</a></h1>
    <div id="grid">
    
      ${list}
     
      ${temp_body}
      <p>
      <div id="disqus_thread"></div>
      <script>
      
      /**
      *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
      *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
      /*
      var disqus_config = function () {
      this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      };
      */
      (function() { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = 'https://express-6.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
      })();
      </script>
      <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
      </p>
    </div>

    
    </body>
    </html>
     `;
  },
  control_HTML: function (title, list, temp_body) {
    return `<!doctype html>
    <html>
    <head>
      <title>경태 페이즤 - ${title} </title>
      <meta charset="utf-8">
      <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-125138219-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'UA-125138219-1');
    </script>
    
    <style>
    input[type="submit"]{
      height: 30px; /* 높이값 초기화 */ 
      line-height : normal; /* line-height 초기화 */ 
      padding: .0em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */ 
      font-family: inherit; /* 폰트 상속 */ 
      background-color: #af95c5;
      border: 1px solid #999; 
      border-radius: 20px; /* iSO 둥근모서리 제거 */
      text-align: center; 
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
    a{
      color:black;
      text-decoration:none;
    }
    #grid{
      display:grid;
      grid-template-columns: 150px 1fr;
    }
    #article{
      padding-left: 10px;
    }
    h1{
      font-size:40px;
      text-align:center;
      border-bottom: 1px solid gray;
      margin:0;
    }
    #grid ol{
      border-right: 1px solid gray;
      margin:0;
       style="padding-left: 23px"
    }
    </style>
    
    </head>
    
    <body>
    
      <h1><a href="/"style="padding:0px 5px 0px 22px">WEB</a></h1>
    <div id="grid">
    
      ${list}
     
      ${temp_body}

    </div>

    
    </body>
    </html>
     `;
  },
  list: function (filelist, control) {
    let serch = this.serch();
    var list = `<ul>${serch}`;
    var i = 0;
    while (i < filelist.length) {
      list = list + `<li><a href="/topic/${filelist[i].id}">${filelist[i].title}</a></li>`;
      i = i + 1;
    }
    list = list + `<br>
    <div>
    <a href="/author" style="font-family: cursive;">author List</a>
    </div>
    <br>${control}</ul>`;
    return list;
  },
  author_list: function(authors,id){
    let i = 0;
    let tag = '';
    
    console.log(id)
    
    while(i < authors.length){
      let selected = '';
      if(authors[i].id === id){
        selected = 'selected'
      }
      tag += `<option value="${authors[i].id}" ${selected}>${authors[i].author}</option>`
      i++;
    }
    return`<p>
    <select name="author">
      ${tag}
  </select>
  </p>`
  },
  author_list_table:function(authors){
    let tag = `<table>
    <tr style="font-family: monospace; font-weight: bold;font-size:20px;">
      <td>저자 이름</td>
      <td>프로필</td>
      <td> 수정 </td>
      <td> 삭제 </td>
    </tr>`;
    let i =0;
    while(i < authors.length){
      tag +=`
      <tr>
        <td>${authors[i].author}</td>
        <td>${authors[i].profile}</td>
        <td><a href="/author/update/${authors[i].id}">Update</a></td>
        <td>
          <form action="/author/delete_process" method="post" onsubmit="return confirm('정말로 삭제하시겠습니까?')">
          <input type="hidden" name="id" value="${authors[i].id}">
          <input type="submit" value="Delete" style="background-color: lightsalmon;color: lightslategrey; border-radius: 5%;">
          </form>
        </td>
      </tr>`
      i++;
    }

    tag +=`</table>
    <style>
    table{
      border-collapse: collapse;
    }
    td{
      border:1px solid slategray
    }
  </style>`

    return tag;
  },
  author_create:function(){
    let html =`
    <form action="/author/create_process" method="post">
    <p>
      <input type="text" name="author" placeholder="author name">
    </p>
    <p>
      <input type="text" name="profile" placeholder="information">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>`;

  return html;
  },
  serch:function(){
    let serch = `
    <form action="/serch" method="get">
      <input type="text" name="title" placeholder="검색" style="height:22px; width: 100px;
                                                                position: relative; right: 35px;">
      
      <input type="submit" value = "검색" style="width: 40px; height: 30px;color: mintcream;
                                                 background-color: olive;
                                                 font-size: 9pt;
                                                 border-radius: 5%;opacity: 0.5;
                                                 position: relative; left: 77px; bottom: 28.5px">
  </form>
  `
  return serch;
  }
}
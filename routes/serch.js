var express = require('express');
var router = express.Router();

router.get('',(req,res) =>{
    console.log(req.param('title'));
})



module.exports = router;
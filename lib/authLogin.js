var express = require('express');
var router = express.Router();
var cookie = require('cookie');

module.exports.IsOwner = function (req,res){
    let isOwner = false
    let cookies = {}
    if(req.headers.cookie){
        cookies = cookie.parse(req.headers.cookie);
    }
    if(cookies.email === 'rnrudxo@gmail.com' && cookies.password === '111111'){
        isOwner = true
    }
    return isOwner
}


var db = require ('../database');

var pageKey = "pages" || process.env.pagekey;

module.exports.getAll = function(req,res,next) {
    
}

module.exports.getDetail = function(req, res, next) {
    if(req.params.id === "home") res.json({slug:"home", name:"Home", content:"ASDF"});
    else if (req.params.id === "about-me") res.json({slug:"asda", name:"about-me", content:"wewe"});
    else res.status(404).send({ error:'Page not found'});
}

module.exports.edit = function(req,res,next) {
    
}

module.exports.create = function(req,res,next) {
    
}

module.exports.delete = function(req,res,next) {
    
}
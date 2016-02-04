var db = require ('../database');

module.exports.get = function(req,res,next) {
    db.get("webDetails", function(err, dat) {
        if(err) next(err);
        else if(dat) res.json(JSON.parse(dat));
        else res.status(404).send({ error:'Data not found'});
    });
}

module.exports.set = function(req,res,next) {
    db.set("webDetails", JSON.stringify(req.body), function(err, dat) {
        if(err) next(err);
        else res.json(dat);
    });
}
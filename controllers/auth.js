var jwt = require ('jsonwebtoken');
var crypto = require ("crypto");
var db = require ('../database');


module.exports.login = function(req, res) {
    db.get(req.body.username, function(err, dat) {
        if (!err && crypto.createHash('md5').update(req.body.password).digest('hex') ===  dat) {
            var token = jwt.sign({username:req.username},
                (process.env.SECRET||"iTXFLoC5MFNK6UrfK"),
                {expiresIn: (process.env.TOKENEXPIRATION||"14d")});
            res.json({success: true, message: 'Authentication sucessful.', token: token});
        }
        else res.json({success: false, message: 'Authentication failed. Wrong email or password.'});
    });
}

module.exports.authenticate = function(req,res,next) {
    var token = req.body.token || req.query.token || req.headers['st-access-token'];
    if (token) {
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return res.status(403).send({ error: {"code":"403", "name":'Access denied. Invalid token.'}});
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else return res.status(401).send({ error: {"code":"401", "name":'This resource needs authentication'}});
}

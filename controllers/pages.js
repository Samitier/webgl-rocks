var db = require ('../database');

var pageKey = "pages" || process.env.pagekey;

/*
 Redis implementation: we will store the pages as a simple stringified JSON object, with the key page:id
 since we'll want to be able to get all the pages, we'll have to
 have a secondary ordered set (page-archive) with the ids, name and excerpt of the posts with a score equal
 to their date of posting.
 */
module.exports.getAll = function(req,res,next) {
    db.zrange("page-archive", 0, -1, function(err, dat) {
        if(err) return next(err);
        for(var i = 0; i< dat.length; ++i) dat[i] = JSON.parse(dat[i]);
        res.json(dat);
    });
}

module.exports.getDetail = function(req,res) {
    db.get("page:" + req.params.id, function(err, dat) {
        if(err) return next(err);
        else if(!dat) res.status(404).send({ error:'Page not found'});
        else res.json(JSON.parse(dat));
    });
}

module.exports.edit = function(req,res,next) {
    db.get("page:" + req.params.id, function(err, dat) {
        if(err) return next(err);
        else if(!dat) res.status(404).send({ error:'Page not found'});
        else {
            var post = req.params;
            post.updatedAt = new Date();
            db.set("page:" + req.params.id,post, function(err,dat) {
                if(err) return next(err);
                else res.json(dat);
            });
            //TODO: if date/excerpt/title/thumbnail modified -> change post-archive
            //TODO: if id/url modified -> delete old value
        }
    });
}

module.exports.create = function(req,res,next) {
    db.exists("page:" + req.body.id, function(err,exists) {
        if(err) return next(err);
        else if(exists) res.status(200).send({ error:'This page already exists'});
        else {
            var page = makePage(req.body);
            db.set("page:" + req.body.id, JSON.stringify(page), function(err,dat) {
                if(err) return next(err);
                else {
                    var archive = makeArchive(page);
                    db.zadd("page-archive", post.postedAt.getTime(), JSON.stringify(archive), function(err, dat) {
                        if(err) return next(err);
                        else res.json({success: "The page has been created."});
                    })
                }
            });
        }
    });
}

module.exports.delete = function(req,res,next) {
    db.get("page:" + req.params.id, function(err, dat) {
        if(err) return next(err);
        else if(!dat) res.status(404).send({ error:'Page not found'});
        db.del("page:" + req.params.id, function(err, dat) {
            if(err) return next(err);
            db.zremrangebyscore("page-archive", dat.postedAt.getTime(), function(err, dat){
                if(err) return next(err);
                else res.json({success: "The page has been removed."});
            });
        });
    });
}

/*
 Cleans user input and add a few fields
 */
var makePage = function(pageData) {
    return {
        id : pageData.id,
        title: pageData.title,
        excerpt: pageData.excerpt,
        thumbnail: pageData.thumbnail,
        postedAt: (pageData.postedAt || new Date()),
        updatedAt: new Date(),
        category: pageData.category,
        tags: pageData.tags,
        content: pageData.content
    }
};

/*
 Cleans some post data for the archive
 */
var makeArchive = function(pageData) {
    return {
        id: pageData.id,
        title: pageData.title,
        excerpt: pageData.subtitle,
        thumbnail: pageData.thumbnail,
        postedAt: pageData.postedAt
    }
};

/*
 Checks if the archive needs to be changed after an update
 */
var needsArchiveUpdate = function(old, created) {
    return (old.title != created.title || old.excerpt != created.excerpt
    || old.thumbnail != created.thumbnail || old.postedAt != created.postedAt
    || old.id != created.id);
}
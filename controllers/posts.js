var db = require ('../database');

/*
    Redis implementation: we will store the posts as a simple stringified JSON object, with the key posts:id
    since we'll want to have the posts ordered by date at all times, we'll have to
    have a secondary ordered set (post-archive) with the ids, name, thumbnail and excerpt of the posts with a score equal
    to their date of posting.
*/
module.exports.getAll = function(req,res,next) {
    db.zrange("post-archive", 0, -1, function(err, dat) {
        if(err) return next(err);
        for(var i = 0; i< dat.length; ++i) dat[i] = JSON.parse(dat[i]);
        res.json(dat);
    });
}

module.exports.getDetail = function(req,res) {
    db.get("post:" + req.params.id, function(err, dat) {
        if(err) return next(err);
        else if(!dat) res.status(404).send({ error:'Post not found'});
        else res.json(JSON.parse(dat));
    });
}

module.exports.edit = function(req,res,next) {
    db.get("post:" + req.params.id, function(err, dat) {
        if(err) return next(err);
        else if(!dat) res.status(404).send({ error:'Post not found'});
        else {
            var post = makePost(req.params);
            if(post.id != dat.id) {
                //TODO: delete old value
            }
            if (needsArchiveUpdate()) {
                //TODO: update post-archive db.zrangebyscore();
            }
            db.set("post:" + post.id, JSON.stringify(post), function(err,dat) {
               if(err) return next(err);
               else res.json(dat);
            });
        }
    });
}

module.exports.create = function(req,res,next) {
    db.exists("post:" + req.body.id, function(err,exists) {
        if(err) return next(err);
        else if(exists) res.status(200).send({ error:'This post already exists'});
        else {
            var post = makePost(req.body);
            db.set("post:" + req.body.id, JSON.stringify(post), function(err,dat) {
                if(err) return next(err);
                else {
                    var archive = makeArchive(post);
                    db.zadd("post-archive", post.postedAt.getTime(), JSON.stringify(archive), function(err, dat) {
                        if(err) return next(err);
                        else res.json({success: "The post has been created."});
                    })
                }
            });
        }
    });
}

module.exports.delete = function(req,res,next) {
    db.get("post:" + req.params.id, function(err, dat) {
        if(err) return next(err);
        else if(!dat) res.status(404).send({ error:'Page not found'});
        db.del("post:" + req.params.id, function(err, dat) {
            if(err) return next(err);
            db.zremrangebyscore("post-archive", dat.postedAt.getTime(), function(err, dat){
                if(err) return next(err);
                else res.json({success: "The post has been removed."});
            });
        });
    });
}

/*
Cleans user input and add a few fields
 */
var makePost = function(postData) {
    return {
        id : postData.id,
        title: postData.title,
        excerpt: postData.excerpt,
        thumbnail: postData.thumbnail,
        postedAt: (new Date(postData.postedAt) || new Date()),
        updatedAt: new Date(),
        category: postData.category,
        tags: postData.tags,
        content: postData.content
    }
};

/*
Cleans some post data for the archive
 */
var makeArchive = function(postData) {
    return {
        id: postData.id,
        title: postData.title,
        excerpt: postData.subtitle,
        thumbnail: postData.thumbnail,
        postedAt: postData.postedAt
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
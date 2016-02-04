var express = require('express');

var pjson = require('./package.json');
var ctrl = require('./controllers');

var router = express.Router();

/* GET API info. */
router.get('/', function(req, res) {
    res.end('This is the blog API, powered by @Samitier RedisCMS v' +pjson.version + '.');
});

/*LOGIN */
router.post('/login', ctrl.auth.login);

/*PAGES*/
router.route('/pages')
    .get(ctrl.pages.getAll)
    .post(ctrl.auth.authenticate, ctrl.pages.create);
router.route('/pages/:id')
    .get(ctrl.pages.getDetail)
    .delete(ctrl.auth.authenticate, ctrl.pages.delete)
    .put(ctrl.auth.authenticate, ctrl.pages.edit)

/*POSTS*/
router.route('/posts')
    .get(ctrl.posts.getAll)
    .post(ctrl.auth.authenticate, ctrl.posts.create);
router.route('/posts/:id')
    .get(ctrl.posts.getDetail)
    .delete(ctrl.auth.authenticate, ctrl.posts.delete)
    .put(ctrl.auth.authenticate, ctrl.posts.edit);

/*WEB DETAILS*/
router.route('web-details')
    .get(ctrl.webdetails.get)
    .post(ctrl.webdetails.set)


router.all('*', function(req, res) {res.status(404).send({ error: {"code":"404", "name":'Resource not found'}});});

module.exports = router;
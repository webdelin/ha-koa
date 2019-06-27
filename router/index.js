const Router = require('koa-router');
const router = new Router();

const productsCtrl = require('../controllers/products.js');

const skillsCtrl = require('../controllers/skills.js');

const authCtrl = require('../controllers/auth.js');

router.get('/', async (ctx) => {
  try {
    const products = await productsCtrl.get();
    ctx.render('index', {
      products
    });
  }
  catch(err) {
    console.error('err', err);
    ctx.status = 404;
  }
});
router.get('/', async (ctx) => {
  try {
    const skills = await skillsCtrl.get();
    ctx.render('index', {
      skills
    });
  }
  catch(err) {
    console.error('err', err);
    ctx.status = 404;
  }
});

router.get('/admin', async (ctx) => {
  console.log("ctx.session", ctx.session);
  try {
    if (ctx.session.isAuth) {
      ctx.render('admin');
    }
    else {
      ctx.redirect('/login');
    }
  }
  catch(err) {
    console.error('err', err);
    ctx.status = 404;
  }
});

router.post('/admin/upload', async (ctx) => {
  try {
    await productsCtrl.add({...ctx.request.files, ...ctx.request.body});

    ctx.render('admin');
  }
  catch(err) {
    console.error('err', err);
    ctx.status = 404;
  }
});
router.post('/admin/skills', async (ctx) => {
  try {
    await skillsCtrl.add({...ctx.request.files, ...ctx.request.body});

    ctx.render('admin');
  }
  catch(err) {
    console.error('err', err);
    ctx.status = 404;
  }
});

router.get('/login', async (ctx) => {
  console.log("ctx.flash",  ctx.flash);
  try {
    const msgslogin = ctx.flash && ctx.flash.get() ? ctx.flash.get().msgslogin : null;

    ctx.render('login', {
      msgslogin
    });
  }
  catch(err) {
    console.error('err', err);
    ctx.status = 404;
  }
});

router.post('/login', async (ctx) => {
  try {
    await authCtrl.auth(ctx.request.body);
    ctx.session.isAuth = true;

    ctx.redirect('admin');
  }
  catch(err) {
    console.error('err', err);
    ctx.flash.set({msgslogin: err});
    ctx.redirect('/login');
  }
});

module.exports = router;

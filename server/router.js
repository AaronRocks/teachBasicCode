const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.post('/changePass', mid.requiresSecure, controllers.Account.changePass);
  app.get('/changePass', mid.requiresSecure, controllers.Main.changePassPage);
  app.get('/main', mid.requiresLogin, controllers.Main.mainPage);
  app.post('/main', mid.requiresLogin, controllers.Main.character);
  app.post('/update', mid.requiresSecure, controllers.Account.updatePlatinum);
  app.get('/platinum', mid.requiresSecure, controllers.Account.platinum);
  app.get('/getCharecter', mid.requiresLogin, controllers.Character.characters);
  app.get('/getLevel', mid.requiresLogin, controllers.Character.levels);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;

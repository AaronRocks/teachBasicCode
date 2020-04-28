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
  app.get('/level1', mid.requiresSecure, controllers.Main.level1);
  app.get('/main', mid.requiresLogin, controllers.Main.mainPage);
  app.post('/main', mid.requiresLogin, controllers.Character.character);
  app.post('/upgrade', mid.requiresSecure, controllers.Account.updatePlatinum);
  app.get('/platinum', mid.requiresSecure, controllers.Account.platinum);
  app.get('/getCharecter', mid.requiresLogin, controllers.Character.characters);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  app.get('*', mid.requiresSecure, controllers.Main.notFound);
};

module.exports = router;

const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const updatePlatinum = (req, res) => {
  Account.Accountmodel.upgradeStatus(req.session.account._id);
  return res.json({ redirect: '/main' });
};

const platinum = (request, response) => {
  const req = request;
  const res = response;
  console.dir(req.session.account._id);
  Account.Accountmodel.getStatus(req.session.account._id);
  return res.json({ error: 'error occured' });
};
const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);
    console.log('redirect');
    return res.json({ redirect: '/main' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
      platinumUser: false,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/main' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An Error occured' });
    });
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

const changePass = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.newPass = `${req.body.newPass}`;

  if (!req.body.username || !req.body.pass || !req.body.newPass) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass === req.body.pass2) {
    return res.status(400).json({ error: 'Password in use. Please select new password' });
  }
  // return Account.AccountModel.findByUsername(req.session.account._id, (err, docs) =>
  // Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
  //   const accountData = {
  //     username: req.body.username,
  //     salt,
  //     password: hash,
  //     platinumUser: Account.AccountModel.platinumUser,
  //   };

  //   const updateAccount = new Account.AccountModel(accountData);

  //   const savePromise = updateAccount.save();

  //   savePromise.then(() => {
  //     req.session.account = Account.AccountModel.toAPI(updateAccount);
  //     return res.json({ redirect: '/main' });
  //   });

  //   savePromise.catch((err) => {
  //     console.log(err);

  //     if (err.code === 11000) {
  //       return res.status(400).json({ error: 'Username already in use.' });
  //     }

  //     return res.status(400).json({ error: 'An Error occured' });
  //   });
  // }));
  return res.json({ error: 'an error occured' });
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
module.exports.changePass = changePass;
module.exports.updatePlatinum = updatePlatinum;
module.exports.platinum = platinum;

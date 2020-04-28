const models = require('../models');

const { Character } = models;

const mainPage = (req, res) => {
  Character.CharacterModel.findByUser(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), character: docs });
  });
};
const changePassPage = (req, res) => {
  Character.CharacterModel.findByUser(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('changePassword', { csrfToken: req.csrfToken(), character: docs });
  });
};

const notFound = (req, res) => {
  res.status(404).render('404Page');
};

const level1 = (request, response) => {
  const res = response;
  return res.render('level1');
};

const level2 = (request, response) => {
  const res = response;
  return res.render('level2');
};

module.exports.mainPage = mainPage;
module.exports.changePassPage = changePassPage;
module.exports.notFound = notFound;
module.exports.level1 = level1;
module.exports.level2 = level2;

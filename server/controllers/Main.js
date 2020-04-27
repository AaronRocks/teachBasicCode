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

const makeCharacter = (req, res) => {
  console.log('created');
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const level = 0;
  const xp = 0;

  const characterData = {
    name: req.body.name,
    level,
    xp,
    user: req.session.account._id,
  };

  const newCharacter = new Character.CharacterModel(characterData);

  const characterPromise = newCharacter.save();

  characterPromise.then(() => res.json({ redirect: '/main' }));

  characterPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'character already exists.' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return characterPromise;
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

module.exports.mainPage = mainPage;
module.exports.character = makeCharacter;
module.exports.changePassPage = changePassPage;

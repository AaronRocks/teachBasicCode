const models = require('../models');

const { Character } = models;

const getCharacter = (request, response) => {
  const req = request;
  const res = response;

  return Character.CharacterModel.findByUser(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ character: docs });
  });
};


const makeCharacter = (req, res) => {
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

module.exports.character = makeCharacter;
module.exports.characters = getCharacter;

const models = require('../models');

const { Character } = models;

const getCharacter = (request, response) => {
  const req = request;
  const res = response;

  return Character.CharacterModel.findByName(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ character: docs });
  });
};

const getLevel = (request, response) => {
  const res = response;
  // load level from file and display to user
  return res.json({ message: 'loaded' });
};

module.exports.levels = getLevel;
module.exports.characters = getCharacter;

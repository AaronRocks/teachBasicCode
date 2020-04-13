const models = require('../models');

const { Character } = models;

const mainPage = (req, res) => {
    // Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(400).json({ error: 'An error occured' });
    //   }
  
    // return res.render('app', { csrfToken: req.csrfToken(), level: docs });

    // }); 
    return res.render('app', { csrfToken: req.csrfToken()} );
};

module.exports.mainPage = mainPage;
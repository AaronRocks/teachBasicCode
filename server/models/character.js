const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.Promise = global.Promise;

let CharacterModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName,
        unique: true,
    },

    level: {
        type: Number,
        min: 0,
        required: true,
        // default of all new charachters made will be level 1
        // each time clear a level, gain XP (levels playable more than once)
    },

    xp: {
        type: Number,
        min: 0,
        default: 0,
    },
    
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },

    platinumUser: {
        type: Boolean,
        required: true,
    },
    
    createdData: {
        type: Date,
        default: Date.now,
    },
});


CharacterSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    level: doc.level,
    xp: doc.xp,
});
  
CharacterSchema.statics.findByOwner = (userId, callback) => {
    const search = {
      user: convertId(userId),
    };
  
    return CharacterModel.find(search).select('name level xp').exec(callback);
};

CharacterModel = mongoose.model('Level', CharacterSchema);
  

module.exports.CharacterModel = CharacterModel;
module.exports.CharacterSchema = CharacterSchema;
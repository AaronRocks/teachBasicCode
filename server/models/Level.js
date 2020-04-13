const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.Promise = global.Promise;

let LevelModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const LevelSchema = new mongoose.Schema({
    CreatedData: {
        type: Date,
        default: Date.now,
    },
});

module.exports.LevelModel = LevelModel;
module.exports.LevelSchema = LevelSchema;
const Joi = require('joi');
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
      nazwa: { type: String, minlength: 1, maxlength: 50, required: true },
});

  
const Group = mongoose.model('Group', groupSchema);

function validateGroup(reqBody){
    const schema = {
        nazwa: Joi.string().min(1).max(50).required(),
    }

    return Joi.validate(reqBody, schema);
};


module.exports.Group = Group;
module.exports.validate = validateGroup;
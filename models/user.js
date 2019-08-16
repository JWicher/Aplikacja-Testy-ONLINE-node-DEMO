const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require('config');

const userSchema = new mongoose.Schema({
    nazwa: { type: String, minlength: 1, required: true },
    haslo: { type: String, minlength: 5, required: true },
    email: { type: String, lowercase: true, required: true  },
    firma: {
      _id: { type: mongoose.Schema.ObjectId },
      nazwa: { type: String, default: "" }
    },
    potwierdzonyProfil: { type: Boolean, default: false },
    czyAdmin: { type: Boolean, default: false },
    język: { type: String, default: "en" }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
      {
        _id: this._id,
        nazwa: this.nazwa,
        email: this.email,
        firma: this.firma,
        czyAdmin: this.czyAdmin,
        język: this.język
      },
      config.get("jwtPrivateKey")
    );
    return token;
  };

  
const User = mongoose.model('User', userSchema);

function validateUser(reqBody){
    const schema = {
        nazwa: Joi.string().min(1).max(255).required(),
        haslo: Joi.string().min(5).max(255).required(),
        email: Joi.string().email().required(),
        firma: Joi.object().keys({
          _id: Joi.string(),
          nazwa: Joi.string()
        }),
        potwierdzonyProfil: Joi.boolean(),
        czyAdmin: Joi.boolean(),
        język: Joi.string()
    }

    return Joi.validate(reqBody, schema);
};


module.exports.User = User;
module.exports.validate = validateUser;
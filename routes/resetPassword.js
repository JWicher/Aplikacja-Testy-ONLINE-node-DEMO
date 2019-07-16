const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const lodash_pick = require('lodash/pick');

router.patch('/:id', async (req, res) => {
    const { error } = validateOnlyPassword(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user = await User.findById(req.params.id);
    if(!user) return res.status(404).send("Nie znaleziono konta.");
  
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user = await user.save();
    res.status(200).send( lodash_pick(user, ['_id', 'name', 'permissions', 'isAdmin', 'isLogged']) );
  });
  

  function validateOnlyPassword(req) {
    const schema = { password: Joi.string().min(1).max(255).required() };
    return Joi.validate(req, schema);
  }

module.exports = router; 

const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Nieprawidłowy email lub hasło.');


  const prawidłoweHasło = await bcrypt.compare(req.body.haslo, user.haslo);
  if (!prawidłoweHasło){
    return res.status(400).send('Nieprawidłowy email lub hasło.');
  }

  if(!user.potwierdzonyProfil){
    return res.status(400).send("Odmowa dostępu. Nie uruchomiłeś link aktywacyjny przesłany na podany email");
  }

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).status(200).send(token); // przejrzeć
});

function validate(req) {
  const schema = {
    email: Joi.string().email().min(1).max(255).required(),
    haslo: Joi.string().min(5).max(255).required()
  };
  return Joi.validate(req, schema);
}


module.exports = router; 

const express = require('express');
const router = express.Router();
// const { Company, validate } = require('../models/company');
const { Group, validate } = require('../models/group');

// router.get('/', async (req, res) => {
//     // const companies = await Company.find();
//     // res.status(200).send(companies);
//     res.status(400).send("route nie obsługiwany");
// });

router.get('/:nazwa', async (req, res) => {
    const group = await Group.findOne({ nazwa: req.params.nazwa });
    if(!group) return res.status(404).send('Nie znaleziono grupy w bazie danych.');
    res.status(200).send(group);
});

router.post('/', async (req, res) => {
    // const { error } = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message);
    let group = await Group.findOne({ nazwa: req.body.nazwa });
    if(group) return res.status(400).send("Podany NIP jest już zarejestrowany.");
    group = new Group( req.body );
    group = await group.save();
    
    res.status(200).send( group );
});

module.exports = router;
const { Test, validate } = require('../models/test');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
        let tests = await Test.find()
                        .or( [
                            {'ktoWidziTest._id': req.użytkownik._id },
                            {'ktoWidziTest._id': req.użytkownik.firma._id },
                            {'ktoWidziTest._id': "" }
                        ] );

    if(req.użytkownik.czyAdmin){
        tests = await Test.find()
    }

    res.status(200).send(tests);
});

router.post('/', async (req, res) => {
    // const { error } = validate(req.body);
    // if(error) return res.status(400).send("Złe dane wejściowe. Nie można zarejestrować testu.");
    let test = new Test(req.body);
    test = await test.save();
    res.status(200).send(test);
});

router.patch('/:id', async (req, res) => {
    let test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!test) return res.status(404).send('Nie znaleziono testu w bazie danych.');
    res.status(200).send( test );
});

router.delete('/:id', async (req, res) => {
    let test = await Test.findByIdAndRemove(req.params.id);
    if(!test) return res.status(404).send('Nie znaleziono testu w bazie danych.');
    res.status(200).send(test);
})

module.exports = router;
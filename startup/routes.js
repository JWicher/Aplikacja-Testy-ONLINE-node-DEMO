const express = require('express');
const auth = require('../routes/auth');
const testy = require('../routes/tests');
const kodyDostepuDoTestow = require('../routes/kodyDostepuDoTestow');
const użytkownicy = require('../routes/users');
const grupy = require('../routes/groups');
const generujPDFzWynikami = require('..//routes/generujPDFzWynikami');
const autoryzacja_middleware = require('../middleware/auth');
const sprawdzanie_originu = require('../middleware/checkOrigin');

module.exports = function(app) {
    app.use(express.json());
    app.use(sprawdzanie_originu);
    app.use('/api/logowanie', auth);
    // app.use('/api/usuwacz', usuwacz); 
    app.use('/api/kodyDostepuDoTestow', kodyDostepuDoTestow); 
    app.use('/api/uzytkownicy', użytkownicy); 

    app.use(autoryzacja_middleware);

    app.use('/api/testy', testy); 
    app.use('/api/generujPDFzWynikami', generujPDFzWynikami); 
    app.use('/api/grupy', grupy); 

}
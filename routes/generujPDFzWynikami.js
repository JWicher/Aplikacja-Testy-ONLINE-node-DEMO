const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const { KodTestu } = require('../models/kodTestu');
const { stwórzPDFzWynikami } = require('../generatorPDF/generatorPDF')

router.get('/:kod', async (req, res) => {
  const obiektKoduDostępu = await KodTestu.findOne({kod: req.params.kod});
  if(!obiektKoduDostępu) return res.status(404).send('Nieznaleziono wyników.');
  if(obiektKoduDostępu.rozpoczęty) return res.status(403).send('Brak wyników. Test nie został otwarty.');

  const {ścieżkaPliku} = await stwórzPDFzWynikami(obiektKoduDostępu);
    res.download(ścieżkaPliku);
    await fs.remove(ścieżkaPliku)
});

module.exports = router; 

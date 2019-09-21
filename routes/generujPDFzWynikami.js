const express = require('express');
const router = express.Router();
const { fork } = require('child_process');
const fs = require('fs-extra');
const ścieżkaDoSkryptuPomocniczego = process.cwd() + '/threads/wątekGeneratoraPDF.js';
const { KodTestu } = require('../models/kodTestu');


const wątekGenerowaniaPDF = fork(ścieżkaDoSkryptuPomocniczego);

router.get('/:kod', async (req, res) => {
  const obiektKoduDostępu = await KodTestu.findOne({ kod: req.params.kod });
  if (!obiektKoduDostępu) return res.status(404).send('Nieznaleziono wyników.');
  if (obiektKoduDostępu.rozpoczęty) return res.status(403).send('Brak wyników. Test nie został otwarty.');


  wątekGenerowaniaPDF.send(obiektKoduDostępu);

  wątekGenerowaniaPDF.once('message', async (ścieżkaPliku) => {
    res.download(ścieżkaPliku, 'wyniki.pdf', async (err) => {
      if (err) console.log('Błąd podczas ściągania pliku z wynikami:', err);
      await fs.remove(ścieżkaPliku);
    });

  });

});

module.exports = router;
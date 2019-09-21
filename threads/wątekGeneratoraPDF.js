
const { stwórzPDFzWynikami } = require('../utils/generatorPDF/generatorPDF')

process.on('message', async (obiektKoduDostępu) => {
    const { ścieżkaPliku } = await stwórzPDFzWynikami(obiektKoduDostępu);

    process.send(ścieżkaPliku);
});
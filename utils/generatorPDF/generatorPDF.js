const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path')
const filenamify = require('filenamify');
const { returnHBSwithregisteredHelpers } = require('./hbs_helpers');


const hbs_withhelpers = returnHBSwithregisteredHelpers(hbs);
const compile = async function (nazwSzablonu, dane) {
  const ścieżkaSzablonu = path.join(__dirname, 'szablony', `${nazwSzablonu}.hbs`)
  const html = await fs.readFile(ścieżkaSzablonu, 'utf-8');
  return hbs_withhelpers.compile(html)(dane);
}


async function stwórzPDFzWynikami(obiektKoduDostępu) {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox',] });
    const page = await browser.newPage();
    const nazwaPlikuPrzedSanityzacją = `${obiektKoduDostępu.test.nazwa} - ${obiektKoduDostępu.kandydat.nazwisko} ${obiektKoduDostępu.kandydat.imie} - ${obiektKoduDostępu.kod}.pdf`
    const nazwaPliku = filenamify(nazwaPlikuPrzedSanityzacją, { replacement: '-' });
    const ścieżkaPliku = path.join(__dirname, `plikiPDF/${nazwaPliku}`);
    const content = await compile('szablon1', obiektKoduDostępu)

    await page.setContent(content);
    await page.emulateMedia('print');
    await page.pdf({
      path: ścieżkaPliku,
      format: 'A4',
      displayHeaderFooter: true,
      headerTemplate: '.',
      footerTemplate: '',
      printBackground: true,
      margin: {
        top: "10mm",
        bottom: "10mm"
      }
    });

    console.log(`Wykonano plik PDF ${nazwaPliku}`);

    await browser.close();

    return { ścieżkaPliku, nazwaPliku };

  }
  catch (błąd) {
    console.log('Błąd przy produkcji PDF', błąd)
  }
}

module.exports.stwórzPDFzWynikami = stwórzPDFzWynikami;

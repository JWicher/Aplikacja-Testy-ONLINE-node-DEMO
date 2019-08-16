const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path')
const filenamify = require('filenamify');

const compile = async function( nazwSzablonu, dane) {
    const ścieżkaSzablonu = path.join(process.cwd(), 'generatorPDF/szablony', `${nazwSzablonu}.hbs`)
    const html = await fs.readFile(ścieżkaSzablonu, 'utf-8');
    return hbs.compile(html)(dane);
}

hbs.registerHelper('ifJestRowne', function(warunerk1, warunek2, options) {
    if(warunerk1 === warunek2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  hbs.registerHelper('ifJestParzysta', function(warunerk1, options) {
    if(warunerk1 % 2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  hbs.registerHelper('ileZadanZamknietych', function(tabicaZadań, options) {
      return options.fn( {ilośćZadańZamkniętych: tabicaZadań.filter( zadanie => zadanie.typ === "zamknięte" ).length })  ;
  });
  hbs.registerHelper('ileDobrychOdpowiedzo', function(tabicaZadań, options) {
    const zadaniaZamknięte = tabicaZadań.filter( zadanie => zadanie.typ === "zamknięte" );
    const iloscPoprawnychOdpowiedzi = zadaniaZamknięte.filter( zadanie => zadanie.poprawna_odpowiedz === zadanie.udzielonaOdpowiedz.id ).length
      return options.fn( { iloscPoprawnychOdpowiedzi })  ;
  });
  hbs.registerHelper('ileProcentDobrychOdpowiedzi', function(tabicaZadań, options) {
    const zadaniaZamknięte = tabicaZadań.filter( zadanie => zadanie.typ === "zamknięte" );
    const iloscPoprawnychOdpowiedzi = zadaniaZamknięte.filter( zadanie => zadanie.poprawna_odpowiedz === zadanie.udzielonaOdpowiedz.id ).length
    const procent = Math.round( iloscPoprawnychOdpowiedzi / zadaniaZamknięte.length * 100 );
      return options.fn( { procent })  ;
  });
  hbs.registerHelper('formatujCzas', function({minuty, sekundy}, options) {
      return options.fn(
        {
          minuty: minuty < 10 ? `0${minuty}` : minuty,
          sekundy: sekundy < 10 ? `0${sekundy}` : sekundy,
         }
        )  ;
  });


async function stwórzPDFzWynikami(obiektKoduDostępu) {
    try{

        const browser = await puppeteer.launch({
          args: [
            '--no-sandbox',
          ],
        });

        const page = await browser.newPage();
        const nazwaPlikuPrzedSanityzacją = `${obiektKoduDostępu.test.nazwa} - ${obiektKoduDostępu.kandydat.nazwisko} ${obiektKoduDostępu.kandydat.imie} - ${obiektKoduDostępu.kod}.pdf`
        const nazwaPliku = filenamify(nazwaPlikuPrzedSanityzacją, {replacement: '-'});
        const ścieżkaPliku = `generatorPDF/plikiPDF/${nazwaPliku}`;
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
        return {ścieżkaPliku, nazwaPliku};

    }
    catch(błąd){
        console.log('Błąd przy produkcji PDF', błąd)
    }
}

module.exports.stwórzPDFzWynikami = stwórzPDFzWynikami;

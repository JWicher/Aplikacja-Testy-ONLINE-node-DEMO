function returnHBSwithregisteredHelpers(hbsObject) {

    hbsObject.registerHelper('ifJestRowne', function (warunerk1, warunek2, options) {
        if (warunerk1 === warunek2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    hbsObject.registerHelper('ifJestParzysta', function (warunerk1, options) {
        if (warunerk1 % 2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
    hbsObject.registerHelper('ileZadanZamknietych', function (tabicaZadań, options) {
        return options.fn({ ilośćZadańZamkniętych: tabicaZadań.filter(zadanie => zadanie.typ === "zamknięte").length });
    });
    hbsObject.registerHelper('ileDobrychOdpowiedzo', function (tabicaZadań, options) {
        const zadaniaZamknięte = tabicaZadań.filter(zadanie => zadanie.typ === "zamknięte");
        const iloscPoprawnychOdpowiedzi = zadaniaZamknięte.filter(zadanie => zadanie.poprawna_odpowiedz === zadanie.udzielonaOdpowiedz.id).length
        return options.fn({ iloscPoprawnychOdpowiedzi });
    });
    hbsObject.registerHelper('ileProcentDobrychOdpowiedzi', function (tabicaZadań, options) {
        const zadaniaZamknięte = tabicaZadań.filter(zadanie => zadanie.typ === "zamknięte");
        const iloscPoprawnychOdpowiedzi = zadaniaZamknięte.filter(zadanie => zadanie.poprawna_odpowiedz === zadanie.udzielonaOdpowiedz.id).length
        const procent = Math.round(iloscPoprawnychOdpowiedzi / zadaniaZamknięte.length * 100);
        return options.fn({ procent });
    });
    hbsObject.registerHelper('formatujCzas', function ({ minuty, sekundy }, options) {
        return options.fn(
            {
                minuty: minuty < 10 ? `0${minuty}` : minuty,
                sekundy: sekundy < 10 ? `0${sekundy}` : sekundy,
            }
        );
    });

    return hbsObject;
}

module.exports.returnHBSwithregisteredHelpers = returnHBSwithregisteredHelpers
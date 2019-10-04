const nodemailer = require("nodemailer");
const config = require('config');

async function wyślijMail(obiektKoduTestu, { ścieżkaPliku, nazwaPliku }) {
  const mailUser = config.get('mailUser');
  const mailUserPass = config.get('mailUserPass');
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mailUser, // generated ethereal user
      pass: mailUserPass // generated ethereal password
    }
  });

  // Szczegóły wiadomości
  const przygotowanaTreść = przygotujZawartoćśMaila(obiektKoduTestu);
  let info = await transporter.sendMail({
    from: 'JW TESTY ONLINE',
    to: obiektKoduTestu.adresaci,
    subject: przygotowanaTreść.temat,
    text: "",
    html: przygotowanaTreść.tresc,
    attachments: [
      {   // utf-8 string as an attachment
        path: ścieżkaPliku,
        filename: nazwaPliku
      }]
  });
}

function przeliczCzasTestu({ wykorzystanyCzas }) {
  let { minuty, sekundy } = wykorzystanyCzas
  minuty = minuty < 10 ? `0${minuty}` : minuty;
  sekundy = sekundy < 10 ? `0${sekundy}` : sekundy;
  return `${minuty}:${sekundy} [min:sek]`;
}

function przygotujZawartoćśMaila(obiektKoduTestu) {
  const { kandydat, test } = obiektKoduTestu;
  const temat = `${obiektKoduTestu.test.nazwa} - ${obiektKoduTestu.kandydat.nazwisko} ${obiektKoduTestu.kandydat.imie}`
  const ilośćPoprawnychOdpowiedzi = zliczPoprawneOdpowiedzi(obiektKoduTestu)
  const zadaniaOtwarte = test.zadania.filter(zadanie => zadanie.typ === "otwarte");
  const ilośćZamkniętychZadań = test.zadania.length - zadaniaOtwarte.length;
  const sformatowanyCzasTestu = przeliczCzasTestu(obiektKoduTestu);

  const tresc =
    `
          <h2>JW TESTY ONLINE</h2>
          <hr />
          <b>Nazwisko:</b> ${kandydat.nazwisko}<br />
          <b>Imię:    </b> ${kandydat.imie}<br />

          <hr />
          <b>Wykorzystany czas:</b> ${sformatowanyCzasTestu} <br />
          <hr />

          ${ilośćZamkniętychZadań <= 0 ? "" :
      `<b>Zadania zamknięte:</b> ${ilośćPoprawnychOdpowiedzi} / ${ilośćZamkniętychZadań} => ${Math.round(ilośćPoprawnychOdpowiedzi / ilośćZamkniętychZadań * 100)}%<br />
            <hr />`
    }

          ${ zadaniaOtwarte.length <= 0 ? "" : zadaniaOtwarte.map(zadanie =>
      `<div>
              <b>Zadania otwarte:</b><br /><br />
              <p><b>Zadanie nr ${zadanie.numer}</b>.</p>
              <p>${zadanie.tresc}</p>
              <p><u>Udzielona odpowiedź:</u></p>
              <p><i>${zadanie.udzielonaOdpowiedz.tresc}</i></p>
              <hr />
            </div>
            `
    )}
          `;

  return { tresc, temat };
}

function zliczPoprawneOdpowiedzi(obiektKoduTestu) {
  const { zadania } = obiektKoduTestu.test;
  let ilośćPoprawnychOdpowiedzi = 0;

  for (let i = 0; i < zadania.length; i++) {
    if (zadania[i].typ === "otwarte") continue;
    if (zadania[i].poprawna_odpowiedz === zadania[i].udzielonaOdpowiedz.id)
      ilośćPoprawnychOdpowiedzi++;
  }

  return ilośćPoprawnychOdpowiedzi
}
module.exports.wyślijMail = wyślijMail;
module.exports.przeliczCzasTestu = przeliczCzasTestu;

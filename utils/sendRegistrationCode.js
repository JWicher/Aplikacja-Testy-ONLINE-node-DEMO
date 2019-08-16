const nodemailer = require("nodemailer");
const config = require('config');

async function wyślijMailPotwierdzającyKonto(użytkownik){
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
  let info = await transporter.sendMail({
    from: 'JW.testy.online@gmail.com',
    to: użytkownik.email,
    subject: "Registracja na portalu TESTY ONLINE",
    text: "",
    html: `
            <h2>JW TESTY ONLINE</h2>
            <hr />
            <b>Witaj ${użytkownik.nazwa}!</b>
            <br />
            <p>Aby dokończyć rejestrację Twojego konta kliknij w poniższy link:</p>
            
            <a href="https://jw-testy-online.herokuapp.com/rejestracja/${użytkownik._id}" target="_blank">Link aktywacyjny</a>
            <br />
            <br />
            <p>Jeżeli nie się rejestrowałeś, to zignoruj tą wiadomość.</p>
            <br />
            <br />
            <p><i>Z wyrazami szacunku</i></p>
            <p><i>TESTY ONLINE</i></p>
          `
  });
}



module.exports.wyślijMailPotwierdzającyKonto = wyślijMailPotwierdzającyKonto;

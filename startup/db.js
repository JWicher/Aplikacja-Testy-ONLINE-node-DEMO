const mongoose = require('mongoose');
const config = require('config');
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

const db = config.get('db');
console.log('db = ', `${db.substr(0,25)}...`)
module.exports = function() {
    mongoose.connect(db, { useNewUrlParser: true })
    .then( () => { console.log("Połączono z bazą danych...") })
    .catch( (error) => console.log(error))
    ;
}

const mongoose = require('mongoose');
mongoose.connect('mongodb://dominicevans123:Passw0rd1!@ds257470.mlab.com:57470/blackops');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we hay")
});


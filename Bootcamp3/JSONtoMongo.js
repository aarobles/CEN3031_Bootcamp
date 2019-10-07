/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Listing = require('./server/models/listings.server.model.js'),
    config = require('./server/config/config.js');
var jsonListings
/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri, {useNewUrlParser : true});

/*
  Instantiate a mongoose model for each listing object in the JSON file and save to database
 */

var readData = fs.readFile('listings.json', 'utf8', (err, data) => {
    if (err) throw err;

    jsonListings = JSON.parse(data);

    jsonListings.entries.forEach(item => {
        var newEntry = Listing(item);

        newEntry.save(err => {
            if (err) throw err;
        });
    });
});

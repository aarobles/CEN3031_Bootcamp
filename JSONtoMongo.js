'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri, {useNewUrlParser : true});

/*
  Instantiate a mongoose model for each listing object in the JSON file and save to database
 */

fs.readFile('listings.json', 'utf8', (err, data) => {
    if (err) throw err;

    var listings = JSON.parse(data);

    listings.entries.forEach(item => {
        var newEntry = Listing(item);

        newEntry.save(err => {
            if (err) throw err;
        });
    });
});

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
mongoose.connect('mongodb+srv://arobles:Ypj0OlM2wV5LWSGD@bootcamp-db-ogvpo.azure.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser : true});

/*
  Instantiate a mongoose model for each listing object in the JSON file and save to database
 */
var listingData, parsedListings;

fs.readFile('listings.json', 'utf8', parseData);

var parseData = function(data) {
     JSON.parse(data);
 };

function saveListings() {
    Listing.forEach(function(item) {
        item.save();
    });
};

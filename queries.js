/* Add all the required libraries*/
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

mongoose.connect(config.db.uri, {useNewUrlParser : true});

/* Fill out these functions using Mongoose queries*/
var findLibraryWest = function() {
  /*
    Find the document that contains data corresponding to Library West,
   */
    Listing.findOne( {'name' : 'Library West'}, function(err, listing){
        if (err) throw err;

        console.log("Found listing:\n%s", JSON.stringify(listing));
    });
};

var removeCable = function() {
  /*
    Find the document with the code 'CABL'. Remove this listing from database.
   */
    Listing.findOneAndDelete( {'code' : 'CABL'}, function(err, listing){
        if (err) throw err;

        console.log("Deleted listing:\n%s", JSON.stringify(listing));
    });
};

var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Update.
   */
    Listing.findOneAndUpdate( {'code' : 'PHL'}, {'address' : '1953 Museum Rd, Gainesville, FL 32603'}, function(err, listing){
       if (err) throw err;

        console.log("Updated listing:\n%s", JSON.stringify(listing));
    });
};

var retrieveAllListings = function() {
    /*
        Retrieve all listings in the database, and log them to the console.
    */
    Listing.find({}, function(err, listing){
        if (err) throw err;

        console.log(JSON.stringify(listing));
    });
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();


/* Dependencies */
var mongoose = require('mongoose'),
    Listing = require('../models/listings.server.model.js'),
    coordinates = require('./coordinates.server.controller.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions refer back to this tutorial
  https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
  or
  https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d


  If you are looking for more understanding of exports and export modules -
  https://www.sitepoint.com/understanding-module-exports-exports-node-js/
  or
  https://adrianmejia.com/getting-started-with-node-js-modules-require-exports-imports-npm-and-beyond/
 */

/* Create a listing */
exports.create = function(req, res) {

    /* Instantiate a Listing */
    var listing = Listing(req.body);

    /* save the coordinates (located in req.results if there is an address property) */
    if(req.results) {
        listing.coordinates = {
          latitude: req.results.lat,
          longitude: req.results.lng
        };

        /* Then save the listing */
        listing.save(function(err) {
            if(err) {
                res.status(400).send(err);
            } else {
                res.send(listing);
            }
        });
    }

    else {
        console.log("Error: could not save coordinates (no address proprety)")
        res.status(400);
    }
};

/* Show the current listing */
exports.read = function(req, res) {
    /* send back the listing as json from the request */
    res.send(req.listing);
};

/* Update a listing - note the order in which this function is called by the router*/
exports.update = function(req, res) {
    var listing = Listing(req.body);

    if (req.results) {
        /*save the coordinates (located in req.results if there is an address property) */
        listing.coordinates = {
            /* replaces listing properties with new properties */
            latitude: req.results.lat,
            longitude: req.results.lng
        };
        /* Save the listing */
        listing.save(err => {
            if (err)
                res.status(400).send(err);
            res.send(listing);
        });
    }
    else {
        console.log("Error: could not update coordinates (no address proprety)")
        res.status(400);
    }
};

/* Delete a listing */
exports.delete = function(req, res) {

    Listing.deleteOne(req, (err, data) => {
        if (err)
            res.status(400).send(err);
        else
            console.log("Listings deleted: 1")
    });

};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
    Listing.find({}).sort('code').exec((err, listing) =>{
        if (err)
            res.status(400).send(err);
        else
            res.send(listing);
    });
};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.

  HINT: Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
    Listing.findById(id).exec(function(err, listing) {
        if(err) {
            res.send(err);
        } else {
            req.listing = listing;
            next();
        }
    });
};

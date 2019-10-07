//This file holds any configuration variables we may need
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
  db: { // database indicated in the uri string
      uri: 'mongodb+srv://arobles:Ypj0OlM2wV5LWSGD@bootcamp-db-ogvpo.azure.mongodb.net/bootcamp3?retryWrites=true&w=majority',
  },
  openCage: {
    key: '42d8a5691a5d42809552539858b5633b'
  },
  port: 8080
};

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://quynguyen:xfqM6RcvtWw22Ozf@lazadaclone.cqg5ikw.mongodb.net/';

const client = new MongoClient(uri);

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



// const client = new MongoClient(uri);

// const dbName = '';

const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

// Replace the placeholder values with your MongoDB connection string and database name
const uri = 'mongodb+srv://quynguyen:xfqM6RcvtWw22Ozf@lazadaclone.cqg5ikw.mongodb.net/';

const dbName = 'lazadaWebsite';

mongoose.connect(uri);

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("dbName");
    const coll = db.collection("products");
    // find code goes here
    const cursor = coll.find({ hasRings: true });
    // iterate code goes here
    await cursor.forEach(console.log);
  } 

  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
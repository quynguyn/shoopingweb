

// const client = new MongoClient(uri);

// const dbName = '';

const { MongoClient } = require('mongodb');

// Replace the placeholder values with your MongoDB connection string and database name
const uri = 'mongodb+srv://quynguyen:xfqM6RcvtWw22Ozf@lazadaclone.cqg5ikw.mongodb.net/';

const dbName = 'lazadaWebsite';

const client = new MongoClient(uri);

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('products');
  
  console.log(db.client)
  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());


//   const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority";

// const client = new MongoClient(uri);

// client.connect(err => {
//   if (err) throw err;

//   const database = client.db("<database>");

//   database.listCollections().toArray((err, collections) => {
//     if (err) throw err;

//     console.log(`Collections in ${database.databaseName}:`);

//     collections.forEach(collection => {
//       console.log(collection.name);
//     });

//     client.close();
//   });
// });

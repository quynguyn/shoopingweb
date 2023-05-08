const mongoose = require('mongoose');

// Replace the placeholder values with your MongoDB connection string and database name
const uri = 'mongodb+srv://quynguyen:xfqM6RcvtWw22Ozf@lazadaclone.cqg5ikw.mongodb.net/¬lazadaWebsite';

mongoose.connect(uri).then(()=>{
  console.log("ket noi database thanh cong")
})
.catch((error)=>{
  console.log(error.message);
})

mongoose.model("Account").find()

// const dbName = '';

// mongoose.connect(uri);

// const client = new MongoClient(uri);

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('products');
  
//   console.log(db.client)
//   // the following code examples can be pasted here...

//   return 'done.';
// }

// run().catch(console.dir);
const { error } = require('console');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://quynguyen:xfqM6RcvtWw22Ozf@lazadaclone.cqg5ikw.mongodb.net/lazadaWebsite?retryWrites=true&w=majority';

mongoose.connect(uri).then(()=>{
  console.log("ket noi database thanh cong")
})
.catch((error)=>{
  console.log(error.message);
})

run()

async function run(){

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  profilePicture: String,
  businessName: String,
  businessAddress: String,
  address: String,
  name:String,
  distributionHub:String,
  type: String
})


const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  vendor: String,
  distributionHub: String,
})

const productsDatabase = mongoose.model('products',productSchema)
const userAccount = mongoose.model('accounts',userSchema);

module.exports = { userAccount};

module.exports = {productsDatabase};

productsDatabase.find()
.then((product) => {
    console.log(product)
})
.catch((error)=>{
  console.log(error.message)
})
}

// console.log(mongoose.Collection)

// const userSchema = new mongoose.Schema({
//   userName:String,
//   password:String
// })

// mongoose.model("account", userSchema).find()

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
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();


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

const distributionHubSchema = new mongoose.Schema({
  name: String,
  address: String,
})

const uri = 'mongodb+srv://quynguyen:xfqM6RcvtWw22Ozf@lazadaclone.cqg5ikw.mongodb.net/lazadaWebsite?retryWrites=true&w=majority';

mongoose.connect(uri).then(()=>{
  console.log("ket noi database thanh cong")
})
.catch((error)=>{
  console.log(error.message);
})

run()

async function run(){

app.use(cors());


const productsDatabase = mongoose.model('products',productSchema);
const userAccount = mongoose.model('accounts',userSchema);
const distributionHubs = mongoose.model('distributionHubs',distributionHubSchema);


module.exports = { userAccount};
module.exports = {productsDatabase};
module.exports = {distributionHubs}

productsDatabase.find()
.then((product) => {
    console.log(product)
})
.catch((error)=>{
  console.log(error.message)
})

// Define a route that retrieves data from the database
app.get('/Asset/', async (req, res) => {
  try {
    const myData = await MyModel.find();
    res.send(myData);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});


}

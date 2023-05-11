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
	name: String,
	distributionHub: String,
	type: String
})


const productSchema = new mongoose.Schema({
	name: String,
	price: Number,
	image: String,
	description: String,
	vendor: String,
	distributionHub: String
})

const distributionHubSchema = new mongoose.Schema({
	name: String,
	address: String
})

var dataAccount = []
var dataProduct = []
var dataHubs = []


const uri = 'mongodb+srv://quynguyen:xfqM6RcvtWw22Ozf@lazadaclone.cqg5ikw.mongodb.net/lazadaWebsite?retryWrites=true&w=majority';

mongoose.connect(uri).then(() => {
	console.log("Connect to database successful")
})
	.catch((error) => {
		console.log(error.message);
	})

// Use the `express.urlencoded` middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));

run()

async function run() {

	app.use(cors());

	const productsDatabase = mongoose.model('products', productSchema);
	const userAccount = mongoose.model('accounts', userSchema);
	const distributionHubs = mongoose.model('distributionHubs', distributionHubSchema);

	module.exports = { userAccount };
	module.exports = { distributionHubs }
	module.exports = { productsDatabase }

	userAccount.find()
		.then((account) => {
			dataAccount = account
		})
		.catch((error) => {
			console.log(error.message)
		})

	productsDatabase.find()
		.then((product) => {
			dataProduct = product
			console.log(dataProduct)
		})
		.catch((error) => {
			console.log(error.message)
		})

	distributionHubs.find()
		.then((hub) => {
			dataHubs = hub
		})
		.catch((error) => {
			console.log(error.message)
		})

}

app.get('/products', (req, res) => {
	// console.log(data)
	res.send(dataProduct)
})

app.get('/accounts', (req, res) => {
	// console.log(data)
	res.send(dataAccount)
})

app.get('/distributionHubs', (req, res) => {
	// console.log(dataHubs)
	res.send(dataHubs)
})

// start server
app.listen(3000, () => {
	console.log('Server started on port 3000');
});


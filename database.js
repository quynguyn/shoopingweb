const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { copyFileSync } = require('fs');
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

const orderSchema = new mongoose.Schema({
	ordererName: String,
	ordererAddress: String,
	ordererPhone: String,
	productList: [String],
	activity: String,
	hubName: String
})

var dataAccount = []
var dataProduct = []
var dataHubs = []
var orderList = []

const uri = 'mongodb+srv://quynguyen:xfqM6RcvtWw22Ozf@lazadaclone.cqg5ikw.mongodb.net/lazadaWebsite?retryWrites=true&w=majority';

mongoose.connect(uri).then(() => {
	console.log("Connect to database successful")
})
	.catch((error) => {
		console.log(error.message);
	})

// Use the `express.urlencoded` middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const Product = mongoose.model('products', productSchema);
const Account = mongoose.model('accounts', userSchema);
const Hubs = mongoose.model('distributionHubs', distributionHubSchema);
const Order = mongoose.model('orders', orderSchema);

module.exports = { Account };
module.exports = { Hubs };
module.exports = { Product };
module.exports = { Order };

// -----------------------Product-----------------------


app.get('/products', (req, res) => {
	// console.log(data)
	Product.find()
		.then((product) => {
			res.send(product)
		})
		.catch((error) => {
			console.log(error.message)
		})

app.get('/products/:id', (req, res) => {
	Product.findById(req.params.id)
		.then((product) => {
			dataProduct = product
			if (!product) {
				return res.send("Cannot found that ID!");
			}
			res.send(product);
		})
		.catch((error) => res.send(error));
});

// -----------------------Account-----------------------

app.get('/accounts', (req, res) => {
	// console.log(data)
	Account.find()
		.then((accounts) => {
			res.send(accounts)
		})
		.catch((error) => {
			console.log(error.message)
		})
})

app.get('/accounts/:id', (req, res) => {
	Account.findById(req.params.id)
		.then((account) => {
			if (!account) {
				return res.send("Cannot found that ID!");
			}
			res.send(account);
		})
		.catch((error) => res.send(error));
});


// -----------------------Distribution Hub-----------------------
app.get('/distributionHubs', (req, res) => {
	// console.log(dataHubs)
	Hubs.find()
		.then((hubs) => {
			res.send(hubs)
		})
		.catch((error) => {
			console.log(error.message)
		})

}

app.get('/products', (req, res) => {
	// console.log(data)
	Product.find()
		.then((product) => {
			res.send(product)
		})
		.catch((error) => {
			console.log(error.message)
		})
})

app.get('/products/:id', (req, res) => {
	Product.findById(req.params.id)
		.then((product) => {
			if (!product) {
				return res.send("Cannot found that ID!");
			}
			res.send(product);
		})
		.catch((error) => res.send(error));
});

// -----------------------Account-----------------------

app.get('/accounts', (req, res) => {
	// console.log(data)
	Account.find()
		.then((accounts) => {
			res.send(accounts)
		})
		.catch((error) => {
			console.log(error.message)
		})
})

app.get('/accounts/:id', (req, res) => {
	Account.findById(req.params.id)
		.then((account) => {
			if (!account) {
				return res.send("Cannot found that ID!");
			}
			res.send(account);
		})
		.catch((error) => res.send(error));
});


// -----------------------Distribution Hub-----------------------
app.get('/distributionHubs', (req, res) => {
	// console.log(dataHubs)
	Hubs.find()
		.then((hubs) => {
			res.send(hubs)
		})
		.catch((error) => {
			console.log(error.message)
		})
})

// -----------------------Order-----------------------
app.get('/orders', (req, res) => {
	Order.find()
		.then((orders) => {
			res.send(orders)
		})
		.catch((error) => {
			console.log(error.message)
		})
})

app.get('/orders/:id', (req, res) => {
	Order.findById(req.params.id)
		.then((order) => {
			if (!order) {
				return res.send("Cannot found that ID!");
			}
			res.send(order);
		})
		.catch((error) => res.send(error));
});

app.post('/orders', (req, res) => {
	const order = new Order(req.body);
	console.log(req.body);
	order.save()
		.then((order) => res.send(order))
		.catch((error) => res.send(error));
});


// start server
app.listen(3000, () => {
	console.log('Server started on port 3000');
});


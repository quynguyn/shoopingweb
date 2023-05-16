// const { FindCursor } = require("mongodb");
const businessName = JSON.parse(localStorage.getItem('currentUser')).businessName
const itemBoxTemplate = document.querySelector("[item-box-template]")
const itemBoxContainer = document.querySelector("[item-box-container]")

const detailModal = document.querySelector("[detail-dialog]")

function showData(id) {
	const detailTemplate = document.getElementById('detail-template');
	const detailContainer = document.querySelector('.detail-body');

	const templateClone = detailTemplate.content.cloneNode(true);

	const productImage = templateClone.querySelector('.product-image');
	const productName = templateClone.querySelector('.product-name');
	const productPrice = templateClone.querySelector('.price');
	const productDescription = templateClone.querySelector('.description');

	fetch('http://localhost:3000/products/' + id)
		.then(res => res.json())
		.then(data => {
			productImage.src = data.image;
			productName.textContent = data.name;
			productPrice.textContent = '$' + data.price;
			productDescription.textContent = data.description;
			
			detailModal.showModal()
		})
		.catch(error => console.error(error));

	// console.log(products[position]);

	detailContainer.appendChild(templateClone);
}

const closeDataButton = document.querySelector("[closeData]");

closeDataButton.addEventListener('click', () => {
	document.querySelector('.detail-body').innerHTML = '';

	detailModal.close()
});

fetch('http://localhost:3000/products')
	.then(res => res.json())
	.then(data => {
		data.map(product => {
			const box = itemBoxTemplate.content.cloneNode(true).children[0]
			box.id = product._id
			box.onclick = () => showData(box.id)

			const isVisible = product.vendor === businessName
			box.classList.toggle("hide", !isVisible)

			const name = box.querySelector("[item-name]")
			const price = box.querySelector("[item-price]")
			const image = box.querySelector("[item-image]")
			
			name.textContent = product.name
			price.textContent = '$' + product.price
			image.querySelector("img").src = product.image
			// description.textContent = product.description

			itemBoxContainer.append(box)
		})
	})
	.catch(error => console.error(error));

// mongo.connect(url, { useNewUrlParser: true }, (err, db) => {

// 	// Check for connection error
// 	if (err) throw err;

// 	// Specify the collection
// 	const collection = db.collection("products");

// 	// Query the collection for a specific object
// 	collection.find({vendor: "Target"}).toArray(function(err, result) {
// 	  if (err) throw err;
// 	  console.log(result);
// 	  db.close();
// 	});
//   });

// Open html dialog 
const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

openButton.addEventListener('click', () => {
	modal.showModal()
});

closeButton.addEventListener('click', () => {
	modal.close()
});

// submit data form modal
const form = document.querySelector('.inputData');

form.addEventListener('submit', function (e) {
	e.preventDefault(); // prevent the default form submission

	var newProduct = {
		nameValue: "",
		priceValue: 0,
		imageFile: "",
		descriptionValue: "",
	};

	const nameValue = document.getElementById('name').value;
	const priceValue = Number(document.getElementById('price').value); // convert to number
	const imageFile = document.getElementById('image').value; // get the first file selected (if any)
	const descriptionValue = document.getElementById('description').value;

	newProduct.nameValue = nameValue;
	newProduct.priceValue = priceValue;
	newProduct.imageFile = imageFile;
	newProduct.descriptionValue = descriptionValue;

	localStorage.setItem('newProduct', JSON.stringify(newProduct));

	newProductBox(nameValue, priceValue, imageFile, descriptionValue)
	// reset the form
	form.reset();
});

// display new product dynamic
function newProductBox(nameValue, priceValue, imageFile, descriptionValue) {

	const box = document.createElement("div");
	box.classList.add("box");

	const name = document.createElement("div");
	name.classList.add("name");
	name.textContent = nameValue;

	const price = document.createElement("div");
	price.classList.add("price");
	price.textContent = priceValue;

	const imageContainer = document.createElement("div");
	imageContainer.classList.add("image");
	const image = document.createElement("img");
	image.src = imageFile;
	image.alt = nameValue;
	imageContainer.appendChild(image);

	const description = document.createElement("div");
	description.classList.add("description");
	description.textContent = descriptionValue;

	box.appendChild(name);
	box.appendChild(price);
	box.appendChild(imageContainer);
	box.appendChild(description);
	box.classList.add('hover')

	container.appendChild(box);
}
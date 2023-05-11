fetch('http://localhost:3000/products')
  .then(
    response => response.json())
  .then(data => 
	console.log(data)
	)
  .catch(error => console.error(error));


const itemBoxTemplate = document.querySelector("[item-box-template]");
const itemBoxContainer = document.querySelector("[item-box-container]");
const searchInput = document.querySelector("[item-search]");
const aFilter = document.querySelector("[a-filter]");
const cart = document.querySelector('.cart-modal');
var products;

fetch('http://localhost:3000/products')
	.then(res => res.json())
	.then(data => {
		var i = 0;
		products = data;
		var temp = data.map(product => {
			const box = itemBoxTemplate.content.cloneNode(true).children[0]
			box.classList = i + ' ' + box.classList
			i++
			const name = box.querySelector("[item-name]")
			const price = box.querySelector("[item-price]")
			const image = box.querySelector("[item-image]")
			// const description = box.querySelector("[item-description]")
			name.textContent = product.name
			price.textContent = '$' + product.price
			image.querySelector("img").src = product.image
			// description.textContent = product.description

			itemBoxContainer.append(box)
			return {
				name: product.name, price: product.price,
				description: product.description, element: box
			}
		})
	})

/**item search**/
searchInput.addEventListener("input", e => {
	const value = e.target.value.toLowerCase()
	const itemBoxes = document.querySelector(".item-boxes")
	const boxes = itemBoxes.querySelectorAll(".box")
	const test = itemBoxes.querySelectorAll("[item-name]")

	for (var i = 0; i < test.length; i++) {
		const isVisible = test[i].textContent.toLowerCase().includes(value)
		boxes[i].classList.toggle("hide", !isVisible)
	}
})
fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(data => {
        items = data.map(item => {
            const box = itemBoxTemplate.content.cloneNode(true).children[0]
            const name = box.querySelector("[item-name]")
            const price = box.querySelector("[item-price]")
            const image = box.querySelector("[item-image]")
            const description = box.querySelector("[item-description]")
			const id = box.querySelector("[item-id]")
			id.hidden = item.id
            name.textContent = item.name
            price.textContent = item.price
            image.Content = item.image
            description.textContent = item.description
            itemBoxContainer.append(box)           
            return {id: item.id,name: item.name,price: item.price,description: item.description, element: box}
        })
    })

const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]")

// function openModal(position) {
// 	fillData(position);
// 	modal.showModal()
// }

// function closeModal() {
// 	modal.querySelector(".form-body").innerHTML = '';
// 	modal.close()
// }

// //Retrieving data from MongoDB
// const getData = async () => {
// 	try {
// 	  const response = await fetch('http://localhost:3000/accounts');
// 	  const data = await response.json();
// 	  return data;
// 	} catch (err) {
// 	  console.error(err);
// 	}
//   }
  
//   //Using the retrieved data to populate the dialog modal
//   const showDataInModal = async () => {
// 	const data = await getData();
  
// 	let modalContent = '';
// 	data.forEach(item => {
// 	  modalContent += `<div>${item.name}, ${item.age}, ${item.location}</div>`;
// 	});
  
// 	const modal = document.getElementById('modal');
// 	modal.querySelector("[data-modal]") = modalContent;
// 	modal.style.display = 'block';
//   }

function addToCart() {
	const cartContainer = document.querySelector('.form-body');

	const img = cartContainer.querySelector('.product-image').src;
	const name = cartContainer.querySelector('.product-name').textContent;
	const price = cartContainer.querySelector('.price').textContent;
	const description = cartContainer.querySelector('.description').textContent;

	if (typeof (Storage) !== "undefined") {
		var items = JSON.parse(localStorage.getItem("item"));

		var item = '{"img":"' + img + '", "name":"' + name + '", "price": "' +
			price + '", "description":"' + description + '"}';

		if (items !== null) {
			items.push(JSON.parse(item));
			localStorage.setItem("item", JSON.stringify(items));
		} else {
			var item = '[' + item + ']';
			localStorage.setItem("item", item);
		}
	} else {
		// Sorry! No Web Storage support..
	}

	populateCart();

	closeModal();
}

// function fillData(position) {
// 	const itemTemplate = document.getElementById('item-template');
// 	const cartContainer = document.querySelector('.form-body');

// 	const templateClone = itemTemplate.content.cloneNode(true);
// 	const productImage = templateClone.querySelector('.product-image');
// 	const productName = templateClone.querySelector('.product-name');
// 	const productPrice = templateClone.querySelector('.price');
// 	const productDescription = templateClone.querySelector('.description');

	productImage.src = products[position].image;
	productName.textContent = products[position].name;
	productPrice.textContent = products[position].price;
	productDescription.textContent = products[position].description;

	cartContainer.appendChild(templateClone);
}

function openCart() {
	populateCart();
	cart.show();
}

function closeCart() {
	document.querySelector('.cart-body').innerHTML = '';
	cart.close();
}

function checkOutCart() {
	var items = JSON.parse(localStorage.getItem("item"));

	if (items == null) {
		alert("Cart is empty.");
	} else {
		localStorage.removeItem("item");
		alert("Check out successful.");
	}

	document.querySelector('#total-price').textContent = 0;
	closeCart();
}

function populateCart() {
	const cartTemplate = document.getElementById('cart-template');
	const cartContainer = document.querySelector('.cart-body');
	cartContainer.innerHTML = '';

	var items = JSON.parse(localStorage.getItem("item"));

	if (items != null) {
		var i = 0;
		var total = 0;
		items.forEach(item => {
			const templateClone = cartTemplate.content.cloneNode(true);
			templateClone.querySelector('.cart-item').classList = i + ' ' + templateClone.querySelector('.cart-item').classList;
			i++;
			const productImage = templateClone.querySelector('.product-image');
			const productName = templateClone.querySelector('.product-name');
			const productPrice = templateClone.querySelector('.product-price');

			productImage.src = item.img;
			productName.textContent = item.name;
			productPrice.textContent = item.price;
			total += parseInt(item.price.replace('$', ""));

			cartContainer.appendChild(templateClone);
		});

		document.querySelector('#total-price').textContent = total;
	}
}

function removeItem(index) {
	var items = JSON.parse(localStorage.getItem("item"));

	if (index > -1) { // only splice array when item is found
		items.splice(index, 1); // 2nd parameter means remove one item only
	}

	localStorage.setItem("item", JSON.stringify(items));

	document.querySelector('.cart-body').innerHTML = '';
	populateCart();
}

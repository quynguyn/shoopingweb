const itemBoxTemplate = document.querySelector("[item-box-template]");
const itemBoxContainer = document.querySelector("[item-box-container]");

const searchInput = document.querySelector("[item-search]");
const aFilter = document.querySelector("[a-filter]");

const cart = document.querySelector('#cart-modal');

const descendButton = document.querySelector('#descend')
const ascendButton = document.querySelector('#ascend')

const searchBar = document.querySelector('.search-bar #search')

const cartBody = document.querySelector(".cart-body");
const cartTemplate = document.getElementById("cart-template");
const cartDetails = cartBody.querySelector(".order-detail")

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

let rangeMin = 10;
const rangeInput = document.querySelectorAll(".range-input input");
const rangePrice = document.querySelectorAll(".range-price input");

const range = document.querySelector(".range-selected");
range.style.left =  "0%";
range.style.right = "0%";

descendButton.onclick = function () {
	itemBoxContainer.innerHTML = ''

	fetch('http://localhost:3000/products/descending')
		.then(res => res.json())
		.then(data => {
			data.map(product => {
				const box = itemBoxTemplate.content.cloneNode(true).children[0]
				box.id = product._id
				box.onclick = () => openModal(box.id)

				const name = box.querySelector("[item-name]")
				const price = box.querySelector(".price")
				const image = box.querySelector(".image")

				name.textContent = product.name
				price.textContent = '$' + product.price
				image.querySelector("img").src = product.image

				itemBoxContainer.append(box)
				priceSlider(rangePrice[0].value, rangePrice[1].value)
				searchItem(searchBar.value)
			})
		})
}

ascendButton.onclick = function () {
	itemBoxContainer.innerHTML = ''

	fetch('http://localhost:3000/products/ascending')
		.then(res => res.json())
		.then(data => {
			data.map(product => {
				const box = itemBoxTemplate.content.cloneNode(true).children[0]
				box.id = product._id
				box.onclick = () => openModal(box.id)

				const name = box.querySelector("[item-name]")
				const price = box.querySelector(".price")
				const image = box.querySelector(".image")

				name.textContent = product.name
				price.textContent = '$' + product.price
				image.querySelector("img").src = product.image

				itemBoxContainer.append(box)
				priceSlider(rangePrice[0].value, rangePrice[1].value)
				searchItem(searchBar.value)
			})
		})
}

setCartDetails()

fetch('http://localhost:3000/products')
	.then(res => res.json())
	.then(data => {
		data.map(product => {
			const box = itemBoxTemplate.content.cloneNode(true).children[0]
			box.id = product._id
			box.onclick = () => openModal(box.id)

			const name = box.querySelector("[item-name]")
			const price = box.querySelector(".price")
			const image = box.querySelector(".image")

			name.textContent = product.name
			price.textContent = '$' + product.price
			image.querySelector("img").src = product.image

			itemBoxContainer.append(box)
		})
	})

function setProductList() {
	const productList = cartDetails.querySelector('#productList')
	productList.value = ''

	if (typeof Storage !== "undefined") {
		var items = JSON.parse(localStorage.getItem("item"));

		if (items !== null) {
			items.forEach(item => {
				productList.value += item.id + '/'
			})
		}
	} else {
		// Sorry! No Web Storage support..
	}
}

function setCartDetails() {
	const ordererName = cartDetails.querySelector('#ordererName')
	const ordererAddress = cartDetails.querySelector('#ordererAddress')
	const activity = cartDetails.querySelector('#activity')
	const hubName = cartDetails.querySelector('#hubName')

	setProductList()

	ordererName.value = currentUser.name
	ordererAddress.value = currentUser.address
	activity.value = 'active'
	hubList = ['New York Distribution Hub', 'Los Angeles Distribution Hub', 'Chicago Distribution Hub']
	hubName.value = hubList[getRandomInteger(0, 3)]
}

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/**item search**/
searchInput.addEventListener("input", (e) => {
	searchItem(e.target.value.toLowerCase())
});

function searchItem(value) {
	const itemBoxes = document.querySelector(".item-boxes");
	const boxes = itemBoxes.querySelectorAll(".box");
	const test = itemBoxes.querySelectorAll("[item-name]");

	for (var i = 0; i < test.length; i++) {
		const isVisible = test[i].textContent.toLowerCase().includes(value);
		boxes[i].classList.toggle("search-hide", !isVisible);
	}
}

rangeInput.forEach((input) => {
	input.addEventListener("input", (e) => {
		let minRange = parseInt(rangeInput[0].value);
		let maxRange = parseInt(rangeInput[1].value);
		if (maxRange - minRange < rangeMin) {
			if (e.target.className === "min") {
				rangeInput[0].value = maxRange - rangeMin;
			} else {
				rangeInput[1].value = minRange + rangeMin;
			}
		} else {
			rangePrice[0].value = minRange;
			rangePrice[1].value = maxRange;
			range.style.left = (minRange / rangeInput[0].max) * 100 + "%";
			range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
		}

		priceSlider(rangePrice[0].value, rangePrice[1].value)
	});
});

rangePrice.forEach((input) => {
	input.addEventListener("input", (e) => {
		let minPrice = rangePrice[0].value;
		let maxPrice = rangePrice[1].value;
		if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
			if (e.target.className === "min") {
				rangeInput[0].value = minPrice;
				range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
			} else {
				rangeInput[1].value = maxPrice;
				range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
			}
		}

		priceSlider(rangePrice[0].value, rangePrice[1].value)
	});
});

function priceSlider(minPrice, maxPrice) {
	const itemBoxes = document.querySelector(".item-boxes");
	const boxes = itemBoxes.querySelectorAll(".box");
	const price = itemBoxes.querySelectorAll(".price");

	for (var i = 0; i < price.length; i++) {
		const productPrice = parseFloat(price[i].textContent.replace("$", ""));
		const isVisible = productPrice <= maxPrice && productPrice >= minPrice;
		boxes[i].classList.toggle("slider-hide", !isVisible);
	}
}

const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

function openModal(id) {
	fillData(id);
}

function closeModal() {
	modal.querySelector(".detail-body").innerHTML = "";
	modal.close();
}

function addToCart(id) {
	const cartContainer = document.querySelector(".detail-body");

	const img = cartContainer.querySelector(".product-image").src;
	const name = cartContainer.querySelector(".product-name").textContent;
	const price = cartContainer.querySelector(".price").textContent;
	const description = cartContainer.querySelector(".description").textContent;

	if (typeof Storage !== "undefined") {
		var items = JSON.parse(localStorage.getItem("item"));

		var item = '{"id": "' + id +
			'", "img":"' + img +
			'", "name":"' + name +
			'", "price": "' + price +
			'", "description":"' + description + '"}';

		if (items !== null) {
			items.push(JSON.parse(item));
			localStorage.setItem("item", JSON.stringify(items));
		} else {
			var item = "[" + item + "]";
			localStorage.setItem("item", item);
		}
	} else {
		// Sorry! No Web Storage support..
	}

	populateCart();

	closeModal();
}

function fillData(id) {
	const itemTemplate = document.getElementById('item-template');
	const cartContainer = document.querySelector('.detail-body');
	cartContainer.id = id;

	const templateClone = itemTemplate.content.cloneNode(true);
	const productImage = templateClone.querySelector(".product-image");
	const productName = templateClone.querySelector(".product-name");
	const productPrice = templateClone.querySelector(".price");
	const productDescription = templateClone.querySelector(".description");

	fetch('http://localhost:3000/products/' + id)
		.then(res => res.json())
		.then(data => {
			productImage.src = data.image;
			productName.textContent = data.name;
			productPrice.textContent = '$' + data.price;
			productDescription.textContent = data.description;
			modal.showModal()
		})
		.catch(error => console.error(error));

	cartContainer.appendChild(templateClone);
}

var isCartOpen = false;

function clickCart() {
	if (isCartOpen) {
		closeCart()
	} else {
		openCart();
	}
}

function openCart() {
	isCartOpen = true
	populateCart();
	cart.show();
}

function closeCart() {
	isCartOpen = false
	cartBody.querySelector(".items-list").innerHTML = "";
	cart.close();
}

function checkOutCart() {
	cartBody.submit()
	var items = JSON.parse(localStorage.getItem("item"));
	console.log(items);

	if (items == null) {
		alert("Cart is empty.");
	} else {
		localStorage.removeItem("item");
		alert("Check out successful.");
	}

	document.querySelector("#total-price").textContent = 0;
	closeCart();
}

function populateCart() {
	setProductList()
	const cartContainer = cartBody.querySelector(".items-list");

	cartContainer.innerHTML = "";

	var items = JSON.parse(localStorage.getItem("item"));

	if (items != null) {
		var i = 0;
		var total = 0;
		items.forEach((item) => {
			const templateClone = cartTemplate.content.cloneNode(true);
			templateClone.querySelector(".cart-item").id = i;
			i++;
			const productImage = templateClone.querySelector(".product-image");
			const productName = templateClone.querySelector(".product-name");
			const productPrice = templateClone.querySelector(".product-price");

			productImage.src = item.img;
			productName.textContent = item.name;
			productPrice.textContent = item.price;
			total += parseFloat(item.price.replace("$", ""));

			cartContainer.appendChild(templateClone);
		});

		document.querySelector("#total-price").textContent = total.toFixed(2);
	}
}

function removeItem(index) {
	var items = JSON.parse(localStorage.getItem("item"));

	if (index > -1) {
		// only splice array when item is found
		items.splice(index, 1); // 2nd parameter means remove one item only
	}

	localStorage.setItem("item", JSON.stringify(items));

	cartBody.querySelector(".items-list").innerHTML = "";
	populateCart();
}


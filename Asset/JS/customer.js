const itemBoxTemplate = document.querySelector("[item-box-template]");
const itemBoxContainer = document.querySelector("[item-box-container]");
const searchInput = document.querySelector("[item-search]");
const aFilter = document.querySelector("[a-filter]");
const cart = document.querySelector('#cart-modal');

fetch('http://localhost:3000/products/descending')
	.then(res => res.json())
	.then(data => {
		console.log(data);
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

// fetch('http://localhost:3000/products')
// 	.then(res => res.json())
// 	.then(data => {
// 		data.map(product => {
// 			const box = itemBoxTemplate.content.cloneNode(true).children[0]
// 			box.id = product._id
// 			box.onclick = () => openModal(box.id)

// 			const name = box.querySelector("[item-name]")
// 			const price = box.querySelector(".price")
// 			const image = box.querySelector(".image")

// 			name.textContent = product.name
// 			price.textContent = '$' + product.price
// 			image.querySelector("img").src = product.image

// 			itemBoxContainer.append(box)
// 		})
// 	})

/**item search**/
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const itemBoxes = document.querySelector(".item-boxes");
  const boxes = itemBoxes.querySelectorAll(".box");
  const test = itemBoxes.querySelectorAll("[item-name]");

  for (var i = 0; i < test.length; i++) {
    const isVisible = test[i].textContent.toLowerCase().includes(value);
    boxes[i].classList.toggle("hide", !isVisible);
  }
});

const slider = document.querySelector("#range-slider");
const currentValue = document.querySelector(".current-value");
currentValue.innerHTML = "$" + slider.value;

slider.oninput = function () {
  currentValue.innerHTML = "$" + this.value;
  const itemBoxes = document.querySelector(".item-boxes");
  const boxes = itemBoxes.querySelectorAll(".box");
  const price = itemBoxes.querySelectorAll(".price");
  const sliderValue = parseFloat(this.value);

  for (var i = 0; i < price.length; i++) {
    const productPrice = parseFloat(price[i].textContent.replace("$", ""));
    const isVisible = productPrice <= sliderValue;
    boxes[i].classList.toggle("hide", !isVisible);
  }
};

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

function addToCart() {
  const cartContainer = document.querySelector(".detail-body");

  const img = cartContainer.querySelector(".product-image").src;
  const name = cartContainer.querySelector(".product-name").textContent;
  const price = cartContainer.querySelector(".price").textContent;
  const description = cartContainer.querySelector(".description").textContent;

  if (typeof Storage !== "undefined") {
    var items = JSON.parse(localStorage.getItem("item"));

    var item =
      '{"img":"' +
      img +
      '", "name":"' +
      name +
      '", "price": "' +
      price +
      '", "description":"' +
      description +
      '"}';

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

function openCart() {
  populateCart();
  cart.show();
}

function closeCart() {
  document.querySelector(".cart-body").innerHTML = "";
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

  document.querySelector("#total-price").textContent = 0;
  closeCart();
}

function populateCart() {
  const cartTemplate = document.getElementById("cart-template");
  const cartContainer = document.querySelector(".cart-body");
  cartContainer.innerHTML = "";

  var items = JSON.parse(localStorage.getItem("item"));

  if (items != null) {
    var i = 0;
    var total = 0;
    items.forEach((item) => {
      const templateClone = cartTemplate.content.cloneNode(true);
      templateClone.querySelector(".cart-item").classList =
        i + " " + templateClone.querySelector(".cart-item").classList;
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

  document.querySelector(".cart-body").innerHTML = "";
  populateCart();
}

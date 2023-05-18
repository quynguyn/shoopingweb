const businessName = JSON.parse(localStorage.getItem("currentUser")).businessName;

const itemBoxTemplate = document.querySelector("[item-box-template]");
const itemBoxContainer = document.querySelector("[item-box-container]");

const detailModal = document.querySelector("[detail-dialog]");

const noProduct = document.querySelector("#no-product");

function showData(id) {
	const detailTemplate = document.getElementById("detail-template");
	const detailContainer = document.querySelector(".detail-body");

	const templateClone = detailTemplate.content.cloneNode(true);

	const productImage = templateClone.querySelector(".product-image");
	const productName = templateClone.querySelector(".product-name");
	const productPrice = templateClone.querySelector(".price");
	const productDescription = templateClone.querySelector(".description");

	fetch("http://localhost:3000/products/" + id)
		.then((res) => res.json())
		.then((data) => {
			productImage.src = data.image;
			productName.textContent = data.name;
			productPrice.textContent = "$" + data.price;
			productDescription.textContent = data.description;

			detailModal.showModal();
		})
		.catch((error) => console.error(error));

	detailContainer.appendChild(templateClone);
}

const closeDataButton = document.querySelector("[closeData]");

closeDataButton.addEventListener("click", () => {
	document.querySelector(".detail-body").innerHTML = "";

	detailModal.close();
});

fetch("http://localhost:3000/products/vendor/" + businessName)
	.then((res) => res.json())
	.then((data) => {
		if (data.message == null) {
			data.map((product) => {
				const box = itemBoxTemplate.content.cloneNode(true).children[0];
				box.id = product._id;
				box.onclick = () => showData(box.id);

				const name = box.querySelector("[item-name]");
				const price = box.querySelector("[item-price]");
				const image = box.querySelector("[item-image]");

				name.textContent = product.name;
				price.textContent = "$" + product.price;
				image.querySelector("img").src = product.image;

				itemBoxContainer.append(box);
			});
		} else {
			noProduct.classList = ''
		}
	})
	.catch((error) => console.error(error));

// Open html dialog
const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");
document.querySelector("#vendor").value = businessName;

openButton.addEventListener("click", () => {
	modal.showModal();
});

closeButton.addEventListener("click", () => {
	modal.close();
});

// submit data form modal
const form = document.querySelector(".inputData");

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
	box.classList.add("hover");

	container.appendChild(box);
}

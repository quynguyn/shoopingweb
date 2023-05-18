const infoDialog = document.querySelector("[order-detail]");
const orderTemplate = document.querySelector(".order-box");
const orderContainer = document.querySelector(".orders-container");
const detailTemplate = document.querySelector(".order-details");
const detailContainer = document.querySelector(".info-body");
const confirmDialog = document.querySelector("#confirm-dialog");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userHub = currentUser.distributionHub;

fetch("http://localhost:3000/orders")
	.then((res) => res.json())
	.then((data) => {
		data.map((order) => {
			if (order.hubName == userHub && order.activity == "active") {
				const box = orderTemplate.content.cloneNode(true).children[0];
				box.id = order._id;

				var totalPrice = 0;
				const name = box.querySelector(".name");
				const address = box.querySelector(".address");
				const price = box.querySelector(".order-price");

				name.textContent = order.ordererName;
				address.textContent = order.ordererAddress;
				price.textContent = ''

				const listProduct = JSON.stringify(order.productList)
					.split('"')[1]
					.split("/");
				listProduct.pop();

				listProduct.forEach((product) => {
					fetch("http://localhost:3000/products/" + product)
						.then((res) => res.json())
						.then((data) => {
							totalPrice += parseFloat(data.price);
							price.textContent = totalPrice.toFixed(2);
						})
						.catch((error) => {
							console.log(error.message);
						});
				});
				price.textContent = order.ordererPhone;

				orderContainer.appendChild(box);
			}
		});
	})
	.catch((error) => {
		console.log(error.message);
	});

function openModal(id) {
	fetch("http://localhost:3000/orders/" + id + "/update")
		.then((res) => res.json())
		.then((data) => {
			uri = "http://localhost:3000/orders/" + id + "/update";
			// action="/product//update"
			const form = detailContainer.querySelector(".activity-form");
			form.action = uri;
			const hubName = form.querySelector("#hubName");
			const name = form.querySelector("#ordererName");
			const address = form.querySelector("#ordererAddress");
			const productList = form.querySelector(".information-column .order-list");
			const orderList = form.querySelector("#productList");
			const price = form.querySelector(".total-price");
			const activity = form.querySelector("#activity option[value=delivered]");

			hubName.value = userHub;
			var totalPrice = 0;
			name.value = data.ordererName;
			address.value = data.ordererAddress;
			orderList.value = "";
			const listProduct = JSON.stringify(data.productList)
				.split('"')[1]
				.split("/");
			listProduct.pop();

			listProduct.forEach((product) => {
				fetch("http://localhost:3000/products/" + product)
					.then((res) => res.json())
					.then((data) => {
						const product = document.createElement("li");
						product.textContent = data.name;
						orderList.value += data._id + "/";

						productList.appendChild(product);

						totalPrice += parseFloat(data.price);
						price.textContent = "$" + totalPrice.toFixed(2);
					})
					.catch((error) => {
						console.log(error.message);
					});
			});
			activity.selected = "selected";
		})
		.catch((error) => {
			console.log(error.message)
		})

	fetch("http://localhost:3000/orders/" + id + "/update")
		.then((res) => res.json())
		.then((data) => {
		})
		.catch((error) => {
			console.log(error.message);
		});

	infoDialog.showModal();
}

function closeModal() {
	console.log("close modal")
	detailContainer.querySelector("#ordererName").value = "";
	detailContainer.querySelector("#ordererAddress").value = "";
	detailContainer.querySelector(".order-list").innerHTML = "";
	console.log(detailContainer.querySelector(".total-price"))
	detailContainer.querySelector(".total-price").textContent = "0";

	infoDialog.close();
}

function confirmCancel(activity) {
	const box = document.querySelector(".orders-container");
	box.querySelector("#activity option[value='" + activity + "']").selected = "selected";

	if (activity == "canceled") {
		confirmDialog.showModal();
	}
}

function closeConfirm() {
	const activity = document.querySelector("#activity option[value='active']");
	activity.selected = "selected";
	confirmDialog.close();
}

function cancelOrder() {
	confirmDialog.close();
}

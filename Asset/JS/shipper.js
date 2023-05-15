const infoDialog = document.querySelector("[order-detail]");
const orderTemplate = document.querySelector(".order-box");
const orderContainer = document.querySelector(".orders-container");
const detailTemplate = document.querySelector(".order-details");
const detailContainer = document.querySelector(".info-body");
const confirmDialog = document.querySelector("#confirm-dialog")

const currentUser = JSON.parse(localStorage.getItem('currentUser'))
const userHub = currentUser.distributionHub

fetch('http://localhost:3000/orders')
	.then(res => res.json())
	.then(data => {
		data.map(order => {
			if (order.hubName == userHub && order.activity == 'active') {
				const box = orderTemplate.content.cloneNode(true).children[0]
				box.id = order._id

				const name = box.querySelector(".name")
				const address = box.querySelector(".address")
				const phone = box.querySelector(".phone")

				name.textContent = order.ordererName
				address.textContent = order.ordererAddress
				phone.textContent = order.ordererPhone

				orderContainer.appendChild(box)
			}
		})
	})
	.catch((error) => {
		console.log(error.message)
	})

function openModal(id) {
	fetch('http://localhost:3000/orders/' + id)
		.then(res => res.json())
		.then(data => {
			// action="/product//update"
			const form = detailContainer.querySelector(".activity-form")
			form.action = "http://localhost:3000/orders/" + id + "/update"
			const name = detailContainer.querySelector(".information .name")
			const address = detailContainer.querySelector(".information .address")
			const phone = detailContainer.querySelector(".information .phone")
			const productList = detailContainer.querySelector(".information-column .order-list")
			const price = detailContainer.querySelector(".information .total-price")
			const activity = detailContainer.querySelector(".information #activities option[value=delivered]")
			const submitButton = detailContainer.querySelector(".information .submit-button button")

			var totalPrice = 0
			name.textContent = data.ordererName
			address.textContent = data.ordererAddress
			phone.textContent = data.ordererPhone

			data.productList.forEach(product => {
				fetch('http://localhost:3000/products/' + product)
					.then(res => res.json())
					.then(data => {
						const product = document.createElement("li")
						product.textContent = data.name

						productList.appendChild(product)

						totalPrice += parseFloat(data.price)
						price.textContent = totalPrice.toFixed(2)
					})
			});
			activity.selected = "selected"

			// detailContainer.addEventListener("submit", changeActivity, false)
		})
	// .catch((error) => {
	// 	console.log(error.message)
	// })

	infoDialog.showModal();
}

function closeModal() {
	detailContainer.querySelector(".information .name").textContent = ''
	detailContainer.querySelector(".information .address").textContent = ''
	detailContainer.querySelector(".information .phone").textContent = ''
	detailContainer.querySelector(".information-column .order-list").innerHTML = ''
	detailContainer.querySelector(".information .total-price").textContent = '0'

	infoDialog.close();
}

// function changeActivity() {
// 	const box = document.querySelector(".orders-container")
// 	const chosenActivity = box.querySelector("#activities option").textContent
// 	const activity = box.querySelector("#activities option[value='" + chosenActivity + "']")
// 	activity.selected = "selected"
// }

function confirmCancel(activity) {
	const box = document.querySelector(".orders-container")
	box.querySelector("#activities option[value='" + activity + "']").selected = "selected"

	console.log(box.querySelector("#activities"))
	if (activity == 'canceled') {
		confirmDialog.showModal()
	}
}

function closeConfirm() {
	const activity = document.querySelector("#activities option[value='active']")
	console.log(activity)
	activity.selected = "selected"
	confirmDialog.close()
}

function cancelOrder() {
	confirmDialog.close()
}
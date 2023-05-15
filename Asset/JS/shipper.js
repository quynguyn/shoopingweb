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
	fetch('http://localhost:3000/orders/' + id + "/update")
		.then(res => res.json())
		.then(data => {
			uri = "http://localhost:3000/orders/" + id + "/update"
			// action="/product//update"
			const form = detailContainer.querySelector(".activity-form")
			form.action = uri
			const name = form.querySelector("#name")
			const address = form.querySelector("#address")
			const phone = form.querySelector("#phone")
			const productList = form.querySelector("#order-list")
			const price = form.querySelector("#total-price")
			const activity = form.querySelector("#activities option[value=delivered]")
			const submitButton = form.querySelector("#submit-button button")

			console.log(name)
			var totalPrice = 0
			name.value = data.ordererName
			address.value = data.ordererAddress
			phone.value = data.ordererPhone
			
			data.productList.forEach(product => {
				fetch('http://localhost:3000/products/' + product)
					.then(res => res.json())
					.then(data => {
						const product = document.createElement("li")
						product.textContent = data.name

						productList.appendChild(product)

						totalPrice += parseFloat(data.price)
						price.value = totalPrice.toFixed(2)
					})
			});
			activity.selected = "selected"

			// detailContainer.addEventListener("submit", changeActivity, false)
		})
	// .catch((error) => {
	// 	console.log(error.message)
	// })

	fetch('http://localhost:3000/orders/' + id + '/update')
		.then(res => res.json())
		.then(data => {console.log(data)})
	.catch((error) => {
		console.log(error.message)
	})

	infoDialog.showModal();
}

function closeModal() {
	detailContainer.querySelector("#name").textContent = ''
	detailContainer.querySelector("#address").textContent = ''
	detailContainer.querySelector("#phone").textContent = ''
	detailContainer.querySelector("#order-list").innerHTML = ''
	detailContainer.querySelector("#total-price").textContent = '0'

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
const infoDialog = document.querySelector(".info-modal");
const orderTemplate = document.querySelector(".order-box");
const orderContainer = document.querySelector(".orders-container");
const detailTemplate = document.querySelector(".order-details");
const detailContainer = document.querySelector(".info-body");

fetch('http://localhost:3000/orders')
	.then(res => res.json())
	.then(data => {
		data.map(order => {
			const box = orderTemplate.content.cloneNode(true).children[0]
			box.id = order._id
			box.onclick = () => openModal(box.classList[0])

			const name = box.querySelector(".name")
			const address = box.querySelector(".address")
			const phone = box.querySelector(".phone")

			name.textContent = order.ordererName
			address.textContent = order.ordererAddress
			phone.textContent = order.ordererPhone

			orderContainer.appendChild(box)
		})
	})

function openModal(id) {
	fetch('http://localhost:3000/orders/' + "645df570e442508778a61e10")
		.then(res => res.json())
		.then(data => {
			const box = detailTemplate.content.cloneNode(true).children[0]
			box.id = data._id

			const name = box.querySelector(".name")
			const address = box.querySelector(".address")
			const phone = box.querySelector(".phone")
			const productList = box.querySelector(".order-list")
			const price = box.querySelector(".total-price")
			console.log(price)

			const activity = box.querySelector("#activities option[value=" + data.activity + "]")
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

			detailContainer.appendChild(box)
		})
		.catch((error) => {
			console.log(error.message)
		})

	infoDialog.showModal();
}
function closeModal() {
	document.querySelector('.info-body').innerHTML = '';
	infoDialog.close();
}
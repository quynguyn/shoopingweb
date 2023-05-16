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

        const name = box.querySelector(".name");
        const address = box.querySelector(".address");
        const phone = box.querySelector(".phone");

        name.textContent = order.ordererName;
        address.textContent = order.ordererAddress;
        phone.textContent = order.ordererPhone;

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
      const phone = form.querySelector("#ordererPhone");
      const productList = form.querySelector(".information-column .order-list");
      const orderList = form.querySelector("#productList");
      const price = form.querySelector(".total-price");
      const activity = form.querySelector("#activity option[value=delivered]");
      const submitButton = form.querySelector("#submit-button button");

      hubName.value = userHub;
      var totalPrice = 0;
      name.value = data.ordererName;
      address.value = data.ordererAddress;
      phone.value = data.ordererPhone;
      orderList.value = "";
      const listProduct = JSON.stringify(data.productList)
        .split('["')[1]
        .split('"]')[0]
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
            price.textContent = totalPrice.toFixed(2);
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
      activity.selected = "selected";

      // detailContainer.addEventListener("submit", changeActivity, false)
    });
  // .catch((error) => {
  // 	console.log(error.message)
  // })

  fetch("http://localhost:3000/orders/" + id + "/update")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error.message);
    });

  infoDialog.showModal();
}

function closeModal() {
  detailContainer.querySelector("#ordererName").value = "";
  detailContainer.querySelector("#ordererAddress").value = "";
  detailContainer.querySelector("#ordererPhone").value = "";
  detailContainer.querySelector(".order-list").innerHTML = "";
  detailContainer.querySelector(".total-price").textContent = "0";

  infoDialog.close();
}

// function changeActivity() {
// 	const box = document.querySelector(".orders-container")
// 	const chosenActivity = box.querySelector("#activities option").textContent
// 	const activity = box.querySelector("#activities option[value='" + chosenActivity + "']")
// 	activity.selected = "selected"
// }

function confirmCancel(activity) {
  const box = document.querySelector(".orders-container");
  box.querySelector("#activity option[value='" + activity + "']").selected =
    "selected";

  console.log(box.querySelector("#activity"));
  if (activity == "canceled") {
    confirmDialog.showModal();
  }
}

function closeConfirm() {
  const activity = document.querySelector("#activities option[value='active']");
  console.log(activity);
  activity.selected = "selected";
  confirmDialog.close();
}

function cancelOrder() {
  confirmDialog.close();
}

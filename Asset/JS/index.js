// to open and close the modal
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
var newQuestion = false;

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    

    openModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".form-modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

// decide which div of the radio to be appear
const vendorRadio = document.querySelector('input[value="vendor"]');
const customerRadio = document.querySelector('input[value="customer"]');
const shipperRadio = document.querySelector('input[value="shipper"]');

const vendorDiv = document.querySelector('#vendor-div');
const customerDiv = document.querySelector('#customer-div');
const shipperDiv = document.querySelector('#shipper-div');

function showDiv() {
    if (vendorRadio.checked) {
      vendorDiv.style.display = "block";
    } else {
      vendorDiv.style.display = "none";
    }
  
    if (customerRadio.checked) {
      customerDiv.style.display = "block";
    } else {
      customerDiv.style.display = "none";
    }
  
    if (shipperRadio.checked) {
      shipperDiv.style.display = "block";
    } else {
      shipperDiv.style.display = "none";
    }
  }
  
vendorRadio.addEventListener("change", showDiv);
customerRadio.addEventListener("change", showDiv);
shipperRadio.addEventListener("change", showDiv);
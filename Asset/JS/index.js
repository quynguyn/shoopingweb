// Variable 

const vendorRadio = document.querySelector('input[value="vendor"]');
const customerRadio = document.querySelector('input[value="customer"]');
const shipperRadio = document.querySelector('input[value="shipper"]');

const vendorDiv = document.querySelector('#vendor-div');
const customerDiv = document.querySelector('#customer-div');
const shipperDiv = document.querySelector('#shipper-div');


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
  uncheck();
}

// decide which div of the radio to be appear

var check = ""

function showDiv() {
    if (vendorRadio.checked) {
      vendorDiv.style.display = "block";
      check = 'vendor'
    } else {
      vendorDiv.style.display = "none";
    }
  
    if (customerRadio.checked) {
      customerDiv.style.display = "block";
      check = 'customer'

    } else {
      customerDiv.style.display = "none";
    }
  
    if (shipperRadio.checked) {
      shipperDiv.style.display = "block";
      check = 'shipper'
    } else {
      shipperDiv.style.display = "none";
    }
  }
  
vendorRadio.addEventListener("change", showDiv);
customerRadio.addEventListener("change", showDiv);
shipperRadio.addEventListener("change", showDiv);

// clear all the check

function uncheck(){
  vendorRadio.checked = false;
  customerRadio.checked = false;
  shipperRadio.checked = false;

  check=""

  vendorDiv.style.display = "none";
  customerDiv.style.display = "none";
  shipperDiv.style.display = "none";
}

// password toggle 

function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const toggleButton = document.querySelector('.toggle-password');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleButton.textContent = "⊻";
  } else {
    passwordInput.type = 'password';
    toggleButton.textContent = "⊼";
;
  }
}

// Checking if the account is exits
function logIn (username, password){
  const myValue = localStorage.getItem(username);
  if(myValue === null)
  {
    return false;
  }
  else{
    return true;
  }
}

// Log in button 
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent form submission from refreshing the page
  var username = form.email.value; 
  var password = form.password.value;
  console.log(logIn(username,password))
  if(logIn(username,password)==false){
    displayErrorMessage();
  }
  else{
    // Open a new HTML file called "new-page.html"
    form.email.value = null;
    form.password.value = null;
    window.location.href = "myAccount.html";
  }
});

// wrong username and password
const messageClass = 'wrongInput';
const messageText = '*Enter your username and password correctly';

function displayErrorMessage() {
  // Check if there is already a message element
  const existingMessage = document.querySelector(`.${messageClass}`);
  if (existingMessage) {
    return; // Exit the function if a message element already exists
  }
  
  // Add the 'invalid' class to the form and display the error message
  form.classList.add('invalid');
  const message = document.createElement('p');
  message.textContent = messageText;
  message.classList.add(messageClass);
  form.appendChild(message);
  
  // Remove the 'invalid' class and the error message after a delay
  setTimeout(() => {
    form.classList.remove('invalid');
    message.remove();
  }, 3000);
}


// add new account for vendor
function addNewVendor(){
  var newVendor = {
    username: "",
    password: 30,
    profilePicture: "",
    businessName: "",
    businessAddress: ""
  };
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('passwordNew').value;
  const profilePicture = document.getElementById('profile-picture').value;
  const businessName = document.getElementById('business-name').value;
  const businessAddress = document.getElementById('business-address').value;

  newVendor.username = username;
  newVendor.password = password;
  newVendor.profilePicture = profilePicture;
  newVendor.businessName = businessName;
  newVendor.businessAddress = businessAddress;
  // Convert object to string and save to local storage
  localStorage.setItem('newVendor', JSON.stringify(newVendor));
}

// add new account for customer
function addNewCustomer(){
  var newCustormer = {
    username: "",
    password: 0,
    profilePicture: "",
    address: "",
    name: ""
  };
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('passwordNew').value;
  const profilePicture = document.getElementById('profile-picture').value;
  const address = document.getElementById('address').value;
  const name = document.getElementById('name').value;

  newCustormer.username = username;
  newCustormer.password = password;
  newCustormer.profilePicture = profilePicture;
  newCustormer.address = address;
  newCustormer.name = name;
  // Convert object to string and save to local storage
  localStorage.setItem('newCustomer', JSON.stringify(newCustormer));
}

// add new account for shipper
function addNewShipper(){
  var newShipper = {
    username: "",
    password: 0,
    profilePicture: "",
    distributionHub: "",
  };
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('passwordNew').value;
  const profilePicture = document.getElementById('profile-picture').value;
  const distributionHub = document.getElementById('distribution-hub').value;
 

  newShipper.username = username;
  newShipper.password = password;
  newShipper.profilePicture = profilePicture;
  newShipper.distributionHub = distributionHub;
  // Convert object to string and save to local storage
  localStorage.setItem('newShipper', JSON.stringify(newShipper));
}

// create new account
function addNewAccount() {
  var message ="congratulation, please log in your account";
  switch (check) {
    case "vendor":
      // code for vendor type
      addNewVendor();
      alert(message)
      break;
    case "customer":
      // code for customer type
      addNewCustomer()
      alert(message)
      break;
      
    case "shipper":
      // code for shipper type
      addNewShipper()
      alert(message)
      break;

    default:
      // code for unknown type
      console.log("Unknown user type");
      break;
  }
  
}

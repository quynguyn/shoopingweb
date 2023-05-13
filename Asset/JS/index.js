//working on database // in index.js

// index.js
// use dataEndpoint in your code


/**

fetch('http://localhost:3000/distributionHubs')
  .then(
    response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

 */


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

accountUserType = ""
var loginCheck;
let accountCheck = null;
// Checking if the account is exits

// Log in button 
function logIn(event) {
  event.preventDefault();
  var username = form.email.value; 
  var password = form.password.value; 

  fetch('http://localhost:3000/accounts')
    .then(response => response.json())
    .then(data => {
      accountCheck = data.find(account => account.username === username && account.password === password);
      if(accountCheck === undefined) {
        loginCheck = false;
        clickSubmit();
      }
      else {
        accountUserType = accountCheck.type;
        loginCheck = true;
        clickSubmit(); // call clickSubmit() function here
      }
    })
    .catch(error => console.error(error));
}
export { accountCheck };

function clickSubmit() {
  if(loginCheck === false) {
    displayErrorMessage();
  }
  else if(loginCheck === true) {
    form.email.value = null;
    form.password.value = null;
   
    if(accountUserType === 'vendor') {
      
      window.location.href = "vendor.html";
    }
    else if(accountUserType === 'customer') {
      window.location.href = "customer.html";
    }
    else if(accountUserType === 'shipper') {

      window.location.href = "shipper.html";
    }
    else {
      alert("Do not have the user type")
    }
  }
}

const form = document.querySelector('form');
form.addEventListener('submit', logIn);

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
    username: String,
    password: Number,
    profilePicture: String,
    businessName: String,
    businessAddress: String
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


  addToDataBase(newVendor);

  // Convert object to string and save to local storage
  localStorage.setItem('newVendor', JSON.stringify(newVendor));
}

// add new account for customer
function addNewCustomer(){
  var newCustormer = {
    username: String,
    password: Number,
    profilePicture:String,
    address: String,
    name: String
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

  addToDataBase(newCustormer);
  // Convert object to string and save to local storage
  localStorage.setItem('newCustomer', JSON.stringify(newCustormer));
}

function displayDistributionHubs(){
  // need to read data from distribution hub so that the 
  // need to make the selector to be dynamic
  // * selector can be run and check display
}

// add new account for shipper
function addNewShipper(){
  var newShipper = {
    username: String,
    password: Number,
    profilePicture: String,
    distributionHub: String,
  };
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('passwordNew').value;
  const profilePicture = document.getElementById('profile-picture').value;
  const distributionHub = document.getElementById('distribution-hub').value;
  /** 
   *  displayDistributionHubs()
   */
 

  newShipper.username = username;
  newShipper.password = password;
  newShipper.profilePicture = profilePicture;
  newShipper.distributionHub = distributionHub;
  // Convert object to string and save to local storage

  /*


    ở đây đã có object thì chỉ cần pass cái object này vào cái 
    insert của database

    phải dùng function save trước khi 
  */

    addToDataBase(newShipper);

  localStorage.setItem('newShipper', JSON.stringify(newShipper));
}

function addToDataBase (object){

}


var fullInformation  = false; 
// create new account
function addNewAccount() {
  var message ="congratulation, please log in your account";
  switch (check) {
    case "vendor":
      // code for vendor type
      addNewVendor();
      fullInformation = true;
      break;
    case "customer":
      // code for customer type
      addNewCustomer()
      fullInformation = true; 
      break;
      
    case "shipper":
      // code for shipper type
      addNewShipper()
      fullInformation = true;
      break;

    default:
      // code for unknown type
      fullInformation = false;
      console.log("Unknown user type");
      break;
  }
  if(fullInformation){
    alert(message)
  }
  else{
    alert("Please fill in information")
  }
}

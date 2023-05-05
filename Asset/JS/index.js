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

// clear all the check

function uncheck(){
  vendorRadio.checked = false;
  customerRadio.checked = false;
  shipperRadio.checked = false;

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

// add new account into the local storage as key and value
function addNewAccount( name, password){

  const newAccount = { name: 'John', age: 30 };
  localStorage.setItem('myObject', JSON.stringify(myObject));
  
  const storedObject = JSON.parse(localStorage.getItem('myObject'));
  console.log(storedObject.name); // outputs 'John'
  

}

// Checking if the account is exits
function logIn (username, password){
  const myValue = localStorage.getItem('username');
  console.log(myValue);
  if(myValue === null)
  {
    console.log('false');
    return false;
  }
  else{
    console.log('true');
    return true;
  }
}

// Log in button 
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent form submission from refreshing the page
  const username = form.email.value; // get the value of the email input
  const password = form.password.value; // get the value of the password input
  
  if(logIn(username,password)==false){
    form.classList.add('invalid')
    const message = document.createElement('p');
  message.textContent = '*Enter your username and password correctly';
  message.classList.add('wrongInput');
  form.appendChild(message);
  setTimeout(() => {
    form.classList.remove('animated');
  }, 300);
  }

});

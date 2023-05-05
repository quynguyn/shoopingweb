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
  const username = form.email.value; 
  const password = form.password.value;
  console.log(logIn(username,password))
  if(logIn(username,password)==false){
    displayErrorMessage();
  }
  else{
    // Open a new HTML file called "new-page.html"
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


// Variable
const vendorRadio = document.querySelector('input[value="vendor"]');
const customerRadio = document.querySelector('input[value="customer"]');
const shipperRadio = document.querySelector('input[value="shipper"]');

const vendorDiv = document.querySelector("#vendor-div");
const customerDiv = document.querySelector("#customer-div");
const shipperDiv = document.querySelector("#shipper-div");

// to open and close the modal
const openModalButtons = document.querySelector("#open-register");
const closeModalButtons = document.querySelectorAll("[data-close-button]");

const registerForm = document.querySelector('#register-form')

const registerDialog = document.querySelector('#modal')
function openModal() {
	registerDialog.showModal()
}

function closeModal() {
	registerDialog.close()
	uncheck();
}

// decide which div of the radio to be appear
function showDiv() {
	var accountUserType = "";

	vendorDiv.classList.toggle("hide", !vendorRadio.checked);
	customerDiv.classList.toggle("hide", !customerRadio.checked);
	shipperDiv.classList.toggle("hide", !shipperRadio.checked);

	if (vendorRadio.checked) {
		accountUserType = "vendor";
	} else {
		document.getElementById("businessName").value = '';
		document.getElementById("businessAddress").value = '';
	}

	if (customerRadio.checked) {
		accountUserType = "customer";
	} else {
		document.getElementById("address").value = '';
		document.getElementById("name").value = '';
	}

	if (shipperRadio.checked) {
		accountUserType = "shipper";
	} else {
		document.getElementById("distributionHub").value = '';
	}

	document.querySelector('#type').value = accountUserType

	return accountUserType;
}

vendorRadio.addEventListener("change", showDiv);
customerRadio.addEventListener("change", showDiv);
shipperRadio.addEventListener("change", showDiv);

// clear all the check
function uncheck() {
	vendorRadio.checked = false;
	customerRadio.checked = false;
	shipperRadio.checked = false;

	vendorDiv.style.display = "none";
	customerDiv.style.display = "none";
	shipperDiv.style.display = "none";
}

// password toggle
function togglePasswordVisibility(i) {
	var passwordInput
	var toggleButton

	if (i === 1) {
		passwordInput = document.getElementById("password");
		toggleButton = document.querySelector(".toggle-password");
	} else {
		passwordInput = document.getElementById("passwordNew");
		toggleButton = document.querySelector(".toggle-passwordNew");
		console.log(toggleButton);
	}

	if (passwordInput.type === "password") {
		passwordInput.type = "text";
		toggleButton.textContent = "⊻";
	} else {
		passwordInput.type = "password";
		toggleButton.textContent = "⊼";
	}
}

// Log in button
function logIn(event) {
	event.preventDefault();
	const username = form.email.value;
	const password = form.password.value;

	fetch("http://localhost:3000/accounts")
		.then((response) => response.json())
		.then((data) => {
			const accountCheck = data.find(
				(account) =>
					account.username === username && account.password === password
			);

			if (accountCheck === undefined) {
				displayErrorMessage();
			} else {
				localStorage.setItem("currentUser", JSON.stringify(accountCheck));

				form.email.value = '';
				form.password.value = '';

				window.location.href = accountCheck.type + ".html";
			}
		})
		.catch((error) => console.error(error));
}

const form = document.querySelector("form");
form.addEventListener("submit", logIn);

// wrong username and password
const messageClass = "wrongInput";
const messageText = "*Enter your username and password correctly";

function displayErrorMessage() {
	// Check if there is already a message element
	const existingMessage = document.querySelector(`.${messageClass}`);
	if (existingMessage) {
		return; // Exit the function if a message element already exists
	}

	// Add the 'invalid' class to the form and display the error message
	form.classList.add("invalid");
	const message = document.createElement("p");
	message.textContent = messageText;
	message.classList.add(messageClass);
	form.appendChild(message);

	// Remove the 'invalid' class and the error message after a delay
	setTimeout(() => {
		form.classList.remove("invalid");
		message.remove();
	}, 3000);
}

function onlyLettersAndNumbers(str) {
	return /^[A-Za-z0-9]*$/.test(str);
}

const usernameInput = document.getElementById("username");
usernameInput.onfocus = function () {
	document.querySelector("#username-message").style.display = "block";
}
usernameInput.onblur = function () {
	document.querySelector("#username-message").style.display = "none";
}
usernameInput.addEventListener("input", (e) => {
	const username = e.target.value
	var letter = document.querySelector("#username-message #u-letter");
	var number = document.querySelector("#username-message #u-number");
	var length = document.querySelector("#username-message #u-length");

	const lowerCaseLetters = /[a-zA-z]/g;
	const numbers = /[0-9]/g;
	const minimumLength = (username.length >= 8) && (username.length <= 15)

	letter.classList.toggle("valid", username.match(lowerCaseLetters));
	letter.classList.toggle("invalid", !username.match(lowerCaseLetters));

	number.classList.toggle("valid", username.match(numbers));
	number.classList.toggle("invalid", !username.match(numbers));

	length.classList.toggle("valid", minimumLength);
	length.classList.toggle("invalid", !minimumLength);
});
usernameInput.addEventListener("input", (e) => {
	const username = e.target.value

	if (username != '' && onlyLettersAndNumbers(username)) {
		fetch('http://localhost:3000/accounts/findUsername/' + username)
			.then(res => res.json())
			.then(data => {
				if (data.length > 0) {
					console.log("Username already exist")
				} else {
					if (username.length >= 8 && username.length <= 15) {
						console.log("Username can be used")
					} else if (username.length < 8) {
						console.log("Username is too short")
					} else {
						console.log("Username is too long")
					}
				}
			})
	}
});

const passwordInput = document.querySelector("#passwordNew");
passwordInput.onfocus = function () {
	document.querySelector("#password-message").style.display = "block";
}
passwordInput.onblur = function () {
	document.querySelector("#password-message").style.display = "none";
}

passwordInput.addEventListener("input", (e) => {
	const password = e.target.value
	var letter = document.querySelector("#password-message #p-letter");
	var capital = document.querySelector("#password-message #p-capital");
	var number = document.querySelector("#password-message #p-number");
	var special = document.querySelector("#password-message #p-special");
	var length = document.querySelector("#password-message #p-length");

	const lowerCaseLetters = /[a-z]/g;
	const upperCaseLetters = /[A-Z]/g;
	const numbers = /[0-9]/g;
	const specialLetters = /[!@#$%^&]/g;
	const minimumLength = (password.length >= 8) && (password.length <= 20)

	letter.classList.toggle("valid", password.match(lowerCaseLetters));
	letter.classList.toggle("invalid", !password.match(lowerCaseLetters));

	capital.classList.toggle("valid", password.match(upperCaseLetters));
	capital.classList.toggle("invalid", !password.match(upperCaseLetters));

	number.classList.toggle("valid", password.match(numbers));
	number.classList.toggle("invalid", !password.match(numbers));

	special.classList.toggle("valid", password.match(specialLetters));
	special.classList.toggle("invalid", !password.match(specialLetters));

	length.classList.toggle("valid", minimumLength);
	length.classList.toggle("invalid", !minimumLength);
});


function submitRegisterForm() {
	var message = "congratulation, please log in your account";

	if (addNewAccount(showDiv())) {
		alert(message);
		registerForm.submit()
	} else {
		console.log("Unknown user type");
		alert("Please fill in information");
	}
}

function addNewAccount(accountType) {
	const username = document.getElementById("username").value != '';
	const password = document.getElementById("passwordNew").value != '';
	const profilePicture = document.getElementById("profilePicture").value != '';

	if (accountType == "vendor") {
		const businessName = document.getElementById("businessName").value != '';
		const businessAddress = document.getElementById("businessAddress").value != '';

		return username && password && profilePicture && businessName && businessAddress;
	} else if (accountType == "customer") {
		const address = document.getElementById("address").value != '';
		const name = document.getElementById("name").value != '';

		return username && password && profilePicture && address && name;
	} else if (accountType == "shipper") {
		const distributionHub = document.getElementById("distribution-hub").value != '';

		return username && password && profilePicture && distributionHub;
	}
}
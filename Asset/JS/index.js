// Variable
const vendorRadio = document.querySelector('input[value="vendor"]');
const customerRadio = document.querySelector('input[value="customer"]');
const shipperRadio = document.querySelector('input[value="shipper"]');

const vendorDiv = document.querySelector("#vendor-div");
const customerDiv = document.querySelector("#customer-div");
const shipperDiv = document.querySelector("#shipper-div");

// to open and close the modal
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

const registerForm = document.querySelector('#register-form')

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
	// overlay.classList.add("active");
}

function closeModal(modal) {
	if (modal == null) return;
	modal.classList.remove("active");
	// overlay.classList.remove("active");
	uncheck();
}

// decide which div of the radio to be appear
function showDiv() {
	var accountUserType = "";

	if (vendorRadio.checked) {
		vendorDiv.style.display = "block";
		accountUserType = "vendor";
	} else {
		vendorDiv.style.display = "none";
	}

	if (customerRadio.checked) {
		customerDiv.style.display = "block";
		accountUserType = "customer";
	} else {
		customerDiv.style.display = "none";
	}

	if (shipperRadio.checked) {
		shipperDiv.style.display = "block";
		accountUserType = "shipper";
	} else {
		shipperDiv.style.display = "none";
	}

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
function togglePasswordVisibility() {
	const passwordInput = document.getElementById("password");
	const toggleButton = document.querySelector(".toggle-password");

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
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

const userType = currentUser.type;

window.onload = function () {
	checkDataChange();
};

function checkDataChange() {
	if (cU != undefined) {
		fetch('http://localhost:3000/accounts/' + user._id)
			.then(res => res.json())
			.then(data => {
				localStorage.setItem('currentUser', JSON.stringify(data))
				currentUser = JSON.parse(localStorage.getItem('currentUser'))
				fillData();
			})
			.catch(error => console.error(error));
	}
}

const userTypeDiv = document.querySelectorAll('[user-type]')

userTypeDiv.forEach((div) => {
	const isVisible = div.id.split("-")[0] == userType;
	div.classList.toggle("hide", !isVisible);
});

const avatar = document.querySelector('.avatar img')
const avatarLink = document.querySelector('.avatar #profilePicture')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const businessName = document.querySelector('#businessName')
const businessAddress = document.querySelector('#businessAddress')
const address = document.querySelector('#address')
const uName = document.querySelector('#name')
const distributionHub = document.querySelector('#distributionHub')

const form = document.getElementById("account-information")

fillData()

function fillData() {
	form.action = "http://localhost:3000/accounts/" + currentUser._id + "/update"
	avatar.src = currentUser.profilePicture
	username.value = currentUser.username
	password.value = currentUser.password

	if (userType == 'vendor') {
		businessName.value = currentUser.businessName
		businessAddress.value = currentUser.businessAddress
	} else if (userType == 'customer') {
		address.value = currentUser.address
		uName.value = currentUser.name
	} else {
		const hubName = currentUser.distributionHub
		const activity = distributionHub.querySelector("option[value='" + hubName + "']")
		activity.selected = 'selected'
	}
}

function logOut() {
	localStorage.removeItem("currentUser");
	window.location.href = "index.html";
}

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

const passwordInput = document.querySelector("#password");
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
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

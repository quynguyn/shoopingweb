var currentUser = JSON.parse(localStorage.getItem('currentUser'))

const userType = currentUser.type

const userTypeDiv = document.querySelectorAll('[user-type]')

userTypeDiv.forEach(div => {
	const isVisible = div.id.split('-')[0] == userType
	div.classList.toggle("hide", !isVisible)
});

const avatar = document.querySelector('.avatar img')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const businessName = document.querySelector('#business-name')
const businessAddress = document.querySelector('#business-address')
const address = document.querySelector('#address')
const uName = document.querySelector('#name')
const distributionHub = document.querySelector('#distribution-hub')

const form = document.getElementById("account-information")
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
	const hubName = currentUser.distributionHub.replace(' Distribution Hub', '')
	const activity = distributionHub.querySelector("option[value='" + hubName + "']")
	activity.selected = 'selected'
}

function logOut() {
	localStorage.removeItem('currentUser')
	window.location.href = "index.html";
}

// businessAddress
// :
// "789 Main St, Anytown USA"
// businessName
// :
// "Target"
// password
// :
// "12345"
// profilePicture
// :
// "https://logos-world.net/wp-content/uploads/2020/10/Target-Logo-1968-present.png"
// type
// :
// "vendor"
// username
// :
// "target"
// _id
// :
// "645787c5e4ed3fc36045c6dd"
const cU = localStorage.getItem("currentUser");
const user = JSON.parse(cU);

const element = document.body;

const currentURL = window.location.href.split("/")
const currentPage = currentURL[currentURL.length - 1].split(".")[0]

const hideDialog = document.querySelector("#hide-dialog");

const homepage = document.querySelector('header .logo a')
const homepageHome = document.querySelector('header #home-link')
const header = document.querySelector('header')
const footerRow = document.querySelectorAll('footer div')
const footerRowText = document.querySelectorAll('footer div div div li')
const darkButton = document.querySelector('header div button')

if (cU != undefined) {
	homepage.href = user.type + ".html";
	if (homepageHome != null) {
		homepageHome.href = user.type + ".html";
	}

	if (user.type != currentPage && hideDialog != null) {
		hideDialog.showModal();
	}
} else {
	if (currentPage != "index") {
		window.location.href = "index.html";
	}
}

function changeToCurrentPage() {
	hideDialog.close();
	window.location.href = user.type + ".html";
}

function toggleDark() {
	element.classList.toggle("dark-mode");
	header.classList.toggle("dark-div");
	footerRow.forEach(row => {
		row.classList.toggle("dark-div");
	})
	footerRowText.forEach(row => {
		row.classList.toggle("dark-div");
	})
}
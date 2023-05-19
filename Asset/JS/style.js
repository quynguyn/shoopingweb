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

var isDark = false;

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
var isDark = false;

if (localStorage.getItem('theme') == undefined) {
	isDark = false;
}

function toggleDark() {
	isDark = !isDark;
	if (isDark) {
		localStorage.setItem('theme', 'dark');
	} else {
		localStorage.setItem('theme', 'light');
	}

}
const helpImg = document.querySelector('.help img');

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
toggleSwitch.addEventListener('change', switchTheme);

if (currentTheme) {
	document.documentElement.setAttribute('data-theme', currentTheme);
	if (currentTheme === 'dark') {
		toggleSwitch.checked = true;
		toggleDark()
	} else {
		toggleLight()
	}
}

function switchTheme(e) {
	if (e.target.checked) {
		toggleDark()
	} else {
		toggleLight()
	}
}

function toggleDark() {
	element.classList.add("dark-mode");
	header.classList.add("dark-div");
	footerRow.forEach(row => {
		row.classList.add("dark-div");
	})
	footerRowText.forEach(row => {
		row.classList.add("dark-div");
	})

	if (hideDialog != null) {
		document.querySelector(".form-dialog").classList.add("dark-div");
	}
	localStorage.setItem('theme', 'dark');
	document.documentElement.setAttribute('data-theme', 'dark');
	helpImg.src = "Asset/IMG/Logo/logo-white.png"
}

function toggleLight() {
	element.classList.remove("dark-mode");
	header.classList.remove("dark-div");
	footerRow.forEach(row => {
		row.classList.remove("dark-div");
	})
	footerRowText.forEach(row => {
		row.classList.remove("dark-div");
	})

	if (hideDialog != null) {
		document.querySelector(".form-dialog").classList.remove("dark-div");
	}
	localStorage.setItem('theme', 'light');
	document.documentElement.setAttribute('data-theme', 'light');
	helpImg.src = "Asset/IMG/Logo/logo-black.png"
}

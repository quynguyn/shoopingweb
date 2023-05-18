const cU = localStorage.getItem("currentUser");
const user = JSON.parse(cU);

const currentURL = window.location.href.split("/")
const currentPage = currentURL[currentURL.length - 1].split(".")[0]

const hideDialog = document.querySelector("#hide-dialog");

const homepage = document.querySelector('header .logo a')
const homepageHome = document.querySelector('header #home-link')


if (cU != undefined) {
	homepage.href = user.type + ".html";
	homepageHome.href = user.type + ".html";

	if (user.type != currentPage && currentPage != "myAccount" && currentPage != "index" && currentPage != "") {
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

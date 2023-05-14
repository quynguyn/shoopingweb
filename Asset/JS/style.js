const cU = localStorage.getItem('currentUser')
const user = JSON.parse(cU)

const currentURL = window.location.href.split("/")
const currentPage = currentURL[currentURL.length - 1].split(".")[0]

const hideDialog = document.querySelector("#hide-dialog")

if (cU != undefined) {
	document.querySelector("#log-in-li").classList.toggle("hide", true)
	if (user.type != currentPage){
		hideDialog.showModal()
	}
} else {
}

function changeToCurrentPage() {
	hideDialog.close()
	window.location.href = user.type + ".html";
}
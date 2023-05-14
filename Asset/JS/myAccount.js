function logOut() {
	localStorage.removeItem('currentUser')
	window.location.href = "index.html";
}
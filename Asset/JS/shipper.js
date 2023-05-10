const $ = document.querySelector.bind(document);
const infoDialog = document.querySelector(".info-modal");

function popupFunction() {
	// const target = e.target;
	// const parent = target.closest('div.order');
	// const childs = parent.childNodes;
	// var data = childs[3].childNodes;
	// const txt = [...data].filter((d) => d.className === 'information');

	// for (var i = 0; i < txt.length; i++) {
	// 	$('#info-popup .body').innerHTML += txt[i].innerText + '<br>';
	// }
	// $('#info-dialog').classList.add('info-popup-data');
	infoDialog.showModal();
}
function closeModal() {
	infoDialog.close();
}
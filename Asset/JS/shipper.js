const $ = document.querySelector.bind(document);
const mdl = $('#info-popup');

function popupFunction(e) {
	const target = e.target;
	const parent = target.closest('div.order');
	const childs = parent.childNodes;
	var data = childs[3].childNodes;
	const txt = [...data].filter((d) => d.className === 'information');

	for (var i = 0; i < txt.length; i++) {
		$('#info-popup .body').innerHTML += txt[i].innerText + '<br>';
	}
	$('#info-popup').classList.add('info-popup-data');
}
function closeModal(e) {
	$('#info-popup .body').innerHTML = '';

	$('#info-popup').classList.remove('info-popup-data');
}
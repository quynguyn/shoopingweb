const $ = document.querySelector.bind(document);
const mdl = $('#info-popup');

function popupFunction(e) {
  const targ = e.target;
  const prnt = targ.closest('div.order');
  const chldn = prnt.childNodes;
  const txt = [...chldn].filter((d) => d.className === 'popupText');
  const msg = txt.;
  $('#info-popup .body').innerText = msg;
  $('#info-popup').classList.add('info-popup-data');
}
function closeModal(e){
  e.target.classList.remove('info-popup-data');
}
const $ = document.querySelector.bind(document);
const mdl = $('#info-popup');

function popupFunction(e) {
  const targ = e.target;
  const prnt = targ.closest('div.order');
  const chldn = prnt.childNodes;
  pr
  const txt = [...chldn].filter((d) => d.className === 'popupText');
  const msg = txt[0].innerText;
  $('#info-popup .body').innerText = msg;
  $('#info-popup').classList.add('modalHasContent');
}
function closeModal(e){
  e.target.classList.remove('modalHasContent');
}
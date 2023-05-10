function openModalcart() {
  var dialog = document.getElementById("cart-dialog");
  dialog.classList.add("show");

  var cartItems = [
    { image: "https://images2.alphacoders.com/640/640690.jpg", name: "awfagwaqwhawhasdasdasghaw", price: "$1000" },
    { image: "https://w0.peakpx.com/wallpaper/528/719/HD-wallpaper-sword-katana-ninja-samurai.jpg", name: "whahasdawhawhads", price: "$2000" },
    { image: "https://wallpapercave.com/wp/wp2504223.jpg", name: "ghjsdgfdjdrjhtw43", price: "$300" },
    { image: "https://images5.alphacoders.com/594/594950.jpg", name: "wgagwagwasg", price: "$3000" }
  ];

  var template = document.getElementById("cart-template");
  var templateContent = template.content;
  var cartBody = document.querySelector(".form-body.inputData");











  cartBody.innerHTML = ""; //fixable later

  cartItems.forEach(function (item) {
    var clone = templateContent.cloneNode(true);
    clone.querySelector(".product-image").src = item.image;
    clone.querySelector(".product-name").textContent = item.name;
    clone.querySelector(".product-price").textContent = item.price;

    cartBody.appendChild(clone);
  });
}

function closeModalcart() {
  var dialog = document.getElementById("cart-dialog");
  dialog.classList.remove("show");
}
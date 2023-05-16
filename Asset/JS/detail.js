// Open and close the modal form
document.addEventListener("DOMContentLoaded", function () {
  const productDetailButton = document.getElementById("product-detail-button");
  const modalForm = document.querySelector("dialog[data-modal]");

  productDetailButton.addEventListener("click", function () {
    modalForm.showModal();
  });
});

// Change images by clicking the arrows
document.addEventListener("DOMContentLoaded", function () {
  const currentImage = document.getElementById("current-image");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const addToCartButton = document.querySelector(".add-to-cart");
  const cartItemsCount = document.querySelector(".cart-items-count");

  let currentImageIndex = 0;

  // CartCount start = 0
  let cartCount = 0;
  //

  function updateImage() {
    currentImage.src = imageUrls[currentImageIndex];
  }

  prevButton.addEventListener("click", function () {
    currentImageIndex =
      (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
    updateImage();
  });

  nextButton.addEventListener("click", function () {
    currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
    updateImage();
  });

  // Add to cart button
  addToCartButton.addEventListener("click", function () {
    cartCount++;
    cartItemsCount.textContent = cartCount;

    const productName = document.getElementById("product-name").textContent;
    const productPrice = document.getElementById("product-price").textContent;

    const productInfo = {
      name: productName,
      price: productPrice,
    };

    console.log("Product added to cart:", productInfo);

    showToast("Product added to cart!");
  });

  // Drop-down small menu when click on the cart
  const cartToggle = document.querySelector(".cart-toggle");
  const cartDropdown = document.querySelector(".cart-dropdown");
  const cartItemsList = document.querySelector(".cart-items-list");

  cartToggle.addEventListener("click", function () {
    cartDropdown.classList.toggle("active");
  });

  addToCartButton.addEventListener("click", function () {
    const cartItem = document.createElement("li");
    cartItem.textContent = productName;
    cartItemsList.appendChild(cartItem);
  });

  // Clear cart button
  const deleteButton = document.querySelector(".delete-button");

  deleteButton.addEventListener("click", function () {
    cartCount = 0;
    cartItemsCount.textContent = cartCount;

    console.log("Cart cleared!");

    showToast("Cart cleared!");
  });

  //pop-up message design
  function showToast(message) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "bottom",
      position: "right",
      close: true,
      stopOnFocus: true,
      newWindow: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }

  // image urls
  const imageUrls = [
    "https://bizweb.dktcdn.net/100/056/311/products/69325855-2853966461301514-8349733151492276224-n.jpg?v=1569232918883",
    "https://m.media-amazon.com/images/I/61I0+HchVNL._AC_UF1000,1000_QL80_.jpg",
    "https://lh5.googleusercontent.com/yf9X7sSPIEG0_CcPbU3vG9saNAPrCUx1vMdg6nfZk6wCUDMUpweJml3ANHRl879phkgSEPddStkKLDOKlj7Z1b3Up816jSx8GF0tyzh9nY_6r81A_6RN7d7aymVrvc8Ux_-vfki-",
    "https://media.istockphoto.com/id/1005374664/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-thanh-ki%E1%BA%BFm-katana.jpg?s=170667a&w=0&k=20&c=TWRD6k5eBxIkwHYIq5JqQkt0vS_FcG9wICT7hyP_nCc=",
    "https://www.dragonsports.eu/531982-verylarge_default/katana-bushido-orochi-sharpened.jpg",
  ];
});

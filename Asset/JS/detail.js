document.addEventListener("DOMContentLoaded", function () {
    const currentImage = document.getElementById("current-image");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const addToCartButton = document.querySelector(".add-to-cart");
    const cartItemsCount = document.querySelector(".cart-items-count");

    let currentImageIndex = 0;
    let cartCount = 0;

    function updateImage() {
        currentImage.src = imageUrls[currentImageIndex];
    }

    prevButton.addEventListener("click", function () {
        currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
        updateImage();
    });

    nextButton.addEventListener("click", function () {
        currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
        updateImage();
    });

    addToCartButton.addEventListener("click", function () {
        cartCount++;
        cartItemsCount.textContent = cartCount;

        const productName = document.getElementById("product-name").textContent;
        const productPrice = document.getElementById("product-price").textContent;

        const productInfo = {
            name: productName,
            price: productPrice
        };

        console.log("Product added to cart:", productInfo);

        showToast("Product added to cart!");
    });

    function showToast(message) {
        Toastify({
            text: message,
            duration: 3000,
            gravity: "top",
            position: "right",
        }).showToast();
    }

    const imageUrls = [
        "https://bizweb.dktcdn.net/100/056/311/products/69325855-2853966461301514-8349733151492276224-n.jpg?v=1569232918883",
        "https://m.media-amazon.com/images/I/61I0+HchVNL._AC_UF1000,1000_QL80_.jpg",
        "https://lh5.googleusercontent.com/yf9X7sSPIEG0_CcPbU3vG9saNAPrCUx1vMdg6nfZk6wCUDMUpweJml3ANHRl879phkgSEPddStkKLDOKlj7Z1b3Up816jSx8GF0tyzh9nY_6r81A_6RN7d7aymVrvc8Ux_-vfki-",
    ];
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

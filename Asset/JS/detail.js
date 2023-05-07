
const currentImage = document.getElementById("current-image");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

const imageUrls = [
    "https://bizweb.dktcdn.net/100/056/311/products/69325855-2853966461301514-8349733151492276224-n.jpg?v=1569232918883",
    "https://m.media-amazon.com/images/I/61I0+HchVNL._AC_UF1000,1000_QL80_.jpg",
    "https://lh5.googleusercontent.com/yf9X7sSPIEG0_CcPbU3vG9saNAPrCUx1vMdg6nfZk6wCUDMUpweJml3ANHRl879phkgSEPddStkKLDOKlj7Z1b3Up816jSx8GF0tyzh9nY_6r81A_6RN7d7aymVrvc8Ux_-vfki-",
];

let currentImageIndex = 0;

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

const optionCategories = document.querySelectorAll(".option-category");
const addToCartButton = document.querySelector(".add-to-cart");

const selectedOptions = {};

function handleOptionClick(event) {
    const clickedButton = event.target;
    const category = clickedButton.dataset.category;
    const option = clickedButton.dataset.option;

    if (selectedOptions[category] === option) {
        delete selectedOptions[category];
        clickedButton.classList.remove("active");
    } else {
        selectedOptions[category] = option;

        const categoryButtons = event.currentTarget.querySelectorAll(`[data-category="${category}"]`);
        categoryButtons.forEach((button) => {
            button.classList.remove("active");
        });

        clickedButton.classList.add("active");
    }
}

document.addEventListener("click", function (event) {
    if (event.target.matches(".option-button")) {
        handleOptionClick(event);
    }
});

function handleAddToCartClick() {
    const categoryKeys = Object.keys(selectedOptions);
    const numCategories = optionCategories.length;
    if (categoryKeys.length === numCategories) {

        const item = {
            name: document.querySelector(".product-name").textContent,
            price: document.querySelector(".price").textContent,
            options: selectedOptions,
        };
        addToCart(item);

        console.log("Product added to cart.", item);
        Toastify({
            text: "Product added to cart.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
                background: "#f05e16",
            },
            stopOnFocus: true,
        }).showToast();

    } else {
        Toastify({
            text: "Please select an option from each category before adding to cart.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
                background: "#f05e16",
            },
            stopOnFocus: true,
        }).showToast();

        console.log("Please select an option from each category before adding to cart.");
    }
}

addToCartButton.addEventListener("click", handleAddToCartClick);


const cartToggle = document.querySelector(".cart-toggle");
const miniCart = document.querySelector(".mini-cart");
const cartItemsList = document.querySelector(".cart-items-list");
const cartItemsCount = document.querySelector(".cart-items-count");
const cartTotalAmount = document.querySelector(".total-amount");
const checkoutButton = document.querySelector(".checkout-button");

const cartItems = [];

function addToCart(item) {
    cartItems.push(item);
    renderCartItems();
    updateCartSummary();
}

function removeCartItem(index) {
    cartItems.splice(index, 1);
    renderCartItems();
    updateCartSummary();
}

function renderCartItems() {
    cartItemsList.innerHTML = "";
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
      <div class="item-info">
        <p class="item-name">${item.name}</p>
        <p class="item-options">${formatOptions(item.options)}</p>
        <p class="item-price">${item.price}</p>
      </div>
      <button class="remove-button" onclick="removeCartItem(${index})">Remove</button>
    `;
        cartItemsList.appendChild(cartItem);
    });
}

function updateCartSummary() {
    cartItemsCount.textContent = cartItems.length;
    const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
    cartTotalAmount.textContent = formatPrice(totalAmount);
}

function formatOptions(options) {
    return Object.entries(options)
        .map(([category, option]) => `${category}: ${option}`)
        .join(", ");
}

function formatPrice(price) {
    return "$" + price.toFixed(2);
}

function toggleMiniCart() {
    miniCart.classList.toggle("open");
}

function checkout() {
    console.log("Checkout functionality placeholder.");
}

cartToggle.addEventListener("click", toggleMiniCart);
checkoutButton.addEventListener("click", checkout);
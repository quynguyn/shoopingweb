function openModal() {
    const modal = document.querySelector('[data-modal]');


    populateCart();

    modal.showModal();

}

function closeModal() {
    const modal = document.querySelector('[data-modal]');


    const cartContainer = document.querySelector('.form-body');
    cartContainer.innerHTML = '';

    modal.close();

}





const products = [
    {
        image: 'https://visanuocngoai.vn/wp-content/uploads/2021/11/katana-la-dao-hay-kiem-1.jpg',
        name: 'Productawdsahgawgfawgawfrawgawgsad',
        price: '$5125126124'
    },
    {
        image: 'https://lh5.googleusercontent.com/ryHEICas-EC_85WFGfzWtoTZKNQITzNBr288vev4gvYg3VoQZJ-8ParpfWpHRR93x1zQeeaFotLueZ-zx4j1I1cLTPkZ_tWmlH1Xtv5Oa5IYafYD75p7BpHscDOxDf9ndYhG2JpBad6kZDcgmR9VAHd2qb7HV2ksDuyPFPqOLLGUpcAlOL6ekC_4qA',
        name: 'Producasdasdagawgawgawgahaht',
        price: '$1123123'
    },
];

function populateCart() {
    const cartTemplate = document.getElementById('cart-template');
    const cartContainer = document.querySelector('.form-body');

    cartContainer.innerHTML = '';

    products.forEach(product => {
        const templateClone = cartTemplate.content.cloneNode(true);
        const productImage = templateClone.querySelector('.product-image');
        const productName = templateClone.querySelector('.product-name');
        const productPrice = templateClone.querySelector('.product-price');

        productImage.src = product.image;
        productName.textContent = product.name;
        productPrice.textContent = product.price;

        cartContainer.appendChild(templateClone);
    });
}




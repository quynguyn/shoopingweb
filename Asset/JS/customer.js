


const itemBoxTemplate = document.querySelector("[item-box-template]");
const itemBoxContainer = document.querySelector("[item-box-container]");
const searchInput = document.querySelector("[item-search]");
const aFilter = document.querySelector("[a-filter]");
const cart = document.querySelector('.cart-modal');

let items = []
/**item search**/
searchInput.addEventListener("input", e => {
	const value = e.target.value.toLowerCase()
	items.forEach(item => {
		const isVisible = item.name.toLowerCase().includes(value)
		item.element.classList.toggle("hide", !isVisible)
	})
})
fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(data => {
        items = data.map(item => {
            const box = itemBoxTemplate.content.cloneNode(true).children[0]
            const name = box.querySelector("[item-name]")
            const price = box.querySelector("[item-price]")
            const image = box.querySelector("[item-image]")
            const description = box.querySelector("[item-description]")
			const id = box.querySelector("[item-id]")
			id.hidden = item.id
            name.textContent = item.name
            price.textContent = item.price
            image.Content = item.image
            description.textContent = item.description
            itemBoxContainer.append(box)           
            return {id: item.id,name: item.name,price: item.price,description: item.description, element: box}
        })
    })

const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]")

// function openModal(position) {
// 	fillData(position);
// 	modal.showModal()
// }

// function closeModal() {
// 	modal.querySelector(".form-body").innerHTML = '';
// 	modal.close()
// }

// //Retrieving data from MongoDB
// const getData = async () => {
// 	try {
// 	  const response = await fetch('http://localhost:3000/accounts');
// 	  const data = await response.json();
// 	  return data;
// 	} catch (err) {
// 	  console.error(err);
// 	}
//   }
  
//   //Using the retrieved data to populate the dialog modal
//   const showDataInModal = async () => {
// 	const data = await getData();
  
// 	let modalContent = '';
// 	data.forEach(item => {
// 	  modalContent += `<div>${item.name}, ${item.age}, ${item.location}</div>`;
// 	});
  
// 	const modal = document.getElementById('modal');
// 	modal.querySelector("[data-modal]") = modalContent;
// 	modal.style.display = 'block';
//   }

function addToCart() {
	const cartContainer = document.querySelector('.form-body');

	const img = cartContainer.querySelector('.product-image').src;
	const name = cartContainer.querySelector('.product-name').textContent;
	const price = cartContainer.querySelector('.price').textContent;
	const description = cartContainer.querySelector('.description').textContent;

	if (typeof (Storage) !== "undefined") {
		var items = JSON.parse(localStorage.getItem("item"));

		var item = '{"img":"' + img + '", "name":"' + name + '", "price": "' +
			price + '", "description":"' + description + '"}';

		if (items !== null) {
			items.push(JSON.parse(item));
			localStorage.setItem("item", JSON.stringify(items));
		} else {
			var item = '[' + item + ']';
			localStorage.setItem("item", item);
		}
	} else {
		// Sorry! No Web Storage support..
	}

	closeModal();
}

// function fillData(position) {
// 	const itemTemplate = document.getElementById('item-template');
// 	const cartContainer = document.querySelector('.form-body');

// 	const templateClone = itemTemplate.content.cloneNode(true);
// 	const productImage = templateClone.querySelector('.product-image');
// 	const productName = templateClone.querySelector('.product-name');
// 	const productPrice = templateClone.querySelector('.price');
// 	const productDescription = templateClone.querySelector('.description');

// 	productImage.src = products[position].image;
// 	productName.textContent = products[position].name;
// 	productPrice.textContent = products[position].price;
// 	productDescription.textContent = products[position].description;

// 	cartContainer.appendChild(templateClone);
// }

function openCart() {
	populateCart();
	cart.showModal();
}

function closeCart() {
	document.querySelector('.cart-body').innerHTML = '';
	cart.close();
}

function checkOutCart() {
	var items = JSON.parse(localStorage.getItem("item"));

	if (items == null) {
		alert("Cart is empty.");
	} else {
		localStorage.removeItem("item");
		alert("Check out successful.");
	}

	document.querySelector('#total-price').textContent = 0;
	closeCart();
}

function populateCart() {
	const cartTemplate = document.getElementById('cart-template');
	const cartContainer = document.querySelector('.cart-body');

	var items = JSON.parse(localStorage.getItem("item"));

	if (items != null) {
		var i = 0;
		var total = 0;
		items.forEach(item => {
			const templateClone = cartTemplate.content.cloneNode(true);
			templateClone.querySelector('.cart-item').classList = i + ' ' + templateClone.querySelector('.cart-item').classList;
			i++;
			const productImage = templateClone.querySelector('.product-image');
			const productName = templateClone.querySelector('.product-name');
			const productPrice = templateClone.querySelector('.product-price');

			productImage.src = item.img;
			productName.textContent = item.name;
			productPrice.textContent = item.price;
			total += parseInt(item.price.replace('$', ""));

			cartContainer.appendChild(templateClone);
		});

		document.querySelector('#total-price').textContent = total;
	}
}

function removeItem(index) {
	var items = JSON.parse(localStorage.getItem("item"));

	if (index > -1) { // only splice array when item is found
	  items.splice(index, 1); // 2nd parameter means remove one item only
	}

	localStorage.setItem("item", JSON.stringify(items));

	document.querySelector('.cart-body').innerHTML = '';
	populateCart();
}

/**fake data and clone box**/
const products = [
	{
		image: 'Asset/IMG/Products/bag.png',
		name: 'bag',
		price: '$100',
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
			"Culpa reiciendis possimus libero nesciunt impedit, optio esse neque cumque " +
			"autem, laborum asperiores eligendi illum similique corporis.Nemo, dolorem? " +
			"Voluptatem, dolor veritatis."
	},
	{
		image: 'Asset/IMG/Products/shirt.png',
		name: 'shirt',
		price: '$56',
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
			"Culpa reiciendis possimus libero nesciunt impedit, optio esse neque cumque " +
			"autem, laborum asperiores eligendi illum similique corporis.Nemo, dolorem? " +
			"Voluptatem, dolor veritatis."
	},
	{
		image: 'Asset/IMG/Products/shoes.png',
		name: 'shoes',
		price: '$76',
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
			"Culpa reiciendis possimus libero nesciunt impedit, optio esse neque cumque " +
			"autem, laborum asperiores eligendi illum similique corporis.Nemo, dolorem? " +
			"Voluptatem, dolor veritatis."
	},
	{
		image: 'Asset/IMG/Products/shorts.png',
		name: 'shorts',
		price: '$14',
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
			"Culpa reiciendis possimus libero nesciunt impedit, optio esse neque cumque " +
			"autem, laborum asperiores eligendi illum similique corporis.Nemo, dolorem? " +
			"Voluptatem, dolor veritatis."
	},
	{
		image: 'Asset/IMG/Products/socks.png',
		name: 'socks',
		price: '$23',
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
			"Culpa reiciendis possimus libero nesciunt impedit, optio esse neque cumque " +
			"autem, laborum asperiores eligendi illum similique corporis.Nemo, dolorem? " +
			"Voluptatem, dolor veritatis."
	},
	{
		image: 'Asset/IMG/Products/trainers.png',
		name: 'Trainers',
		price: '$432',
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
			"Culpa reiciendis possimus libero nesciunt impedit, optio esse neque cumque " +
			"autem, laborum asperiores eligendi illum similique corporis.Nemo, dolorem? " +
			"Voluptatem, dolor veritatis."
	},
	{
		image: 'Asset/IMG/Products/bag.png',
		name: 'bag',
		price: '$231',
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
			"Culpa reiciendis possimus libero nesciunt impedit, optio esse neque cumque " +
			"autem, laborum asperiores eligendi illum similique corporis.Nemo, dolorem? " +
			"Voluptatem, dolor veritatis."
	},
	{
		image: 'Asset/IMG/Products/shirt.png',
		name: 'shirt',
		price: '$111',
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
			"Culpa reiciendis possimus libero nesciunt impedit, optio esse neque cumque " +
			"autem, laborum asperiores eligendi illum similique corporis.Nemo, dolorem? " +
			"Voluptatem, dolor veritatis."
	},
	{
		image: 'Asset/IMG/Products/shoes.png',
		name: 'shoes',
		price: '$321',
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
			"Culpa reiciendis possimus libero nesciunt impedit, optio esse neque cumque " +
			"autem, laborum asperiores eligendi illum similique corporis.Nemo, dolorem? " +
			"Voluptatem, dolor veritatis."
	},
	{
		image: 'Asset/IMG/Products/shorts.png',
		name: 'shorts',
		price: '$123',
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
			"Culpa reiciendis possimus libero nesciunt impedit, optio esse neque cumque " +
			"autem, laborum asperiores eligendi illum similique corporis.Nemo, dolorem? " +
			"Voluptatem, dolor veritatis."
	},
];
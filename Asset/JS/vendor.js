const itemBoxTemplate = document.querySelector("[item-box-template]")
const itemBoxContainer = document.querySelector("[item-box-container]")

fetch('http://localhost:3000/accounts')
    .then(res => res.json())
    .then(data => {
        products = data.map(product => {
            const box = itemBoxTemplate.content.cloneNode(true).children[0]
            const name = box.querySelector("[item-name]")
            const price = box.querySelector("[item-price]")
            const image = box.querySelector("[item-image]")
            const description = box.querySelector("[item-description]")
            name.textContent = product.name
            price.textContent = product.price
            image.Content = product.image
            description.textContent = product.description
            itemBoxContainer.append(box)           
            return {name: product.name,price: product.price,description: product.description, element: box}
        })
    })

// Open html dialog 
const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

  console.log(document.querySelector("[data-open-modal]"))

openButton.addEventListener('click', () => {
    console.log("run")
    modal.showModal()
});

closeButton.addEventListener('click', () => {
    modal.close()
});

// submit data form modal
const form = document.querySelector('.inputData');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // prevent the default form submission

  var newProduct = {
    nameValue: "",
    priceValue: 0,
    imageFile: "",
    descriptionValue: "",
  };


  const nameValue = document.getElementById('name').value;
  const priceValue = Number(document.getElementById('price').value); // convert to number
  const imageFile = document.getElementById('image').value; // get the first file selected (if any)
  const descriptionValue = document.getElementById('description').value;

  newProduct.nameValue = nameValue;
  newProduct.priceValue = priceValue;
  newProduct.imageFile = imageFile;
  newProduct.descriptionValue = descriptionValue;

  localStorage.setItem('newProduct', JSON.stringify(newProduct));
  
  newProductBox(nameValue, priceValue, imageFile, descriptionValue)
  console.log(newProductBox)
  // reset the form
  form.reset();
});

// display new product dynamic
function newProductBox
(nameValue, priceValue, imageFile, descriptionValue){

const box = document.createElement("div");
box.classList.add("box");

const name = document.createElement("div");
name.classList.add("name");
name.textContent = nameValue;

const price = document.createElement("div");
price.classList.add("price");
price.textContent = priceValue;

const imageContainer = document.createElement("div");
imageContainer.classList.add("image");
const image = document.createElement("img");
image.src = imageFile;
image.alt = nameValue;
imageContainer.appendChild(image);

const description = document.createElement("div");
description.classList.add("description");
description.textContent = descriptionValue;

box.appendChild(name);
box.appendChild(price);
box.appendChild(imageContainer);
box.appendChild(description);
box.classList.add('hover')

container.appendChild(box);
}
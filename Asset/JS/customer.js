const itemBoxTemplate = document.querySelector("[item-box-template]")
const itemBoxContainer = document.querySelector("[item-box-container]")
const searchInput = document.querySelector("[item-search]")
const aFilter = document.querySelector("[a-filter]")


let items = []
/**item search**/
searchInput.addEventListener("input", e => {
        const value = e.target.value.toLowerCase()
        items.forEach(item =>{
        const isVisible = item.name.toLowerCase().includes(value)
        item.element.classList.toggle("hide", !isVisible)
    })
})

// function for open/close modal

// const openButton = document.querySelector("[data-open-modal]");
// const closeButton = document.querySelector("[data-close-modal]");
// const modal = document.querySelector("[data-modal]");

// openButton.addEventListener('click', () => {
//     console.log("run")
//     modal.showModal()
// });

// closeButton.addEventListener('click', () => {
//     modal.close()
// });




/**fake data and clone box**/
fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
        items = data.map(item => {
            const box = itemBoxTemplate.content.cloneNode(true).children[0]
            const name = box.querySelector("[item-name]")
            name.textContent = item.name
            itemBoxContainer.append(box)
            return {name: item.name, element: box}
        })
    })


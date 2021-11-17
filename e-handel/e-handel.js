const url = "https://mock-data-api.firebaseio.com/e-commerce/products.json"
const total = document.getElementById("total")
const varukorgWrapper = document.getElementById("varukorgWrapper")
const itemContainer = document.getElementById("itemContainer")

const prices = []

function getData() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderItemList(data)
            console.log(data)
            filterButtonOnclick(data)
        })
}

function renderItemList(data) {
    Object.values(data).forEach(item => {
        //loop through items and print it out
        //filterButtonOnclick(item)
        renderItem(item)
    })
}

function renderItem(item) {
    const wrapper = document.createElement("div")

    wrapper.appendChild(getName(item))
    wrapper.appendChild(getImage(item))
    wrapper.appendChild(getDescription(item))
    wrapper.appendChild(getPrice(item))
    wrapper.appendChild(getRating(item))
    wrapper.appendChild(getStock(item))
    wrapper.appendChild(createButtonAndClick(item))

    itemContainer.appendChild(wrapper)
}

function calculateTotalPrice(item) {

    let total = 0
    prices.push(item.price)
    prices.forEach(price => {
        total += price
    })
    return total
}

function imageOnClick(image, item) {
    image.addEventListener("click", () => {
        uppdateTotalPrice(item)
        varukorgTitle()
        uppdateItemList(item)
    })

}

function uppdateTotalPrice(item) {
    const sum = calculateTotalPrice(item)
    total.innerText = `Total: ${sum}`
}

function uppdateItemList(item) {
    const li = document.createElement("li")
    li.innerText = `${item.name} - ${item.price}`
    varukorgWrapper.prepend(li)
    total.appendChild(varukorgWrapper)
}

function varukorgTitle() {
    const varukorgTitle = document.createElement("h2")
    varukorgTitle.innerText = "Varukorg"
    total.appendChild(varukorgTitle)
}

function createButtonAndClick(item) {
    const button = document.createElement("button")
    button.innerText = "köp"

    button.addEventListener("click", () => {
        uppdateTotalPrice(item)
        varukorgTitle()
        uppdateItemList(item)
    })
    return button
}

//get filter button and create filter functionality 
function filterButtonOnclick(data) {
    const button = document.getElementById("filterButton")

    button.addEventListener("click", () => {
        const input = document.getElementById("input").value
        itemContainer.innerHTML = ""
        Object.values(data).filter(item => {
            if (item.rating >= input) {
                renderItem(item)
                    //console.log(item)
            }
        })
    })
}
// function filterButtonOnclick(item) {
//     const button = document.getElementById("filterButton")
//     button.addEventListener("click", () => {

//         const input = document.getElementById("input").value
//         itemContainer.innerHTML = ""
//         if (item.rating >= input) {

//             //console.log(item.rating >= input) //true
//             console.log(item) //{}objects

//             renderItem(item)
//                 //console.log(item)

//         }
//     })
// }
//below render items name,image,description,price,rating and stock

function getName(item) {
    const name = document.createElement("h1")
    name.innerText = item.name
    return name
}

function getImage(item) {
    const image = document.createElement("img")

    image.src = item.images[0].src.small
    image.alt = item.images[0].alt
    image.style.width = "30%"
    imageOnClick(image, item)
    return image
}

function getDescription(item) {
    const description = document.createElement("h3")
    description.innerText = `Description: ${item.description}`
    return description
}

function getPrice(item) {
    const price = document.createElement("p")
    price.innerText = `Price: ${item.price}`
    return price
}

function getRating(item) {
    const rating = document.createElement("p")
    rating.innerText = `Rating: ${item.rating}`
    return rating
}

function getStock(item) {
    const stock = document.createElement("p")
    stock.innerText = `In stock: ${item.stock}`
    return stock
}

getData()
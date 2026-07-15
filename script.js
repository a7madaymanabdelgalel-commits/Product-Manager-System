let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productQuantity = document.getElementById("productQuantity");
let saveBtn = document.getElementById("saveBtn");
let message = document.getElementById("message");
let productlist = document.getElementById("productlist");

let products = [];
let editindex = null;

let savedProducts = localStorage.getItem("products");

if (savedProducts !==null) {
    products = JSON.parse(savedProducts);
}

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function displayProducts() {
    productlist.innerHTML = "";
    products.forEach(function(product, index) {
        productlist.innerHTML += `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>
            </div>
        `;
    });
}

saveBtn.addEventListener("click", function() {
    let product = {
        name: productName.value,
        price: productPrice.value,
        quantity: productQuantity.value
    };

    if (editindex === null) {
        products.push(product);
        message.textContent = "Product added successfully";
    }else {
        products[editindex] = product;
        editindex = null;
        saveBtn.textContent = "Save Product";
        message.textContent = "Product updated successfully";
    }

    saveProducts();
    displayProducts();


    if (product.name) {
        productName.value = "";
        productPrice.value = "";
        productQuantity.value = "";
    } else {
        message.textContent = "Please enter a product name.";
    }

});

function editProduct(index) {
    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productQuantity.value = products[index].quantity;
    editindex = index;
    saveBtn.textContent = "Update Product";
     
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveProducts();
    displayProducts();
    message.textContent = "Product deleted successfully";
}
displayProducts();

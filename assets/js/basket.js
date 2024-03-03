    /////////////////////////////// Basket/////////////////////////////////////
 document.addEventListener("DOMContentLoaded", function () {
////checkout.html getmek ucun///////
document.getElementById("go-to-checkout").addEventListener("click",()=>{
        window.location.href="./checkout.html"})
const deleteAll=document.getElementById("delete-all")

        deleteAll.addEventListener("click",()=>{
            localStorage.removeItem("basket")
            const cartItems=document.getElementById("cart-items")
            cartItems.innerText="Empty"
            document.getElementById("total-price").innerText="0"
            updateCartCount()
        })
updateCartCount();  ////count refresde yenilenmir oldugu kimi qalir////
// DisplayCart();
});

// basket countunu guncellemek ve gostermek////
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("basket")) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").innerText = totalCount;
}

function DisplayCart() {
    let cart = JSON.parse(localStorage.getItem("basket")) || []; 
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; //karti temizlemekdir
    cart.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `<div class="cartProduct" data-id=${product.id}>
            <img class="cart-img" src=${product.image} alt="Product Image">
            ${product.title} - Quantity: ${product.quantity} - Price: ${(product.quantity * product.price).toFixed(2)}
            <button class="delete-product" data-id="${product.id}">Remove</button></div>`;
        cartItems.appendChild(productElement);
    });
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);

    // basketimizden mehsul silmek ucun///
    document.querySelectorAll(".delete-product").forEach(button => {
        button.addEventListener("click", function() {
            const productId = this.dataset.id;
            removeProduct(productId);
        });
    });
}

function removeProduct(productId) {
  let cart = JSON.parse(localStorage.getItem("basket")) || [];
  cart = cart.filter(product => product.id !== productId);
  localStorage.setItem("basket", JSON.stringify(cart));
  updateCartCount();
  DisplayCart();
}

// basketimizden butun mehsullari silmek ucun 
document.getElementById("delete-all").addEventListener("click", function() {
    localStorage.removeItem("basket");
    updateCartCount();
    DisplayCart();
});

///baskete mehsul elave etmek ucun /////
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("basket")) || [];
    const existingProductIndex = cart.findIndex(p => p.id === product.id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem("basket", JSON.stringify(cart));
    updateCartCount();
    DisplayCart();
    
}


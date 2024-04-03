document.addEventListener("DOMContentLoaded", () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    function DisplayWishList() {
      let wishlistContainer = document.getElementById("wishlistContainer");
      wishlistContainer.innerHTML = "";
      wishlist.forEach((product, index) => {
        let WishListItem = document.createElement("div");
        WishListItem.classList.add("wishlist-item");
        WishListItem.dataset.id = `${product.id}`;
        WishListItem.innerHTML = `
        <div class="checkout-product" data-id=${product.id}>
                <img class="checkout-image" src=${product.image} alt="">
                <div class="checkout-card-body">
                <h3>${product.title}</h3>
                <p class="price">${product.price.toFixed(2)}$</p>
                <br/>
                <div class="quantity">
                   <button class="decrease">-</button>
                   <span class="quantity">${product.quantity}</span>
                   <button class="increase">+</button>
                </div> 
                <span class="product-total-price">
                Total: ${(product.quantity * product.price).toFixed(2)} $
                </span>
                <button class="delete-checkout-product">
               Delete Product
                </button>
                </div>
            </div>
                `;

        wishlistContainer.appendChild(WishListItem);
        WishListItem.querySelector(".remove-wishlist").addEventListener(
          "click",() => { console.log("click");removeFromWishlist(product.id);
          DisplayWishList();
          }
        );
      });
    }
    function removeFromWishlist(productID) {
      wishlist = wishlist.filter((product) => product.id !== productID);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      DisplayWishList();
    }
    DisplayWishList();
  });
  
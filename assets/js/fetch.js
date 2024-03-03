
/////////////1.loadmorebtn 2.Filter VE SEARCH 3.TABLAR  4.Modal///////////////////

const url = "http://localhost:3000/cards";
const cardContainer = document.getElementById("card-container");
const LoadMoreBtn = document.getElementById("LoadMoreBtn");

let cardsData = []; //butun kartlar saxlamaq
let currentCards = []; //fitrelenen kartlari gostermek ucun
let startIndex = 0;  ///ilk sifir olsun 
let itemsPerPage = 6; ///karti 6 eded getirsin 
let currentFilter = 'default'; //movcud filtre

// Kartları çekme ve ilk yükleme
fetchCards();

// "Load More" butonu için event listener
LoadMoreBtn.addEventListener("click", function() {
    startIndex += itemsPerPage;
    displayCards();
});

// Filtrelemek ucun eventlistenerler////
document.getElementById('filter-default').addEventListener('click', function(e) {
    e.preventDefault();
    currentFilter = 'default';
    startIndex = 0;
    sortAndFilterCards();
});

document.getElementById('filter-lowToHigh').addEventListener('click', function(e) {
    e.preventDefault();
    currentFilter = 'lowToHigh';
    startIndex = 0; 
    sortAndFilterCards();
});

document.getElementById('filter-highToLow').addEventListener('click', function(e) {
    e.preventDefault();
    currentFilter = 'highToLow';
    startIndex = 0; 
    sortAndFilterCards();
});

///tablar///
document.getElementById('tab1Btn').addEventListener('click', function(e) {
  e.preventDefault();
  currentFilter = 'default'; 
  startIndex = 0; 
  sortAndFilterCards(); 
});

document.getElementById('tab2Btn').addEventListener('click', function(e) {
  e.preventDefault();
  currentFilter = 'women'; 
  startIndex = 0; 
  sortAndFilterCards(); 
});

document.getElementById('tab3Btn').addEventListener('click', function(e) {
  e.preventDefault();
  currentFilter = 'men'; 
  startIndex = 0; 
  sortAndFilterCards(); 
});

document.getElementById('tab4Btn').addEventListener('click', function(e) {
  e.preventDefault();
  currentFilter = 'bags'; 
  startIndex = 0; 
  sortAndFilterCards(); 
});

document.getElementById('tab5Btn').addEventListener('click', function(e) {
  e.preventDefault();
  currentFilter = 'shoes'; 
  startIndex = 0; 
  sortAndFilterCards(); 
});

document.getElementById('tab6Btn').addEventListener('click', function(e) {
  e.preventDefault();
  currentFilter = 'Watches'; 
  startIndex = 0; 
  sortAndFilterCards(); 
});

// Kartları çekmek, sıralamaq
function fetchCards() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            cardsData = data;///data saxlamaq///
            sortAndFilterCards();
        });
}

function sortAndFilterCards() {
    switch(currentFilter) {
        case 'default':
            currentCards = cardsData;  //(evvelki kimi siralayir)//
            break;
        case 'lowToHigh':
            currentCards = [...cardsData].sort((a, b) => a.price - b.price);//azdan coxa//
            break;
        case 'highToLow':
            currentCards = [...cardsData].sort((a, b) => b.price - a.price);//coxdan aza///
            break;
        case 'women':
            currentCards = cardsData.filter(item => item.category === 'women'); 
            break;
        case 'men':
            currentCards = cardsData.filter(item => item.category === 'men'); 
            break;
        case 'bags':
            currentCards = cardsData.filter(item => item.category === 'bags'); 
            break;
        case 'shoes':
            currentCards = cardsData.filter(item => item.category === 'shoes'); 
            break;
        case 'Watches':
              currentCards = cardsData.filter(item => item.category === 'Watches'); 
              break;
    }
    displayCards();
}

// Kartları DOM'a add etmek///
function displayCards() {
    const toDisplay = currentCards.slice(startIndex, startIndex + itemsPerPage);
    if (startIndex === 0) cardContainer.innerHTML = '';
    toDisplay.forEach(item => {
        const cardElement  = CardStyle(item);
        cardContainer.appendChild(cardElement);
    });
    // "Load More" butonunun gösterilip gösterilmeyeceği
    if (startIndex + itemsPerPage >= currentCards.length) {
        LoadMoreBtn.style.display = "none";
    } else {
        LoadMoreBtn.style.display = "block";
    }
}

// Kartın HTMLi/////
function CardStyle(item) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
      <div class="card-image" style="background-image:url('${item.image}')">
          <button class="modal-btn" data-id="${item.id}">Quick View</button>
      </div>
      <div class="card-body">
      <div class="card-title">
            <a href="">${item.title}<a>
             <p class="card-price">$${item.price}<p>
           </div>
          <span class="wishlist-btn"><i class="fa-regular fa-heart"></i><span>
      </div>
  `;

  //quik buttonuna event/////
  const modalBtn = card.querySelector('.modal-btn');
  modalBtn.addEventListener('click', function() {
      openModal(item);
  });

  // Wishlist butonu ucun  event listener add etmek
  const wishlistBtn = card.querySelector('.wishlist-btn');
  wishlistBtn.addEventListener('click', function() {
     
      this.firstChild.classList.toggle('fa-solid'); // Rengi değiştirmek için sınıfı değiştir
      this.firstChild.classList.toggle('fa-regular');
  });

  return card;
}
// Modal açmaq//////
function openModal(item) {
  const modal = document.getElementById('modal');
  modal.innerHTML = `
     <div id="product-modal" class="product-modal">
  <div class="modal-content">
    <span class="close-button">x</span>
    <div class="modal-body">
      <div class="product-image">
      <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="product-details">
      <h2>${item.title}</h2>
      <p>Price: $${item.price}</p>
        <p class="product-description">Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.</p>
        <div class="product-options">
         <div> 
         <label for="size">Size:</label>
         <select id="size" name="size">
           <option value="">Choose an option...</option>
           <option value="small">Small</option>
           <option value="medium">Medium</option>
           <option value="large">Large</option>
         </select></div>
          <div>
          <label for="color">Color:</label>
          <select id="color" name="color">
            <option value="">Choose an option...</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
            <option value="green">Green</option>
          </select>
          </div>
        </div>
        <div class="product-quantity">
          <button class="decrease-quantity">-</button>
          <input type="number" value="1">
          <button class="increase-quantity">+</button>
        </div>
        <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
        <div class="modalicons">
						<a href="#">
							<i class="fa-brands fa-facebook-f"></i>
						</a>

						<a href="#">
		        <i class="fa-brands fa-instagram"></i>
						</a>

						<a href="#">
							<i class="fa-brands fa-pinterest"></i>
						</a>
					</div>
      </div>
    </div>
  </div>
</div>


  `;
  modal.style.display = "block";

  // baskete add elemek ucun buton/////
  modal.querySelector(".add-to-cart-btn").addEventListener("click", function() {
      addToCart({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: 1
      });

      const addToCartBtn = modal.querySelector('.add-to-cart-btn');
      addToCartBtn.addEventListener('click', function() {
          addToCart(product);
      });
      modal.style.display = "none";
  });

  modal.querySelector('.close-button').addEventListener('click', function() {
      modal.style.display = "none";
  });
}





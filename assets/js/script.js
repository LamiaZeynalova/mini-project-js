/////////////////////////////////slider//////////////////////////////////////////////
const navbar = document.getElementById("navtop1")
function navScroll() {
    let next = window.pageYOffset
    if (next >= 20) {
        navbar.style.backgroundColor = "white"
    }
    else {
        navbar.style.backgroundColor = "transparent"
    

    }
}
window.addEventListener("scroll", navScroll)

document.addEventListener('DOMContentLoaded', function() {
  var burgerMenu = document.querySelector('.slicknav-menui');
  
  var navMenu = document.querySelector('.slicknav-menu');
  burgerMenu.addEventListener('click', function() {
    
    if (navMenu.style.display === 'block') {
      navMenu.style.display = 'none';
    } else {
      navMenu.style.display = 'block';
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
    AOS.init();
  });
const sliderContainer = document.querySelector(".slides");
const slides = document.querySelectorAll(".slide");
const nextIcon = document.querySelector(".next");
const prevIcon = document.querySelector(".prev");

let currentIndex = 0;


function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

function updateSlider() {
  const newTransform = -currentIndex * 100 + "%";
  sliderContainer.style.transform = `translateX(${newTransform})`;
}

nextIcon.addEventListener("click", nextSlide);
prevIcon.addEventListener("click", prevSlide);

let interval;

function startPlay() {
  interval = setInterval(nextSlide, 3000);
}

// function stopPlay() {
//   clearInterval(interval);
// }

startPlay();

function updateSlider() {
  const newTransform = -currentIndex * 100 + "%";
  sliderContainer.style.transform = `translateX(${newTransform})`;
  
  // Resetleme///
  slides.forEach((slide, index) => {
    if(index === currentIndex) {
      // aktif slayd ucun animasyonu tekrar başladir////
      const span = slide.querySelector('span');
      const h1 = slide.querySelector('h1');
      const btn = slide.querySelector('.btn-blue');
      
      span.style.animation = 'none';
      h1.style.animation = 'none';
      btn.style.animation = 'none';
      
      setTimeout(() => {
        span.style.animation = '';
        h1.style.animation = '';
        btn.style.animation = '';
      }, 10); 
    }
  });
}




// Filter ve Search/////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
  const filterToggle = document.querySelector('.js-show-filter');
  const searchToggle = document.querySelector('.js-show-search');
  const filterPanel = document.querySelector('.panel-filter');
  const searchPanel = document.querySelector('.panel-search');

  // Filter ////
  filterToggle.addEventListener('click', function() {
      
      filterPanel.classList.toggle('active');
    
      this.querySelector('i').classList.toggle('fa-xmark');
      this.querySelector('i').classList.toggle('fa-sort-down');

      // Eğer search paneli açıksa, onu bagliyir//////
      if (searchPanel.classList.contains('active')) {
          searchPanel.classList.remove('active');
          searchToggle.querySelector('i').classList.add('fa-magnifying-glass');
          searchToggle.querySelector('i').classList.remove('fa-xmark');
      }
  });
  searchToggle.addEventListener('click', function() {
      
      searchPanel.classList.toggle('active');

      this.querySelector('i').classList.toggle('fa-xmark');
      this.querySelector('i').classList.toggle('fa-magnifying-glass');

      // Eğer filter paneli açıksa, onu bagliyir////
      if (filterPanel.classList.contains('active')) {
          filterPanel.classList.remove('active');
          filterToggle.querySelector('i').classList.add('fa-sort-down');
          filterToggle.querySelector('i').classList.remove('fa-xmark');
      }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  /////basket clicki////////
  const cartIcon = document.querySelector('.cart-box'); 

  cartIcon.addEventListener('click', function() {
      ////acbagla////
      const cartSidebar = document.getElementById('dropdown-cart'); 
      cartSidebar.classList.toggle('active'); 
  });
  const dropdownCart = document.getElementById("dropdown-cart");
    const closeCartButton = document.getElementById("close-cart");

   
    cartIcon.addEventListener("click", function() {
       
        dropdownCart.style.display = "block";
    });

    
    closeCartButton.addEventListener("click", function() {
     
        dropdownCart.style.display = "none";
    });

  
  updateCartCount();
  DisplayCart();
});




















  
const data = product_list.responses[0][0].params;
const categories = document.getElementById('categories');
const products = document.getElementById('products');
const popup = document.getElementById('popup');


const getCategories = () => {
  data.userCategories.forEach( (category,index) =>{
    let newCategoryName = ' ';
    if(category.includes(">")){
      newCategoryName = category.split('>')[1];
    }
    else{
      newCategoryName = category;
    }
      const categoryItem = `<li class="${index === 0 ? 'active' : ''}" onclick="categoryClickHandler('${category}',this)">${newCategoryName}</li>`;
      categories.innerHTML += categoryItem;
  });
}

const getProducts = (category) => {
  products.innerHTML = '';
  data.recommendedProducts[category].forEach( product =>{
    productItem =
    `<div class="swiper-slide">
      <div class="product">
        <img src="${product.image}" alt="${product.name}" loading="lazy" class="w100 swiper-lazy" />
        <div class="product-name"><h5>${product.name}</h5></div>
        <h4 class="product-price">${product.priceText}</h4>
        ${product.params.shippingFee === 'FREE' ? 
        `<div  class="free-cargo">
          <img src="./assets/free-cargo.png" />
          <h6 style="margin-left: 10px">Ücretsiz Kargo</h6>
        </div>` : 
        `<div  class="free-cargo"></div>`}
        <button onclick="getPopup()">Sepete Ekle</button>
      </div>
    </div>`
  products.innerHTML += productItem;
  });
}

const getPopup = () =>{
  popupItem = `
  <div class="popup">
      <div class="popup-confirm">
          <div><img src="./assets/confirm.png" ></div>
          <div>
              <h4>Ürün Sepete Eklendi</h4>
              <a href="#">Sepete Git</a>
          </div>
      </div>
      <div onclick="closePopup()" class="popup-close">X</div>
  </div>
  `
  popup.innerHTML = popupItem; 
  setTimeout(closePopup, 30000)
}

const closePopup = () =>{
  popup.innerHTML = '';
}

const categoryClickHandler = (category, element) => {
  getProducts(category)
  products.style.transform = 'translate3d(0px,0,0)'
  let currentActiveCategory = document.querySelector('.active');
  currentActiveCategory.classList.remove('active');
  element.classList.add('active');
  }


window.addEventListener('DOMContentLoaded',  () => {

   new Swiper('.swiper', {
      slidesPerView: 3,
      spaceBetween: "2%",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      a11y: {
        enabled : false
      },
      breakpoints: {
        0:{slidesPerView:1},
        320:{slidesPerView:2},
        480: {slidesPerView: 3},
        800: {slidesPerView: 4},
      },
  
    });
    
  getCategories();
  getProducts(data.userCategories[0])
});


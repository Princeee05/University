//Making Search, Cart and Form buttons functional and not overlapping
let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => 
    {
    searchForm.classList.toggle('active');
    cartOpen.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let cartOpen = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () => 
    {
    searchForm.classList.remove('active');
    cartOpen.classList.toggle('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}


let loginForm = document.querySelector('.login-form');

document.querySelector('#user-btn').onclick = () => 
    {
    searchForm.classList.remove('active');
    cartOpen.classList.remove('active');
    loginForm.classList.toggle('active');
    navbar.classList.remove('active');
} 


 let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => 
    {
    searchForm.classList.remove('active');
    cartOpen.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.toggle('active');
} 

window.onscroll = () => {
    searchForm.classList.remove('active');
    cartOpen.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

//Code for Slider effect on Products
var swiper = new Swiper(".product-slider", {
    loop: true,
    spaceBetween: 20,

    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
     },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
  }
)

let cartIcon = document.querySelector('#cart-btn')
let cart = document.querySelector('.shopping-cart')

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else{
    ready();
}

//making the function
function ready(){
//remove items
    var removeCartButtons = document.getElementsByClassName('fa fa-trash')
    console.log(removeCartButtons)
    for(var i=0; i < removeCartButtons.length; i++) {
      var button = removeCartButtons[i]
      button.addEventListener("click", removeCartItem)
    }

//Input Quantity
  var quantityInputs = document.getElementsByClassName("quantity")
  for(var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);

  }

//Linking Button for add to Cart
  var addCart = document.getElementsByClassName('fa-solid fa-cart-plus')
  for (var i=0; i < addCart.length; i++){
    var button = addCart[i]
    button.addEventListener("click", addCartClicked);
  }
//Checkout Button work
  document.getElementsByClassName('btn-checkout')[0].addEventListener('click', checkoutButtonClicked);
}

//Checkout button function
function checkoutButtonClicked() {
  alert('Your order has been placed')
  var cartContent = document.getElementsByClassName('cart-content')[0]
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

//Remove from cart
function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.remove()
  updateTotal();
}

//Changing Qunatity
function quantityChanged(event){
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateTotal();
}

//Reading Products from Class 
function addCartClicked(event) {
  var button = event.target;
  var products = button.parentElement.parentElement;
  var title = products.getElementsByClassName("product-title")[0].innerText;
  var price = products.getElementsByClassName("price")[0].innerText;
  var productImage = products.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImage);
  updateTotal();
}

//Adding to Cart
function addProductToCart(title, price, productImage){
  var cartShopBox = document.createElement("div")
  cartShopBox.classList.add('box');
  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemNames = cartItems.getElementsByClassName('product-title');
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
    alert("You have already added this item to the cart");
    return;  
 }
}
var cartBoxContent = `
              <i class = "fa fa-trash"></i>
                <img src="${productImage}" width="150px">
                <div class ="content">
                    <h3>${title}</h3>
                    <span class="price">${price}</span>
                    <input type="number" value="1" class="quantity"> `
cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)  
cartShopBox.getElementsByClassName('fa fa-trash')[0].addEventListener('click',removeCartItem)
cartShopBox.getElementsByClassName('quantity')[0].addEventListener('change',quantityChanged)
}

// Calculate Total
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0]
  var cartBoxes = cartContent.getElementsByClassName("box")
  var total=0;
  for(var i=0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i]
    var priceElement = cartBox.getElementsByClassName("price")[0]
    var quantityElement = cartBox.getElementsByClassName("quantity")[0]
    var price = parseFloat(priceElement.innerText.replace("$", ""))
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
    total = Math.round(total *100) / 100;
    
    document.getElementsByClassName("total")[0].innerText = "$" + total;
 
}

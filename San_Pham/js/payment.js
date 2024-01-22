var citis = document.getElementById("city");
var districts = document.getElementById("district");
var wards = document.getElementById("ward");
var Parameter = {
  url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json", 
  method: "GET", 
  responseType: "application/json", 
};
var promise = axios(Parameter);
promise.then(function (result) {
  renderCity(result.data);
});

function renderCity(data) {
  for (const x of data) {
    citis.options[citis.options.length] = new Option(x.Name, x.Id);
  }
  citis.onchange = function () {
    districts.length = 1;
    wards.length = 1;
    if(this.value != ""){
      const result = data.filter(n => n.Id === this.value);

      for (const k of result[0].Districts) {
        district.options[districts.options.length] = new Option(k.Name, k.Id);
      }
    }
  };
  districts.onchange = function () {
    wards.length = 1;
    const dataCity = data.filter((n) => n.Id === citis.value);
    if (this.value != "") {
      const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;

      for (const w of dataWards) {
        wards.options[wards.options.length] = new Option(w.Name, w.Id);
      }
    }
  };
}


const cartItems = document.querySelector(".item_render")
const sumTotalItem = document.querySelector(".prire_payment")
const quantityItem = document.querySelector(".quantity")
const quantityItemInCart = document.querySelector(".quantity_in_cart")

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

function updateCart() {
    renderCartItems();
    renderSubtotal();
    localStorage.setItem("CART", JSON.stringify(cart))
 }

 function renderSubtotal() {
    let totalPrice = 0;
    let totalItems = 0;
      
    cart.forEach((item) => {
      totalPrice += item.price * item.numberOfUnits;
      totalItems += item.numberOfUnits;
    });
  
    sumTotalItem.innerHTML = `${totalPrice.toLocaleString()} đ`;
    quantityItem.innerHTML = `${totalItems}`;
    quantityItemInCart.innerHTML = `${totalItems}`;
   
  }

  function renderCartItems() {
    cartItems.innerHTML = "";
    cart.forEach((item) => {
      cartItems.innerHTML += `
          <div class="cart-item">
          <div class=" del " onclick="removeItemFromCart('${item.id}')"> <button>X</button> </div>
  
              <div class="item-info">
                  <img src="${item.image}" alt="${item.name}">
                  <b> <p>${item.name}</p> </b>
              </div>
              <div class="unit-price">
                <b>${item.price.toLocaleString()} đ </b>
              </div>
              <div class="units">
                 <div class="btn minus" onclick="changeNumberOfUnits('minus', '${item.id}')">-</div>
                  <div class="number">${item.numberOfUnits}</div>
                  <div class="btn plus" onclick="changeNumberOfUnits('plus', '${item.id}')">+</div>           
              </div>
          </div>
        `;
    });
  }
  
  
  
  function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
  
    updateCart();
  }
  
  function changeNumberOfUnits(action, id) {
    cart =cart.map((item) => {
      if (item.id === id) {
        if (action === "minus" && item.numberOfUnits > 1) {
          item.numberOfUnits--;
        } else if (action === "plus" ) {
          item.numberOfUnits++;
        }
      }
      return item;
    });
  
    updateCart();
  }
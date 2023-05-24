const cartItems = document.querySelector(".cart-items")
const sumTotalItem = document.querySelector(".total")
const quantityItem = document.querySelector(".quantity")
const quantityItemInCart = document.querySelector(".quantity_in_cart")

function renderProductItem(product) {
    let item = `
     <div class="clothes">
    <img src="${product.image}" width="220px" alt="">
    <div class="infor_clothes">
      <p>${product.name}</p>
      <div class="price">
        <span class=" product-price " >${product.price.toLocaleString()}</span> đ
      </div> 
    <button onclick="addToCart('${product.id}')" > + Thêm vào giỏ </button>
  </div>
</div>`;
    return item;
}



const productList = [
    {id: "bag_1", image: "./picture/bag_1.webp", name: "Degrey Leather Basic Balo", price: 320000, group:'balo'},
    {id: "bag_2", image: "./picture/bag_2.webp", name: "Degrey Canvas Bag - TCV", price: 430000, group:'balo'},
    {id: "bag_3", image: "./picture/bag_3.webp", name: "Degrey Leather Basic Balo", price: 500000, group:'balo'},
    {id: "bag_4", image: "./picture/bag_4.webp", name: "Mini shoulder bag Degrey", price: 330000, group:'balo'},
    {id: "bag_5", image: "./picture/bag_5.webp", name: "Mini shoulder bag Degre", price: 1100000, group:'balo'},
    {id: "bag_6", image: "./picture/bag_6.webp", name: "Degrey Madmonks Tee Bag", price: 730000, group:'balo'},
    {id: "ring_1", image: "./picture/ring_1.webp", name: "Degrey Pallas Nhẫn Thép", price: 510000, group:'trangsuc'},
    {id: "ring_2", image: "./picture/ring_2.webp", name: "Degrey Pallas Bông Tai", price: 410000, group:'trangsuc'},
    {id: "ring_3", image: "./picture/ring_3.webp", name: "Degrey Pallas Bông Tai - DPBE", price: 210000, group:'trangsuc'},
    {id: "ring_4", image: "./picture/ring_4.webp", name: "Degrey Dây Chuyền Thập Giá", price: 310000, group:'trangsuc'},
    {id: "ring_5", image: "./picture/ring_5.webp", name: "Degrey Nhẫn Thép", price: 350000, group:'trangsuc'},
    {id: "ring_6", image: "./picture/ring_6.webp", name: "Degrey Dây Chuyền Mặt Trăng", price: 200000, group:'trangsuc'},
]

function renderProductList(productList) {
    let content = ''
    for (const product of productList) {
        content+= renderProductItem(product);
    }
    return content
}
renderProductList(productList);

function renderProductByGroup(productList, group){
    const productListElement = document.getElementById(group);

    const products = productList.filter(product=>product.group === group)
    const content = renderProductList(products)
    productListElement.innerHTML += content;

}
renderProductByGroup(productList, 'balo')
renderProductByGroup(productList, 'trangsuc')  //render list san phẩm


let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();


function addToCart(id) {
   //Check san pham da co trong gio hang 
   if(cart.some((item)=>item.id === id)){
    changeNumberOfUnits("plus", id);
   }  
   else{
    const item = productList.find((product)=> product.id === id)
    cart.push({
        ...item,
        numberOfUnits: 1,

    });
    
   }
   updateCart();
}

 //update gio hang
function updateCart() {
   renderCartItems();
   renderSubtotal();
   localStorage.setItem("CART", JSON.stringify(cart))
}
  

// tinh tong so tien va tong so luong san pham trong gio hang
function renderSubtotal() {
  let totalPrice = 0;
  let totalItems = 0;
    
  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  sumTotalItem.innerHTML = `Tổng: ${totalPrice.toLocaleString()} đ`;
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




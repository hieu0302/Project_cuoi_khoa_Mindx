const quantityItem = document.querySelector(".quantity")
const cart = JSON.parse(localStorage.getItem("CART")) || [];
const totalNumberOfUnits = cart.reduce((total, item) => total + item.numberOfUnits, 0);


quantityItem.innerHTML = `${totalNumberOfUnits}`;
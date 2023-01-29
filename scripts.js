const allProductDiv = document.getElementById("all-products");
const cartProductsDiv = document.getElementById("cart-products");
const cartTotalDiv = document.getElementById("cart-total");
let products;
let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];

//  (1) Display Product Using JSON File
fetch("products.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    products = data;
    console.log(products);
    for (let i = 0; i < data.length; i++) {
      allProductDiv.innerHTML += `
      <div class="col-lg-4">
              <div class="single-product">
                <img src="${data[i].image}" alt="" />
                <h5>$<span id="product-price">${data[i].price}</span></h5>
                <h3>${data[i].name}</h3>
                <p>
                ${data[i].text}
                </p>
                <button onClick="addToCart('${data[i].id}')">Add To Cart</button>
              </div>
            </div>`;
    }
  })
  .catch(function (error) {
    console.log(error);
  });

//  (3) Display Product From Local Storage
function displayCart() {
  for (let i = 0; i < cartItem.length; i++) {
    cartProductsDiv.innerHTML += `
        <div class="cart-product" id="id2">
        <img src="${cartItem[i].image}" alt="" />
        <h3>
        ${cartItem[i].name} (Price: $<span id="product-price">${cartItem[i].price})</span>
        </h3>
        <h5>Quantity: ${cartItem[i].quentity}</h5>
        <h5>Sub Total: ${cartItem[i].price}</h5>
        <button class="remove-item">X</button>
    </div>
        `;
  }
}
displayCart();

// Get Cart Total
function cartTotal() {
  const temp = cartItem.map(function (item) {
    return parseFloat(item.price) * parseFloat(item.quentity);
  });
  const sum = temp.reduce(function (prev, next) {
    return prev + next;
  }, 0);
  cartTotalDiv.innerText = sum;
}
cartTotal();

function addToCart(productId) {
  const product = products.find((product) => product.id == productId);
  //   console.log(product);

  // Create Product
  const cartProduct = `
    <div class="cart-product" id="id2">
        <img src="${product.image}" alt="" />
        <h3>
        ${product.name} (Price: $<span id="product-price">${product.price})</span>
        </h3>
        <h5>Quantity: 1</h5>
        <h5>Sub Total: ${product.price}</h5>
        <button class="remove-item">X</button>
    </div>
  `;

  cartProductsDiv.innerHTML += cartProduct;

  //  (2) Add Product Local Storage
  cartItem.push(product);
  product.quentity = 1;
  localStorage.setItem("cartItem", JSON.stringify(cartItem));

  //   Cart Total
  cartTotal();
}

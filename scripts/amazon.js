import { cart, addtoCart, updateCartQty } from '/scripts/cartclass.js';
import { products, loadProductsfetch } from '/scripts/products.js';
let productsHtml = '';
loadProductsfetch().then(rednerProducts); // <-- FIX: call .then(rednerProducts) instead of passing as argument

function rednerProducts() {
  productsHtml = ''; // <-- FIX: reset productsHtml each time before rendering
  products.forEach((product) => {
    const halfStarSteps = Math.round(product.rating.stars * 2) / 2;
    const fileStep = halfStarSteps * 10;

    productsHtml += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${typeof product.getStarsUrl === 'function' ? product.getStarsUrl() : `/images/ratings/rating-${product.rating.stars * 10}.png`}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary
          js-add-to-cart
          " data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
  });

  let productContainer = document.querySelector('.js-products-grid');
  productContainer.innerHTML = productsHtml;

  document.querySelectorAll('.js-add-to-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = btn.dataset.productId;

      addtoCart(productId);

      updateCartQty();
    });
  });
}
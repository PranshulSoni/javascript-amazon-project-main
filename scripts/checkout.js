  import { cart, removeFromCart , updatDeliverOption } from '/scripts/cart.js';
  import { products } from '/scripts/products.js';
  import { formatCurrency } from './utils/money.js';
  import { deliveryOptions } from '/scripts/deliveryoptions.js';

  function renderOrderSummary(){

  

    let checkoutHtml = '';

    cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      let matchingProduct;
      products.forEach((product) => {
        if (product.id === productId) {
          matchingProduct = product;
        }

      });
      const deliveryOptionId = cartItem.deliveryOptionId;
      let deliveryOption;
      deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
          deliveryOption = option;
        }
      });
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays, 'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D')


      checkoutHtml += `
          <div class="cart-item-container 
          js-cart-item-container-${matchingProduct.id}">
                  <div class="delivery-date">
                    Delivery date: ${dateString}
                  </div>

                  <div class="cart-item-details-grid">
                    <img class="product-image"
                      src="${matchingProduct.image}">

                    <div class="cart-item-details">
                      <div class="product-name">
                        ${matchingProduct.name}
                      </div>
                      <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                      </div>
                      <div class="product-quantity">
                        <span>
                          Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                          Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div class="delivery-options">
                      <div class="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      ${deliveryOptionsHtml(matchingProduct, cartItem)}
                    </div>
                  </div>
                </div>
          `;
    });

    document.querySelector('.js-order-summary').innerHTML = checkoutHtml;

    document.querySelectorAll('.js-delete-quantity-link').forEach(link => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        console.log(cart);
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        if (container) {
          container.remove();
        }
      });
    });

    function deliveryOptionsHtml(matchingProduct, cartItem) {
      let deliveryHtml = '';
      deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(
          deliveryOption.deliveryDays, 'days'
        );
        const dateString = deliveryDate.format('dddd, MMMM D')
        const priceString = deliveryOption.priceCents === 0
          ? 'FREE'
          : `$${formatCurrency(deliveryOption.priceCents)}`
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : '';
        const deliveryOptionId = cartItem.deliveryOptionId;

        deliveryHtml += `
          <div class="delivery-option 
          js-delivery-option"
          data-product-id="${matchingProduct.id}"
                          data-delivery-option-id="${deliveryOption.id}" >
                        <input type="radio"
                          class="delivery-option-input"
                          name="delivery-option-${matchingProduct.id}"
                          
                          ${isChecked}>
                        <div>
                          <div class="delivery-option-date">
                            ${dateString}
                          </div>
                          <div class="delivery-option-price">
                            ${priceString} - Shipping
                          </div>
                        </div>
                      </div>
                      `;
      });
      return deliveryHtml;
    }

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
      element.addEventListener('click',()=>{
        const {productId ,deliveryOptionId}=element.dataset;
        updatDeliverOption(productId,deliveryOptionId);
        renderOrderSummary();
      });
    });
  }

  renderOrderSummary();

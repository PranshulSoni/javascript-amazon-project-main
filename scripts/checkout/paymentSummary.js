import { cart, updateCartQty, getCartQty } from "../cartclass.js";
import { getProductId } from "../products.js";
import { getDeliveryOption } from "../deliveryoptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../order.js";
export function renderPaymentSummary() {
    let cartQuantity = getCartQty();
    let productpricecents = 0;
    let shippingpricecents = 0;

    cart.cartItems.forEach((cartItem) => {
        const product = getProductId(cartItem.productId);
        productpricecents += product.priceCents * cartItem.quantity;
        const deliveyrOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingpricecents += deliveyrOption.priceCents;
    });
    const totalBeforetax = productpricecents + shippingpricecents;
    const taxCents = totalBeforetax * (0.1);
    const totalCents = taxCents + totalBeforetax;

    const paymentSummaryHtml = `
        <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (${cartQuantity}):</div>
                <div class="payment-summary-money">$${formatCurrency(productpricecents)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${formatCurrency(shippingpricecents)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatCurrency(totalBeforetax)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
            </div>

            <button class="place-order-button button-primary js-place-order-button">
                Place your order
            </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
    document.querySelector('.js-place-order-button').addEventListener('click', async () => {
        try {
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart
                })
            })
            const order = await response.json();
            addOrder(order);
        } catch (error) {
            console.error("Error placing order:", error);
            document.querySelector('.js-payment-summary').innerHTML = "<p>Error placing order. Please try again later.</p>";
            return;
        }

        window.location.href = 'orders.html';
    });

}
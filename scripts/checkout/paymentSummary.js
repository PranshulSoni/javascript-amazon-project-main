import { cart, updateCartQty, getCartQty} from "../cart.js";
import { getProductId } from "../products.js";
import { getDeliveryOption } from "../deliveryoptions.js";
import { formatCurrency } from "../utils/money.js";
export function renderPaymentSummary(){
    let cartQuantity=getCartQty();
    let productpricecents=0;
    let shippingpricecents=0;

    cart.forEach((cartItem)=>{
        const product=getProductId(cartItem.productId);
        productpricecents+= product.priceCents*cartItem.quantity;
        const deliveyrOption=getDeliveryOption(cartItem.deliveryOptionId);
        shippingpricecents+=deliveyrOption.priceCents;
    });
    const totalBeforetax=productpricecents+shippingpricecents;
    const taxCents=totalBeforetax*(0.1);
    const totalCents=taxCents+totalBeforetax;
    
    const paymentSummaryHtml=
    `
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

            <button class="place-order-button button-primary">
                Place your order
            </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHtml;
    
}
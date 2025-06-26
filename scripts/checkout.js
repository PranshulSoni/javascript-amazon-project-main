import { renderOrderSummary } from "./checkout/orderSumarry.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "./cartclass.js";
import "./backendprac.js";
import { loadProductsfetch } from "./products.js";



async function loadPage() {
    try {
        await loadProductsfetch();
    }
    catch (error) {
        console.error("Error loading products:", erro);
        document.querySelector('.js-order-summary').innerHTML = "<p>Error loading products. Please try again later.</p>";
        return;
    }

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();



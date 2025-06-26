import { renderOrderSummary } from "./checkout/orderSumarry.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "./cartclass.js";
import "./backendprac.js";
import { loadProductsfetch } from "./products.js";



async function loadPage() {
    await loadProductsfetch();
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();



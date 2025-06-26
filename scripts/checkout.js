import { renderOrderSummary } from "./checkout/orderSumarry.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "./cartclass.js";
import "./backendprac.js";
import { loadProducts } from "./products.js";

loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
import { renderOrderSummary } from "./checkout/orderSumarry.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "./cartclass.js";
import "./backendprac.js";
import { loadProductsfetch } from "./products.js";

Promise.all([
    loadProductsfetch(),
]).then((value) => {
    console.log(value);
    renderOrderSummary();
    renderPaymentSummary();
});



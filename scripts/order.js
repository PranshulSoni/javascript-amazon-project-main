export const orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];

export function addOrder(order) {
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}
function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,
        loadFromStorage: function () {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
            if (!this.cartItems) {
                this.cartItems = [{
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1',
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2',
                }];
            }
        },
        //add the save to storage method
        saveToStorage: function () {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
        //add the addToCart method
        addToCart: function (productId) {
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if (productId == cartItem.productId) {
                    matchingItem = cartItem;
                }
            });

            if (matchingItem) {
                matchingItem.quantity++;
            } else {
                this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: '1',
                });
            }
            this.saveToStorage();
        },
        //add the removefromCart method
        removeFromCart: function (productId) {
            const newCart = [];
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem);
                }
            });
            this.cartItems = newCart;
            this.saveToStorage();
        },
        //add the updateCartQty method
        updateCartQty: function () {
            let cartQuantity = 0;
            this.cartItems.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });
            const cartDisplay = document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
            console.log(this.cartItems);
        },
        //add the updatDeliverOption method
        updatDeliverOption: function (productId, deliveryOptionId) {
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if (productId == cartItem.productId) {
                    matchingItem = cartItem;
                }
            });
            matchingItem.deliveryOptionId = deliveryOptionId;

            this.saveToStorage();
        },
        //add the getCartQty method
        getCartQty: function () {
            let cartQuantity = 0;
            this.cartItems.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });
            return cartQuantity;
        }
    };
    return cart;
}
const cart = Cart('cart-oop');
const businessCart = Cart('business-cart-oop');

cart.loadFromStorage();
businessCart.loadFromStorage();

cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
console.log(cart);
console.log(businessCart);



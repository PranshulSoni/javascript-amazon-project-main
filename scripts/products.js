export function getProductId(productId) {
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }

  });
  return matchingProduct;
}
class Products {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `/images/ratings/rating-${this.rating.stars * 10}.png`;
  }
  getPrice() {
    return `$${(this.priceCents / 100).toFixed(2)}`;
  }
}

class ClothingProducts extends Products {
  sizeChartLink;
  constructor(productDetails) {
    super(productDetails)
    this.sizeChartLink = productDetails.sizeChartLink;
  }
}
const tshirt = new ClothingProducts({
  id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
  name: "Adults Plain Cotton T-Shirt - 2 Pack",
  rating: {
    stars: 4.5,
    count: 56
  },
  priceCents: 799,
  keywords: [
    "tshirts",
    "apparel",
    "mens"
  ],
  type: "clothing",
  sizeChartLink: "images/clothing-size-chart.png"
});

export let products = [];

export function loadProductsfetch() {
  const promise = fetch('https://supersimplebackend.dev/products')
    .then((response) => response.json())
    .then((data) => {
      products = data.map((productDetails) => {
        if (productDetails.type === "clothing") {
          return new ClothingProducts(productDetails);
        }
        else {
          return new Products(productDetails);
        }
      });
      console.log('load products');
    })
    .catch((error) => {
      console.error('Error loading products:', error);
    });
  return promise;
}
loadProductsfetch().then(() => {
  console.log('Products loaded successfully');
});

// export function loadProducts(func) {
//   const xhr = new XMLHttpRequest();
//   xhr.addEventListener('load', () => {
//     products = JSON.parse(xhr.response).map((productDetails) => {
//       if (productDetails.type === "clothing") {
//         return new ClothingProducts(productDetails);
//       }
//       else {
//         return new Products(productDetails);
//       }
//     });
//     console.log('load products');
//     if (typeof func === 'function') {
//       func();
//     }
//   });
//   xhr.open('GET', 'https://supersimplebackend.dev/products');
//   xhr.send();
// }
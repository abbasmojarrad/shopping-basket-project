const $ = document;

const shopItemButtons = $.querySelectorAll(".shop-item-button");
const shopItems = $.querySelector(".shop-items");
const basketItems = $.querySelector(".basket");
const cartTotalPrice = $.querySelector(".cart-total-price");

const items = [
  {
    name: "Album 1",
    price: "$10.00",
    picture: "Images/Album 1.png",
    quantity: 0,
  },
  {
    name: "Album 2",
    price: "$18.99",
    picture: "Images/Album 2.png",
    quantity: 0,
  },
  {
    name: "Album 3",
    price: "$13.99",
    picture: "Images/Album 3.png",
    quantity: 0,
  },
  {
    name: "Album 4",
    price: "$15.99",
    picture: "Images/Album 4.png",
    quantity: 0,
  },
];

let basket = [];
let totalPrise = 0;

window.addEventListener("load", function () {
  let div1, span1, button, span2, div2, img;
  items.forEach(function (item) {
    div1 = $.createElement("div");
    div1.className = "shop-item";

    span1 = $.createElement("span");
    span1.className = "shop-item-title";
    span1.innerHTML = item.name;

    img = $.createElement("img");
    img.className = "shop-item-image";
    img.setAttribute("src", item.picture);

    div2 = $.createElement("div");
    div2.className = "shop-item-details";

    span2 = $.createElement("span");
    span2.className = "shop-item-price";
    span2.innerHTML = item.price;

    button = $.createElement("button");
    button.className = "btn btn-primary shop-item-button";
    button.innerHTML = "ADD TO CART";
    button.setAttribute("type", "button");
    button.addEventListener("click", function () {
      addBasket(item);
    });

    div2.append(span2, button);
    div1.append(span1, img, div2);

    shopItems.append(div1);
  });
});

function addBasket(item) {
  item.quantity++;

  const check = basket.find(function (album) {
    return album.name === item.name;
  });
  if (!check) {
    basket.push(item);
    // console.log(basket)
  }
  createBasket(basket);

  // console.log(basket)
}

function createBasket(itemss) {
  basketItems.innerHTML = "";
  totalPrise.innerHTML = 0;
  itemss.forEach(function (item) {
    const div1 = $.createElement("div");
    div1.className = "cart-row";

    const div2 = $.createElement("div");
    div2.className = "cart-item cart-column";

    span1 = $.createElement("span");
    span1.className = "cart-item-title";
    span1.innerHTML = item.name;

    img = $.createElement("img");
    img.className = "cart-item-image";
    img.setAttribute("src", item.picture);
    img.setAttribute("height", 100);
    img.setAttribute("width", 100);

    span2 = $.createElement("span");
    span2.className = "cart-price cart-column";
    span2.innerHTML = item.price;

    const div3 = $.createElement("div");
    div3.className = "cart-quantity cart-column";

    const input = $.createElement("input");
    input.className = "cart-quantity-input";
    input.setAttribute("type", "number");
    input.setAttribute("value", item.quantity);
    input.addEventListener("input", function (e) {
      if (e.target.value > 0) {
        item.quantity = e.target.value;

        getPrise();
      }
    });

    const button = $.createElement("button");
    button.className = "btn btn-danger";
    button.setAttribute("type", "button");
    button.innerHTML = "REMOVE";
    button.addEventListener("click", function (e) {
      e.target.parentElement.parentElement.remove();
      item.quantity = 0;
      items.forEach(function (album) {
        if (album.name === item.name) {
          album.quantity = 0;
        }
      });
      getPrise();
    });
    if (item.quantity > 0) {
      div2.append(img, span1);
      div3.append(input, button);
      div1.append(div2, span2, div3);
      basketItems.append(div1);
    }

    getPrise();
  });
}

function getPrise() {
  totalPrise = 0;
  basket.forEach(function (item) {
    totalPrise = totalPrise + item.quantity * +item.price.split("$")[1];
    cartTotalPrice.innerHTML = "$" + totalPrise.toFixed(2);
  });
}

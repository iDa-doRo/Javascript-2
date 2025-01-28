// Given Code:
// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.
// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.

var cart = [];
var total = 0;

// Developed Code: 
// Exercise 1
const buy = (productId) => {
    // 1. Loop for to the array products to get the item to add to cart
    const product = products.find(p => p.id === productId);
    // 2. Add found product to the cart array
    const cartItem = cart.find (item => item.id === productId);
    // 2.1 If exists increment number, else add to cart
    if (cartItem) {
        cartItem.quantity += 1;
        console.log(`Quantity of ${cartItem.name} updated to ${cartItem.quantity}`);
    } else {
        cart.push({...product, quantity:1 });
        console.log(`${product.name} added to cart`);
    }
};    
console.log(cart);

// Exercise 2
const cleanCart = () => {
cart =[];
console.log('Empty shopping cart');
};

// Exercise 3 
const calculateTotal = () => { 
    // Calculate total price of the cart using the "cart" array
cart.forEach(item => {
    item.totalPrice = (item.price * item.quantity).toFixed(2);
    item.subtotalWithDiscount = null;
});
const totalCart = cart.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0).toFixed(2);
console.log(`Total cost of the cart: €${totalCart}`);  
return (totalCart);
};

// Exercise 4
const applyPromotionsCart = (cart) => {
    // Apply promotions to each item in the array "cart", if any
    cart.forEach(item => {
        if (item.offer && item.quantity >= item.offer.number) {
            const discount = item.offer.percent / 100;
            const discountedPrice = item.price * (1 - discount);
            item.subtotalWithDiscount = (item.quantity * discountedPrice).toFixed(2)
        } else {
            item.subtotalWithDiscount = (item.quantity * item.price).toFixed(2)
        }
    });
    console.log('Cart with promos: ', cart);
    return cart;
};

// Exercise 5
function printCart() {
    const cartList = document.getElementById('cart_list');
    const totalPriceCart = document.getElementById('total_price');
    const countProductCart = document.getElementById('count_product');
    cartList.innerHTML = ''; //empty current cart
    // Fill the shopping cart modal manipulating the shopping cart dom
    let totalItems = 0;
    cart.forEach(item => {
    const row = document.createElement('tr');
    const totalBill = item.subtotalWithDiscount ? item.subtotalWithDiscount : (item.price * item.quantity).toFixed(2);
    row.innerHTML = `
<th scope='row'>${item.name}</th>
<td>$${item.price.toFixed(2)}</td>
<td>${item.quantity}</td>
<td>$${totalBill}</td>
`;
cartList.appendChild(row);
totalItems += item.quantity;
});
const finalPrice = cart.reduce((acc, item) => {
    const subtotal = item.subtotalWithDiscount ? parseFloat(item.subtotalWithDiscount) : item.price * item.quantity;
    return acc + subtotal;
}, 0).toFixed(2);
totalPriceCart.innerHTML = finalPrice; 
countProductCart.innerHTML = totalItems;
}

// ** Nivell II **
// Exercise 7
function removeFromCart(id) {
    const cartIndex = cart.findIndex(item => item.id === id);
    if (cartIndex !== -1) {
        const cartItem = cart[cartIndex];
        if (cartIndex.quantity > 1) {
            cartItem.quantity -= 1;
        } else {
            cart.splice(cartIndex, 1);
        }
        applyPromotionsCart(cart); 
        printCart(); 
    }
};
function open_modal() {
    printCart();
}
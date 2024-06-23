const products = [
        { id: 101, name: 'TAPERED', price: 250, stock: 100, category: 'jeans', image: 'images/tapered.jpg' },
        { id: 102, name: 'MAONG', price: 300, stock: 100, category: 'jeans', image: 'images/maong.jpg' },
        { id: 103, name: 'SKINNY', price: 350, stock: 100, category: 'jeans', image: 'images/skinny.jpg' },
        { id: 104, name: 'LOOSE', price: 400, stock: 100, category: 'jeans', image: 'images/loose.jpg' },
		
        { id: 201, name: 'JOGGER', price: 300, stock: 100, category: 'tops', image: 'images/jogger.jpg' },
        { id: 202, name: 'CARGO', price: 250, stock: 100, category: 'tops', image: 'images/cargo.jpg' },
        { id: 203, name: 'SWEAT', price: 500, stock: 100, category: 'tops', image: 'images/sweat.jpg' },
        { id: 204, name: 'TWEED', price: 300, stock: 100, category: 'tops', image: 'images/tweed.jpg' },
		
        { id: 301, name: 'TRACK', price: 250, stock: 100, category: 'shorts', image: 'images/track.jpg' },
        { id: 302, name: 'BASKETBALL', price: 150, stock: 100, category: 'shorts', image: 'images/basketball.jpg' },
        { id: 303, name: 'BASEBALL', price: 300, stock: 100, category: 'shorts', image: 'images/baseball.jpg' },
        { id: 304, name: 'DRI-FIT', price: 350, stock: 100, category: 'shorts', image: 'images/dri.jpg' },
		
        { id: 401, name: 'BAG PACK', price: 550, stock: 100, category: 'dresses', image: 'images/bag.jpg' },
        { id: 402, name: 'MESSENGER BAG', price: 400, stock: 100, category: 'dresses', image: 'images/mess.jpg' },
        { id: 403, name: 'GYM BAG', price: 350, stock: 100, category: 'dresses', image: 'images/gym.jpg' },
        { id: 404, name: 'TOTE BAG', price: 450, stock: 100, category: 'dresses', image: 'images/tote.jpg' },
		
        { id: 501, name: 'BASKETBALL SHOES', price: 1500, stock: 100, category: 'shoes', image: 'images/basket.jpg' },
        { id: 502, name: 'LOAFERS', price: 1000, stock: 100, category: 'shoes', image: 'images/loaf.jpg' },
        { id: 503, name: 'SNEAKERS', price: 2000, stock: 100, category: 'shoes', image: 'images/sneakers.jpg' },
        { id: 504, name: 'SANDALS', price: 3000, stock: 100, category: 'shoes', image: 'images/sandals.jpg' }
    ];

    let cart = [];

    function displayProducts(categoryFilter) {
        const productsDiv = document.getElementById('products');
        productsDiv.innerHTML = '';
        products.forEach(product => {
            if (!categoryFilter || product.category === categoryFilter) {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <h3>${product.name}</h3>
                        <p>₱${product.price}</p>
                        <p>Stock: <span id="stock-${product.id}">${product.stock}</span></p>
                        <button onclick="increaseStock(${product.id})">+</button>
                        <button onclick="decreaseStock(${product.id})">-</button>
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                `;
                productsDiv.appendChild(productDiv);
            }
        });
    }

    function increaseStock(productId) {
        const product = products.find(item => item.id === productId);
        product.stock++;
        document.getElementById(`stock-${productId}`).textContent = product.stock;
    }

    function decreaseStock(productId) {
        const product = products.find(item => item.id === productId);
        if (product.stock > 0) {
            product.stock--;
            document.getElementById(`stock-${productId}`).textContent = product.stock;
        }
    }

    function addToCart(productId) {
        const product = products.find(item => item.id === productId);
        if (product && product.stock > 0) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            product.stock--;
            updateCart();
        } else {
            alert('Out of stock!');
        }
    }

    function updateCart() {
        const cartItemsDiv = document.getElementById('cart-items');
        cartItemsDiv.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>₱${item.price * item.quantity}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsDiv.appendChild(cartItemDiv);
            total += item.price * item.quantity;
        });
        const cartTotalDiv = document.getElementById('cart-total');
        cartTotalDiv.textContent = `Total: ₱${total.toFixed(2)}`;
    }

    function removeFromCart(index) {
        const removedItem = cart.splice(index, 1)[0];
        // Update stock
        const product = products.find(item => item.id === removedItem.id);
        product.stock += removedItem.quantity;
        // Update cart display
        updateCart();
    }

    function generateReceipt() {
        let receiptContent = "CJC THRIFT SHOP RECEIPT\n\n";
        cart.forEach(item => {
            receiptContent += `${item.name} x ${item.quantity}: ₱${(item.price * item.quantity).toFixed(2)}\n`;
        });
        receiptContent += `\nTotal: ₱${calculateTotal()}`;
        return receiptContent;
    }

    function calculateTotal() {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        return total.toFixed(2);
    }

    function checkout() {
        if (cart.length === 0) {
            alert('Your cart is empty. Please pick an item.');
            return;
        }

        const discountType = document.getElementById('discount-type').value;
        let discount = 0;

        switch(discountType) {
            case 'senior':
                discount = 0.20;
                break;
            case 'pwd':
                discount = 0.30;
                break;
            case 'student':
                discount = 0.10;
                break;
            default:
                discount = 0;
        }

        let total = parseFloat(calculateTotal());
        let discountedTotal = total - (total * discount);

        const paymentAmount = parseFloat(document.getElementById('payment-amount').value);

        if (isNaN(paymentAmount) || paymentAmount <= 0) {
            alert('Invalid payment amount.');
            return;
        }

        if (paymentAmount < discountedTotal) {
            alert('Insufficient payment amount.');
            return;
        }

        let change = paymentAmount - discountedTotal;

        let receipt = generateReceipt();
        receipt += `\n\nDiscount: ${discount * 100}%`; 
        receipt += `\nDiscounted Total: ₱${discountedTotal.toFixed(2)}`; 
        receipt += `\nPayment: ₱${paymentAmount.toFixed(2)}`;
        receipt += `\nChange: ₱${change.toFixed(2)}`;

        window.alert(receipt);

        cart = [];
        updateCart();

        products.forEach(product => {
            document.getElementById(`stock-${product.id}`).textContent = product.stock;
        });
    }

    document.getElementById('checkout-btn').addEventListener('click', checkout);

    window.onload = () => {
        displayProducts();
    };
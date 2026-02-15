// Product Data with actual product images from Unsplash
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 79.99,
        description: "Premium sound quality with noise cancellation",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        description: "Track your fitness and stay connected",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 89.99,
        description: "Comfortable and stylish athletic shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Camera Lens",
        price: 349.99,
        description: "Professional photography equipment",
        image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Gaming Mouse",
        price: 59.99,
        description: "High-precision gaming accessory",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Laptop Stand",
        price: 39.99,
        description: "Ergonomic design for better posture",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        price: 69.99,
        description: "Portable music with powerful bass",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        name: "Phone Case",
        price: 24.99,
        description: "Premium protection for your phone",
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=300&fit=crop"
    }
];

// Cart array to store added items
let cart = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});

// Render products to the DOM
function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x300?text=Product+Image'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showCart();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update quantity in cart
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100x100?text=Product'">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="price">$${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Show cart
function showCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
}

// Close cart when clicking outside
function closeCartOutside(event) {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (event.target === cartOverlay) {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase!\n\nTotal Amount: $${totalAmount.toFixed(2)}\n\nYour order has been placed successfully!`);
    
    // Clear cart after checkout
    cart = [];
    updateCartUI();
    toggleCart();
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4ecdc4, #44bd32)' : 'linear-gradient(135deg, #ff6b6b, #ffa502)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add keyframe animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

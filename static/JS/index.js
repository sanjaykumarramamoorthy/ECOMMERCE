document.addEventListener('DOMContentLoaded', function () {
    const decrementButton = document.querySelector('.decrement');
    const incrementButton = document.querySelector('.increment');
    const quantityInput = document.querySelector('.quantity-input');
    const removeButton = document.querySelector('.remove');
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    const subtotalElement1 = document.querySelector('.subtotal-sub');
    const subtotalElement2 = document.querySelector('.subtotal-main');
    const totalPriceElement = document.querySelector('.total-price');
    
    let shippingCost = 0;
    
    function calculateSubtotal() {
        const itemPriceElement = document.querySelector('.cart-item .price');
        const price = parseFloat(itemPriceElement.textContent.replace(/₹|,/g, '')); 
        const quantity = parseInt(quantityInput.value);
        return price * quantity;
    }
    
    function updateTotal() {
        const subtotal = calculateSubtotal();
        const total = subtotal + shippingCost;
        subtotalElement2.textContent = `₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
        subtotalElement1.textContent = `₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
        totalPriceElement.textContent = `₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    }
    
    decrementButton.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
            updateTotal();
        }
    });
    
    incrementButton.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        quantity++;
        quantityInput.value = quantity;
        updateTotal();
    });
    
    removeButton.addEventListener('click', () => {
        quantityInput.value = 0;
        updateTotal();
    });
    
    shippingOptions.forEach(option => {
        option.addEventListener('change', () => {
            shippingCost = parseFloat(option.value);
            updateTotal();
        });
    });

    updateTotal();
});

document.addEventListener('DOMContentLoaded', function () {
    const decrementButtons = document.querySelectorAll('.decrement');
    const incrementButtons = document.querySelectorAll('.increment');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const removeButtons = document.querySelectorAll('.remove');
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    const subtotalElement = document.querySelector('.subtotal');
    const totalPriceElement = document.querySelector('.total-price');
    const applyCouponButton = document.querySelector('.apply-coupon');
    const couponInput = document.querySelector('.coupon-input');

    let shippingCost = 0;
    let discount = 0;

    function calculateSubtotal() {
        let subtotal = 0;
        quantityInputs.forEach((input, index) => {
            const itemPriceElement = document.querySelectorAll('.cart-item .price')[index];
            const price = parseFloat(itemPriceElement.textContent.replace(/₹|,/g, '')); 
            const quantity = parseInt(input.value);
            subtotal += price * quantity;
        });
        return subtotal;
    }

    function updateTotal() {
        const subtotal = calculateSubtotal();
        const total = subtotal + shippingCost - discount;
        subtotalElement.textContent = `₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
        totalPriceElement.textContent = `₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    }

    decrementButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let quantity = parseInt(quantityInputs[index].value);
            if (quantity > 1) {
                quantity--;
                quantityInputs[index].value = quantity;
                updateTotal();
            }
        });
    });

    incrementButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let quantity = parseInt(quantityInputs[index].value);
            quantity++;
            quantityInputs[index].value = quantity;
            updateTotal();
        });
    });

    removeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            quantityInputs[index].value = 0;
            updateTotal();
        });
    });

    shippingOptions.forEach(option => {
        option.addEventListener('change', () => {
            shippingCost = parseFloat(option.value);
            updateTotal();
        });
    });

    applyCouponButton.addEventListener('click', () => {
        const couponCode = couponInput.value.trim();
        if (couponCode === 'DISCOUNT10') {
            discount = 10.00;
        } else {
            discount = 0;
        }
        updateTotal();
    });

    updateTotal();
});

'use strict';

import {getProductById} from "./services/productService.js";

class ProductDetail {
    constructor(product) {
        this.product = product;
        this.quantity = 1;
    }

    adjustQuantity(operation) {
        if (operation === '+' && this.quantity < 20) {
            this.quantity += 1;
        } else if (operation === '-' && this.quantity > 1) {
            this.quantity -= 1;
        }
        document.getElementById('quantityInput').value = this.quantity;
    }

    toggleSection(sectionId) {
        const section = document.getElementById(sectionId);
        const icon = section.previousElementSibling.querySelector('.detail-toggle-icon');
        if (icon) {
            console.log("Icon found, toggling class");
            icon.classList.toggle('detail-rotate-180');
        } else {
            console.log("Icon not found");
        }
        section.classList.toggle('hidden');
    }

    renderProductDetails() {
        const detailsContainer = document.getElementById('product-details');
        detailsContainer.innerHTML = `
        <div class="detail-container">
            <div class="detail-content-1">
                <!-- Product Name and Description -->
                <div>
                    <div class="detail-title">${this.product.name}</div>
                    <div class="detail-description">${this.product.description}</div>
                </div>

                <!-- Price and Discount -->
                <div class="detail-price-wrapper">
                    <div class="detail-price">$${this.product.price.toFixed(2)}</div>
                    <div class="detail-old-price">$${(this.product.price * 1.25).toFixed(2)}</div>
                    <div class="detail-discount">SAVE 20%</div>
                </div>

                <!-- Quantity and Add to Cart -->
                <div class="detail-quantity-wrapper">
                    <div class="detail-quantity-input">
                        <button id="decrease-quantity" class="detail-font-medium">−</button>
                        <input id="quantityInput" type="number" min="1" max="20" value="${this.quantity}">
                        <button id="increase-quantity" class="detail-font-medium">+</button>
                    </div>
                    <div class="detail-add-to-cart">
                        <button id="add-to-cart">Add To Cart</button>
                    </div>
                </div>

                <!-- Description Toggle -->
                <div class="detail-toggle-section">
                    <div class="detail-toggle-header" id="desc-header">
                        <p>Description</p>
                        <div id="desc-icon" class="detail-toggle-icon detail-transition-transform">
                                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"
                       fill="rgba(75,85,99,1)">
                    <path
                        d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
                  </svg>
                        </div>
                    </div>
                    <div id="description" class="detail-toggle-content hidden">${this.product.description}</div>
                </div>

                <!-- Ingredient Toggle -->
                <div class="detail-toggle-section">
                    <div class="detail-toggle-header" id="ing-header">
                        <p>Product Ingredient</p>
                        <div id="ing-icon" class="detail-toggle-icon detail-transition-transform">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"
                       fill="rgba(75,85,99,1)">
                    <path
                        d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
                  </svg>
                        </div>
                    </div>
                    <div id="ingredient" class="detail-toggle-content hidden">${this.product.ingredient}</div>
                </div>
            </div>
        </div>
    `;
    }

    initialize() {
        document.getElementById('product-image').src = this.product.image;
        this.renderProductDetails();
        this.addEventListeners();
    }

    addEventListeners() {
        // Add event listeners for quantity buttons
        document.getElementById('decrease-quantity').addEventListener('click', () => {
            this.adjustQuantity('-');
        });

        document.getElementById('increase-quantity').addEventListener('click', () => {
            this.adjustQuantity('+');
        });

        // Add event listener for the add to cart button
        document.getElementById('add-to-cart').addEventListener('click', () => {
            this.addToCart();
        });

        // Add event listeners for section toggles
        document.getElementById('desc-header').addEventListener('click', () => {
            this.toggleSection('description');
        });

        document.getElementById('ing-header').addEventListener('click', () => {
            this.toggleSection('ingredient');
        });
    }
}

// Usage
(async () => {
    const productData = await getProductById(window.RouterParams['id']);
    const productDetail = new ProductDetail(productData);
    console.log(productDetail);
    productDetail.initialize();
})();

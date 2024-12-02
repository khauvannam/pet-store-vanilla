'use strict'

import {getAllCategories} from "./services/categoryService.js";

import {getAllProducts} from "./services/productService.js";

function renderWrapper(wrapper, limit) {

    const placeholders = Array(limit).fill(null);
    const placeholder = `
      <div class="discover-placeholder">
        <div class="discover-placeholder-image"></div>
        <div class="discover-placeholder-line discover-placeholder-line-large"></div>
        <div class="discover-placeholder-line"></div>
        <div class="discover-placeholder-line"></div>
        <div class="discover-placeholder-line"></div>
      </div>
    `;
    placeholders.forEach(() => {
        wrapper.innerHTML += placeholder;
    });
}

class Discover {
    constructor(limit = 4) {
        this.limit = limit;
        this.categories = [];
        this.placeholders = Array(limit).fill(null);
    }

    getUrl(name) {
        return name.replace(/\s+/g, "-").toLowerCase();
    }

    renderCategory(category) {
        return `
      <a data-link="" href="/collections/${this.getUrl(category.name)}" class="discover-category">
        <div class="discover-category-image-wrapper">
          <img class="discover-category-image" src="${category.image}" alt="${category.name}" />
        </div>
        <p class="discover-category-name">${category.name}</p>
      </a>
    `;
    }

    async fetchCategories() {
        try {
            this.categories = await getAllCategories(this.limit);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            // Optionally handle fallback or error state
        }
    }

    async render(targetSelector) {

        const target = document.querySelector(targetSelector);
        if (!target) {
            console.error(`Target element '${targetSelector}' not found.`);
            return;
        }

        const wrapper = document.createElement("div");
        wrapper.className = "discover-wrapper";

        // Show placeholders initially
        renderWrapper(wrapper, this.limit);
        target.appendChild(wrapper);

        // Fetch and render categories
        await this.fetchCategories();
        wrapper.innerHTML = ""; // Clear placeholders
        if (this.categories.length > 0) {
            this.categories.forEach((category) => {
                wrapper.innerHTML += this.renderCategory(category);
            });
        }
    }
}

// Example usage
const discover = new Discover(4);
await discover.render(".discover-container");


class Collection {
    constructor(limit = 4) {
        this.limit = limit;
        this.categories = [];
        this.placeholders = Array(limit).fill(null);
    }

    getUrl(name) {
        return name.replace(/\s+/g, "-").toLowerCase();
    }

    limitDescription(description) {
        return description.length > 50
            ? `${description.substring(0, 50)}...`
            : description;
    }

    renderCategory(category) {
        return `
      <a data-link="" href="/collections/${this.getUrl(category.name)}" class="collection-card">
        <div class="collection-image-wrapper">
          <img class="collection-image" src="${category.image}" alt="${category.name}" />
        </div>
        <p class="collection-name">${category.name}</p>
        <p class="collection-description">${this.limitDescription(category.description)}</p>
        <button class="custom-button">
                        <p class="button-text">Learn More</p>
        </button>
      </a>
    `;
    }

    async fetchCategories() {
        try {
            this.categories = await getAllCategories(this.limit);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    }

    async render(targetSelector) {
        const target = document.querySelector(targetSelector);
        if (!target) {
            console.error(`Target element '${targetSelector}' not found.`);
            return;
        }

        const wrapper = document.createElement("div");
        wrapper.className = "collection-grid";

        // Show placeholders initially
        renderWrapper(wrapper, this.limit)
        target.appendChild(wrapper);

        // Fetch and render categories
        await this.fetchCategories();
        wrapper.innerHTML = ""; // Clear placeholders
        if (this.categories.length > 0) {
            this.categories.forEach((category) => {
                wrapper.innerHTML += this.renderCategory(category);
            });
        }
    }
}


class BestSeller {
    constructor(limit = 4) {
        this.limit = limit;
        this.products = [];
        this.placeholders = Array(limit).fill(null);
    }

    limitDescription(description) {
        return description.length > 50
            ? `${description.substring(0, 50)}...`
            : description;
    }

    renderProduct(product) {
        return `
      <a href="/product?id=${product.id}" class="bestseller-card">
        <div class="bestseller-card-image-wrapper">
          <img class="bestseller-card-image" src="${product.image}" alt="${product.name}" />
          <span class="bestseller-card-badge">Best Seller</span>
        </div>
        <p class="bestseller-card-name">${product.name}</p>
        <p class="bestseller-card-description">${this.limitDescription(product.description)}</p>
          <button class="custom-button">
                        <p class="button-text">Learn More</p>
                    </button>
      </a>
    `;
    }

    renderPlaceholder() {
        return `
      <div class="bestseller-placeholder">
        <div class="bestseller-placeholder-image"></div>
        <div class="bestseller-placeholder-line bestseller-placeholder-line-large"></div>
        <div class="bestseller-placeholder-line"></div>
        <div class="bestseller-placeholder-line"></div>
        <div class="bestseller-placeholder-line"></div>
      </div>
    `;
    }

    async fetchProducts() {
        try {
            this.products = await getAllProducts();
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    }

    async render(targetSelector) {
        const target = document.querySelector(targetSelector);
        if (!target) {
            console.error(`Target element '${targetSelector}' not found.`);
            return;
        }

        const wrapper = document.createElement("div");
        wrapper.className = "bestseller-wrapper";

        // Show placeholders initially
        this.placeholders.forEach(() => {
            wrapper.innerHTML += this.renderPlaceholder();
        });
        target.appendChild(wrapper);

        // Fetch and render products
        await this.fetchProducts();
        wrapper.innerHTML = ""; // Clear placeholders
        if (this.products.length > 0) {
            this.products.forEach((product) => {
                wrapper.innerHTML += this.renderProduct(product);
            });
        } else {
            this.placeholders.forEach(() => {
                wrapper.innerHTML += this.renderPlaceholder();
            });
        }
    }
}

// Example usage
const bestSeller = new BestSeller(4);
await bestSeller.render(".bestseller-container");

// Example usage
const collection = new Collection(4);
await collection.render(".collection-container");

'use strict';

import {Layout as layout} from "./layout.js";

export class Router {

    constructor(routes) {
        this.routes = routes; // { "/home": "home.html", "/about": "about.html" }
        this.params = {}; // Store URL parameters
        this.currentRoute = ''; // Track the current route

        // Handle back/forward navigation
        window.onpopstate = () => this.navigate(window.location.pathname);
    }

    parseParams(url) {
        const [path, queryString] = url.split('?');
        const params = {};
        if (queryString) {
            queryString.split('&').forEach((param) => {
                const [key, value] = param.split('=');
                params[decodeURIComponent(key)] = decodeURIComponent(value);
            });
        }
        this.params = params;
        window.RouterParams = params;
        return path;
    }

    // Fetch content for the given route
    async loadContent(route) {
        const filePath = this.routes[route] || '404.html';
        console.log(filePath);
        try {
            const response = await fetch(`/content/${filePath}`);
            return await response.text();
        } catch (error) {
            return `<h1>Error</h1><p>${error.message}</p>`;
        }
    }

    // Navigate to a route
    async navigate(route) {
        const parsedRoute = this.parseParams(route); // Parse and store parameters
        this.currentRoute = parsedRoute;

        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = await this.loadContent(parsedRoute);
        layout.executeStyles(mainContent); // Load styles
        layout.executeScripts(mainContent); // Execute scripts
    }

    handleLinks() {
        document.addEventListener('click', async (event) => {
            if (event.target.tagName === 'A' && event.target.hasAttribute('data-link')) {
                event.preventDefault();
                const route = event.target.getAttribute('href');
                window.history.pushState({}, '', route); // Update browser history
                await this.navigate(route); // Navigate to the route
            }
        });
    }
}

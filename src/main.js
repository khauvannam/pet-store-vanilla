'use strict';

import {Router} from './router.js';
import {Layout} from './layout.js';

// Define routes
const routes = {
    '/': 'home.html',
    '/product': 'product.html',
    '/about': 'about.html',
    '/contact': 'contact.html',
};

// Initialize layout
const layout = new Layout();
await layout.renderLayout();

// Initialize router
const router = new Router(routes);

// Handle initial navigation
const initialRoute = window.location.pathname + window.location.search;
await router.navigate(initialRoute);

// Attach link click handler
router.handleLinks();

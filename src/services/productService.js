'use strict'

import {AppConstants} from "../constant.js";
import axios from "axios";

const apiUrl = `${AppConstants.API_URL}/api/products`;

/**
 * Fetch all products from the API.
 * @returns Promise
 */
export async function getAllProducts() {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export async function getProductById(id) {
    try {
        const response = await axios.get(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
    }
}

export async function getProductsByCategory(categoryName) {
    try {
        const response = await axios.get(`${apiUrl}/collection/${categoryName}`);
        console.log(categoryName);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching collection: ${error}`);
        throw error;
    }
}

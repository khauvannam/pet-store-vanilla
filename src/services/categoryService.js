'use strict';

import axios from "axios";
import {AppConstants} from "../constant.js";

const API_URL = `${AppConstants.API_URL}/api/categories`;

/**
 * Fetch all categories from the API.
 * @returns {Promise}
 */
export async function getAllCategories(limit = 4) {
    try {
        const result = await axios.get(`${API_URL}?limit=${limit}`);
        return result.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

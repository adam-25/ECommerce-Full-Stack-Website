/*
	Date: May 31, 2022
		* Created Action for admin to get All Products.
		* Add Creating a new Product.

	Date: June 1, 2022
		* Created Action for admin to delete a product.
		* Created Action for admin to update a product.
*/

// Importing necessary constants.
import {
	ADMIN_ALL_PRODUCTS_REQUEST,
	ADMIN_ALL_PRODUCTS_SUCCESS,
	ADMIN_ALL_PRODUCTS_FAILURE,
	ADMIN_NEW_PRODUCT_REQUEST,
	ADMIN_NEW_PRODUCT_SUCCESS,
	ADMIN_NEW_PRODUCT_FAILURE,
	ADMIN_DELETE_PRODUCT_REQUEST,
	ADMIN_DELETE_PRODUCT_SUCCESS,
	ADMIN_DELETE_PRODUCT_FAILURE,
	ADMIN_UPDATE_PRODUCT_REQUEST,
	ADMIN_UPDATE_PRODUCT_SUCCESS,
	ADMIN_UPDATE_PRODUCT_FAILURE,
	ADMIN_ALL_REVIEWS_REQUEST,
	ADMIN_ALL_REVIEWS_SUCCESS,
	ADMIN_ALL_REVIEWS_FAILURE,
	ADMIN_DELETE_REVIEW_REQUEST,
	ADMIN_DELETE_REVIEW_SUCCESS,
	ADMIN_DELETE_REVIEW_FAILURE,
	ADMIN_ONE_PRODUCT_REQUEST,
	ADMIN_ONE_PRODUCT_SUCCESS,
	ADMIN_ONE_PRODUCT_FAILURE,
	CLEAR_ERRORS
} from "../../Constants/Admin/adminProductsConstants";

// Importing axios for making API calls.
import axios from "axios";

// Get All Products by Admin Action.
export const adminAllProducts = () => async (dispatch) => {
	try {

		// Request to get all Products.
		dispatch({ type: ADMIN_ALL_PRODUCTS_REQUEST });

		// Get all products data.
		const { data } = await axios.get("/api/v1/admin/products/getAll");

		// Dispatching success action.
		dispatch({
			type: ADMIN_ALL_PRODUCTS_SUCCESS,
			payload: data
		});
	} catch (error) {
		// Dispatching failure action.
		dispatch({
			type: ADMIN_ALL_PRODUCTS_FAILURE,
			payload: error.response.data.error
		});
	}
}

// Create a new Product Action.
export const adminCreateNewProduct = (productData) => async (dispatch) => {
	try {

		// Request to create new product.
		dispatch({ type: ADMIN_NEW_PRODUCT_REQUEST });

		const config = {headers: {'Content-Type': 'application/json'}};

		// Create new product data.
		const { data } = await axios.post("/api/v1/products/newProduct", productData, config);

		// Dispatching success action.
		dispatch({
			type: ADMIN_NEW_PRODUCT_SUCCESS,
			payload: data
		});

	} catch (error) {
		// Dispatching failure action.
		dispatch({
			type: ADMIN_NEW_PRODUCT_FAILURE,
			payload: error.response.data.error
		});
	}
}

export const adminDeleteProduct = (productId) => async (dispatch) => {
	try {

		// Request to delete product.
		dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST });

		// Delete product data.
		const { data } = await axios.delete("/api/v1/product/" + productId);

		// Dispatching success action.
		dispatch({
			type: ADMIN_DELETE_PRODUCT_SUCCESS,
			payload: data
		});

	} catch (error) {
		// Dispatching failure action.
		dispatch({
			type: ADMIN_DELETE_PRODUCT_FAILURE,
			payload: error.response.data.error
		});
	}
}

// Admin update a product Action.
export const adminUpdateProduct = (productData, id) => async (dispatch) => {
	try {

		// Request to update product.
		dispatch({ type: ADMIN_UPDATE_PRODUCT_REQUEST });

		const config = {headers: {'Content-Type': 'application/json'}};

		// Update product data.
		const { data } = await axios.put("/api/v1/product/" + id, productData, config);

		// Dispatching success action.
		dispatch({
			type: ADMIN_UPDATE_PRODUCT_SUCCESS,
			payload: data
		});

	} catch (error) {
		// Dispatching failure action.
		dispatch({
			type: ADMIN_UPDATE_PRODUCT_FAILURE,
			payload: error.response.data.error
		});
	}
}

// Action for ADMIN to get all reviews.
export const adminAllReviews = (id) => async (dispatch) => {
	try {

		// Request to get all reviews.
		dispatch({ type: ADMIN_ALL_REVIEWS_REQUEST });

		// Get all reviews data.
		const { data } = await axios.get("/api/v1/admin/reviews?id=" + id);

		// Dispatching success action.
		dispatch({
			type: ADMIN_ALL_REVIEWS_SUCCESS,
			payload: data
		});
	} catch (error) {
		// Dispatching failure action.
		dispatch({
			type: ADMIN_ALL_REVIEWS_FAILURE,
			payload: error.response.data.error
		});
	}
}

// ADMIN to delete a review of the product.
export const adminDeleteReview = (id, productID) => async (dispatch) => {
	try {

		// Request to delete review.
		dispatch({ type: ADMIN_DELETE_REVIEW_REQUEST });

		// Delete review data.
		const { data } = await axios.delete("/api/v1/admin/reviews?id=" + id + "&productID=" + productID);

		// Dispatching success action.
		dispatch({
			type: ADMIN_DELETE_REVIEW_SUCCESS,
			payload: data
		});

	} catch (error) {
		// Dispatching failure action.
		dispatch({
			type: ADMIN_DELETE_REVIEW_FAILURE,
			payload: error.response.data.error
		});
	}
}

export const getAdminOneProduct = (id) => async (dispatch) => {
	try {
		// Request to get one product.
		dispatch({ type: ADMIN_ONE_PRODUCT_REQUEST });

		// Get one product data.
		const { data } = await axios.get("/api/v1/adminProduct/" + id);

		// Dispatching success action.
		dispatch({
			type: ADMIN_ONE_PRODUCT_SUCCESS,
			payload: data
		});

	} catch (error) {
		// Dispatching failure action.
		dispatch({
			type: ADMIN_ONE_PRODUCT_FAILURE,
			payload: error.response.data.error
		});
	}
}

// Clearing all the errors.
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
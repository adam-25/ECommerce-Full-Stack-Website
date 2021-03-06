/*	
	Date: May 19, 2022
		* Login/Register User Reducer.
		* Loading User Reducer.

	Date: May 20, 2022
		* Logout User Reducer.

	Date: June 2, 2022
		* Delete User Account Reducer.
*/

// Importing all Constants required.
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOADING_REQUEST,
	LOADING_SUCCESS,
	LOADING_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAIL,
	DELETE_USER_RESET,
	CLEAR_ERRORS
}
	from "../Constants/userConstant";

// User Reducer.
export const userReducer = (state = { user: {} }, action) => {

	switch (action.type) {

		// LOGIN, REGISTER || LOADING request.
		case LOGIN_REQUEST:
		case REGISTER_REQUEST:
		case LOADING_REQUEST:
			return {
				loading: true,
				isAuthenticateUser: false
			}

		// When LOGIN, REGISTER, LOADING request success.
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
		case LOADING_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthenticateUser: true,
				user: action.payload.user
			}

		// When LOGIN, REGISTER request fail.
		case LOGIN_FAIL:
		case REGISTER_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
				isAuthenticateUser: false,
				user: null
			}

		// When LOADING request fails.
		case LOADING_FAIL:
			return {
				loading: false,
				error: action.payload,
				isAuthenticateUser: false,
				user: null
			}

		// When LOGOUT request success.
		case LOGOUT_SUCCESS:
			return {
				loading: false,
				user: null,
				isAuthenticateUser: false,
			}

		// When Logout request fails.
		case LOGOUT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		// Clearing errors.
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			}
		default:
			return state;
	}
};

// Deleting User Account Reducer.
export const deleteUserReducer = (state = { status: false }, action) => {

	switch (action.type) {
		case DELETE_USER_REQUEST:
			return {
				...state,
				loading: true
			}
		case DELETE_USER_SUCCESS:
			return {
				loading: false,
				status: action.payload.status
			}
		case DELETE_USER_FAIL:
			return {
				loading: false,
				error: action.payload
			}
		case DELETE_USER_RESET:
			return {
				loading: false,
				status: false
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			}
		default:
			return state;

	}
}
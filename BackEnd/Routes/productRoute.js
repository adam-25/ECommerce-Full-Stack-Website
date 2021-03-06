/*
	Date: May 8, 2022
		* All the routers relating to products.

	Date: May 11, 2022
		* Add, get or delete a review of a product.

	Date: June 1, 2022
		* Add Route to Get Random, Home featured Product.
*/

// Importing necessary files.
const express = require('express');
const router = express.Router();
const product = require('../Controllers/productController');
const { isAuthenticateUser, isAdmin } = require('../MiddleWare/Authentication');

// Creating a route where all the products can be displayed.
router.route("/products").get(product.getAllProducts);

// Creating a route where a all product count can be displayed.
router.route("/admin/products/getAll").get(isAuthenticateUser, isAdmin("admin"), product.getAllProductsAdmin);

router.route("/adminProduct/:id").get(isAuthenticateUser, isAdmin("admin"), product.getOneAdminProduct);
// Creating a route to create a new product.
router.route("/products/newProduct").post(isAuthenticateUser, isAdmin("admin"), product.createProduct);

// Update a existing product, delete a product or getOne product by ID.
router.route("/product/:id")
.put(isAuthenticateUser, isAdmin("admin"), product.updateProduct)
.delete(isAuthenticateUser, isAdmin("admin"), product.deleteProduct)
.get(product.getOneProduct);

router.route('/randomProducts').get(product.getRandomProductCarousel);
router.route('/homeProducts').get(product.getHomeHighestSellingProducts);

// Add Review of a product.
router.route("/reviews/addReview").put(isAuthenticateUser, product.updateOrCreateReview);

// Get add the reviews, delete a specific review.
router.route("/admin/reviews").get(product.getAllReviews).delete(product.deleteReview);

module.exports = router;
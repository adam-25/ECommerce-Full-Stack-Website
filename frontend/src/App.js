/*
	Date: May 13, 2022
		* Created App for ECommerce
		* Created Header, Footer Component.
	
	Date: May 15, 2022
		* Created Home Route.

	Date: May 17, 2022
		* Created SpecificProduct and All Products Route.
		* Add Route to show products When it's is searched.

	Date: May 19, 2022
		* Add Route of Login page.
		* Add to check that user is logged in or not.
	
	Date: May 20, 2022
		* Add UserOptions when it logged in.
		* Add Loading, Logout and Account page Routes.
		* Add Update User Name and Password when logged in Routes.

	Date: May 21, 2022
		* Add Update Password route while user logged in.
		* Add Forgot Password Route.
		* Add Route which have the component of resetting the password.

	Date: May 23, 2022
		* Add Cart Route.

	Date: May 25, 2022
		* Add Shipping Information Route.
*/

// Importing CSS and Router, doms.
import './App.css';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// Importing Components.
import Header from './Components/Layout/Headers/Header.js';
import Footer from './Components/Layout/Footer/Footer.js';
import Home from './Components/Home/Home';
import SpecificProduct from './Components/SpecificProduct/SpecificProduct';
import Products from "./Components/Products/Products";
import LoginRegister from './Components/Login/LoginRegister';
import UserOptions from "./Components/Layout/UserOptions/UserOptions";
import { loadUser } from './Actions/userAction';
import Account from './Components/Account/Account';
import UpdateName from './Components/UpdateDetails/UpdateName';
import UpdateEmail from './Components/UpdateDetails/UpdateEmail';
import UpdatePassword from './Components/UpdateDetails/UpdatePassword.js';
import ForgotPassword from './Components/UpdateDetails/ForgotPassword.js';
import ResetPassword from './Components/UpdateDetails/ResetPassword.js';
import Logout from './Components/Logout/Logout';
import Cart from "./Components/Cart/Cart";
import ShippingInformation from "./Components/Checkout/ShippingInformation";

function App() {

	const dispatch = useDispatch();
	const { isAuthenticateUser } = useSelector(state => state.user);

	useEffect(() => {
		dispatch(loadUser());

	}, [dispatch]);

	return (
		<Router>
			{/* Navbar Header */}
			<Header />

			{/* If User is logged out and go to logout path then redirect to login */}
			{(window.location.pathname !== "/" && isAuthenticateUser) ? <UserOptions /> : <div></div>}
			{(window.location.pathname === "/logout" && !isAuthenticateUser) ? <Redirect to="/login" /> : <div></div>}

			{/* Path for different pages */}
			<Route exact path="/" component={Home} />
			<Route exact path="/product/:id" component={SpecificProduct} />
			<Route exact path="/products" component={Products} />
			<Route path="/products/:searchWords" component={Products} />
			<Route exact path="/login" component={LoginRegister} />
			<Route exact path="/account" component={Account} />
			<Route exact path="/updateName" component={UpdateName} />
			<Route exact path="/updateEmail" component={UpdateEmail} />
			<Route exact path="/logout" component={Logout} />
			<Route exact path="/password/update" component={UpdatePassword} />
			<Route exact path="/password/forgotPassword" component={ForgotPassword} />
			<Route exact path="/password/reset/:resetToken" component={ResetPassword} />
			<Route exact path="/cart" component={Cart} />
			<Route exact path="/Checkout" component={ShippingInformation} />

			{/* Footer of the website. */}
			<Footer />
		</Router>
	);
}

export default App;

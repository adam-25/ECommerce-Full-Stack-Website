/*
	Date: June 2, 2022
		* Create component for admin to update user email.

*/

// Importing necessary modules.
import React, { useEffect, Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// Importing necessary components.
import SideBar from '../../Layout/SideBar';
import MetaData from '../../../Layout/MetaData';
import Loading from '../../../Loading/Loading';
import Heading from '../../../Layout/Heading/Heading';
import { clearErrors as userClearError } from '../../../../Actions/userAction';
import { adminGetOneUser, adminUpdateUser, clearErrors } from '../../../../Actions/Admin/adminUsersAction';

const UpdateUserNameAdmin = ({ match }) => {

	const history = useHistory();
	const dispatch = useDispatch();

	// Getting user and admin from store.
	const { user, loading, isAuthenticateUser, error } = useSelector(state => state.user);
	const { user: adminOneUser, loading: loadingOneUser, error: errorOneUser } = useSelector(state => state.adminOneUser);

	const [newFullName, setNewFullName] = useState("");

	// When changing email has been submit.
	const changeNameSubmitAdmin = (e) => {
		e.preventDefault();
		
		if (newFullName === '' || newFullName === adminOneUser.userFullName) {
			toast("Please enter an appropriate user name...");
			return;
		}

		const userData = { newFullName: newFullName }

		dispatch(adminUpdateUser(match.params.id, userData));
		history.push("/admin/users");
	}

	useEffect(() => {

		// If admin is not logged in then redirect to login page.
		if (!loading)
			if (isAuthenticateUser === false)
				history.push('/login');

		// If user is not admin then cannot access all Products.
		if (!loading)
			if (isAuthenticateUser === true)
				if (user.userRole !== 'admin') {
					history.push('/');
					toast("Error: Cannot Access this Resource...")
				}

		if (error) {
			toast("Error: " + error);
			dispatch(userClearError());
		}

		if (errorOneUser) {
			toast("Error: " + errorOneUser);
			dispatch(clearErrors());
		}

		// Getting user depend on id.
		dispatch(adminGetOneUser(match.params.id));

	}, [loading, history, isAuthenticateUser, user, dispatch, error, errorOneUser, match.params.id]);


	return (
		<Fragment>
			{loading || loadingOneUser ? <Loading /> : <Fragment>
				{/* Title of the page */}
				<MetaData title="Update User Name -- ADMIN" />
				{/* Sidebar */}
				<SideBar />
				{/* Heading of the page */}
				<Heading props="Update User Name..." />
				<div className="name-change-container">
					<div className="name-info-container">
						{/* Changing name heading. */}
						<div>
							<h3>Change Your Name</h3>
						</div>
						<div>
							{/* Paragraph and new Name */}
							<p>{"If you want to change the name associated with " + adminOneUser.userFirstName + "'s E-Shop account," +
								"you may do so below. Be sure to click the Save Changes button when you are done."}</p>
							<h5>New Name</h5>

							{/* Form when submit name will be updated. */}
							<form className="name-change-button" onSubmit={changeNameSubmitAdmin}>
								<input type="text" className='new-name-input' required onChange={(e) => setNewFullName(e.target.value)} />
								<button type='submit'>Save Changes</button>
							</form>
						</div>
					</div>
				</div>
			</Fragment>}
		</Fragment>
	)
}

export default UpdateUserNameAdmin
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home, Auth } from '../containers';

const Router = ({ authStatus }) => {
	const defaultPath = authStatus ? '/home' : '/auth';
	return (
		<BrowserRouter>
			{/* <MainMenu authorized={isAuthorized()} menuItems={menuItems.filter(item => !item.hidden)} /> */}
			<Switch>
				<Route 
					path='/home'
					render={props => (
						authStatus
							? <Home {...props}/>
							: <Redirect to="/auth" />
					)}
				/>
				<Route 
					path='/auth' 
					render={props => (
						authStatus
							? <Redirect to={defaultPath} />
							: <Auth {...props}/>
					)}
				/>
				<Redirect from="/" to={defaultPath} />
			</Switch>
		</BrowserRouter>
	);
};

export default connect(
	state => ({
		authStatus: state.authStatus
	}),
	{}
)(Router);
import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import {Home, Auth} from '../containers';

const Router = () => {
	const auth = false;
	const defaultPath = auth ? '/home' : '/auth';

	return (
		<HashRouter>
			{/* <MainMenu authorized={isAuthorized()} menuItems={menuItems.filter(item => !item.hidden)} /> */}
			<Switch>
				<Route 
					path='/home'
					render={props => (
						(auth === true)
							? React.createElement(Home, {...props})
							: <Redirect to="/auth" />
					)}
				/>
				<Route 
					path='/auth' 
					render={props => (
						(auth === false)
							? React.createElement(Auth, {...props})
							: <Redirect to={defaultPath} />
					)}
				/>
				<Redirect from="/" to={defaultPath} />
			</Switch>
		</HashRouter>
	);
};

export default Router;
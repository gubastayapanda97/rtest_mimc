import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tasks, Auth, Opportunities1, Opportunities2, Opportunities3, Projects, Calendar } from '../containers';
import { MainMenu } from './';

const Router = ({ authStatus }) => {
	const defaultPath = authStatus ? '/projects' : '/auth';
	return (
		<BrowserRouter>
			<MainMenu />
			<Switch>
				<Route 
					path='/tasks'
					render={props => (
						authStatus
							? <Tasks {...props}/>
							: <Redirect to="/auth" />
					)}
				/>
				<Route 
					path='/projects'
					render={props => (
						authStatus
							? <Projects {...props}/>
							: <Redirect to="/auth" />
					)}
				/>
				<Route 
					path='/calendar'
					render={props => (
						authStatus
							? <Calendar {...props}/>
							: <Redirect to="/auth" />
					)}
				/>
				<Route 
					path='/opportunities1'
					render={props => (
						authStatus
							? <Opportunities1 {...props}/>
							: <Redirect to="/auth" />
					)}
				/>
				<Route 
					path='/opportunities2'
					render={props => (
						authStatus
							? <Opportunities2 {...props}/>
							: <Redirect to="/auth" />
					)}
				/>
				<Route 
					path='/opportunities3'
					render={props => (
						authStatus
							? <Opportunities3 {...props}/>
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
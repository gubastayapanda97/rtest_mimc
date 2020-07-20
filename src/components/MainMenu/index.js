import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import MenuItemsList from '../../config/menu.json';
import BallotIcon from '@material-ui/icons/Ballot';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import styles from './styles.module.scss';

const MenuItem = ({ item, location }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	console.log('location.pathname === item.link', location.pathname === item.link)
	return (
		<>
			{item.link 
				? <NavLink className={`${styles.link} + ${location.pathname === item.link ? styles.isOpen : null}`} to={item.link}>
					<BallotIcon />
					{item.title}
				</NavLink>
				: <>
					<div className={styles.expandedLink} onClick={() => setIsExpanded(!isExpanded)}>
						<div className={styles.linkTitle}>
							<BallotIcon />
							{item.title}
						</div>
						{isExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon />}
					</div>
					{isExpanded 
						? item.subItems.map((el, index) => (
							<NavLink key={index} className={`${styles.subLink} + ${location.pathname === el.link ? styles.isOpen : null}`} to={el.link}>
								<BallotIcon />
								{el.title}
							</NavLink>
						))
						: null 
					}
				</>
			}
		</>
	);
};

const MainMenu = ({ authStatus, location }) => {
	const [isOpen, setIsOpen] = useState(false)
	
	return (
		authStatus 
		? <>
			<nav className={styles.menu}>
					{MenuItemsList.map((el, index) => <MenuItem key={index} item={el} location={location} />)}
			</nav> 
			
			<div className={styles.menubar}>
				<div className={`${styles.hambmenu} + ${isOpen ? styles.isopen : null}`} onClick={()=>setIsOpen(isOpen=>!isOpen)}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			
            <nav className={`${styles.expandMenu} + ${isOpen ? styles.isopen : null}`}>
				{MenuItemsList.map((el, index) => <MenuItem key={index} item={el} location={location} />)}
			</nav> 
		</>
		: null
	);
};

export default connect(
	state => ({
		authStatus: state.authStatus
	})
)(withRouter(MainMenu));
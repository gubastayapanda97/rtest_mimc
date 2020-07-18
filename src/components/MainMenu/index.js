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
	const isActive = location.pathname === item.link;
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<>
			{item.link 
				? <NavLink to={item.link}>
					<BallotIcon />
					{item.title}
				</NavLink>
				: <div>
					<div className={styles.link} onClick={() => setIsExpanded(!isExpanded)}>
						<div className={styles.linkTitle}>
							<BallotIcon />
							{item.title}
						</div>
						{isExpanded ? <ExpandLessIcon/> : <ExpandMoreIcon />}
					</div>
					{isExpanded 
						? item.subItems.map((el, index) => (
							<div key={index} className={styles.subLink}>
								<NavLink to={el.link}>
									<BallotIcon />
									{el.title}
								</NavLink>
							</div>
						))
						: null 
					}
				</div>
			}
		</>
	);
};

const MainMenu = ({ authStatus, location }) => {
	return (
		authStatus 
		? <div className={styles.menu}>
				{MenuItemsList.map((el, index) => <MenuItem key={index} item={el} location={location} />)}
		</div> 
		: null
	);
};

export default connect(
	state => ({
		authStatus: state.authStatus
	})
)(withRouter(MainMenu));
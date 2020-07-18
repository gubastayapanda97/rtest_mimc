import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { logout } from '../../redux/action';
import userAvatar from '../../assets/images/userAvatar.png';
import styles from './styles.module.scss';

const Layout = ({ firstname, lastname, logout, children }) => {
	return (
		<main className={styles.layout__container}>
			<div className={styles.header}>
				<Avatar alt={`${firstname} ${lastname}`} src={userAvatar} onClick={logout} />
			</div>
			{children}
		</main>
	);
};

export default connect(
	state => ({
		firstname: state.firstname, 
		lastname: state.lastname
	}),
	{ logout }
)(Layout);

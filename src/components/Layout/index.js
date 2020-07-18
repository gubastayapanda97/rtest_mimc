import React from 'react';
import styles from './styles.module.scss';

const Layout = ({ children }) => {
	return (
		<main className={styles.layout__container}>
			{children}
		</main>
	);
};

export default Layout;

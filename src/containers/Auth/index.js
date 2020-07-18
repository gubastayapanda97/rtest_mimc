import React from 'react';
import AuthForm from './AuthForm';

import styles from './styles.module.scss'

const Auth = () => {
	return (
		<div className={styles.container}>
			<AuthForm />
		</div>
	);
};

export default Auth;
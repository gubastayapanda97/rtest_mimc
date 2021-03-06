import React, { useState } from 'react';
import { withFormik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { IconButton, FormControlLabel, Checkbox } from '@material-ui/core';
import MaterialButton from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { login } from '../../redux/action';
import { auth, getUserInfo } from '../../utils/network';

import styles from './styles.module.scss'

const RememberCheckbox = withStyles({
	root: {
	  '&$checked': {
		color: '#b42dcb',
	  },
	},
	checked: {},
})((props) => <Checkbox color="default" {...props} />);

  
const ColorButton = withStyles(() => ({
	root: {
		color: '#fff',
		backgroundColor: '#b42dcb',
		'&:hover': {
			backgroundColor: '#621e73',
		},
	},
}))(MaterialButton);

const AuthSchema = Yup.object().shape({
	login: Yup.string().required('Не заполнено обязательное поле'),
	password: Yup.string().required('Не заполнено обязательное поле')
});

const AuthForm = ({ setErrorMsg, setAlertVisible, values, errors, children, setFieldValue, isSubmitting }) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Form className={styles.form}>
			<div className={styles.fieldLabel}>Логин</div>
			<Field
				placeholder="Логин"
				name="login"
				component={TextField}
				type="text"
				variant="outlined"
			/>
			<div className={styles.fieldLabel}>Пароль</div>
			<Field
				placeholder="Пароль"
				name="password"
				variant="outlined"
				type={showPassword ? 'text' : 'password'}
				component={TextField}
				InputProps={{
					endAdornment: (
						<IconButton
							onClick={() => {
								setShowPassword(!showPassword);
							}}
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					)
				}}
			/>
			<FormControlLabel
				control={
					<RememberCheckbox
						checked={values.remember}
						onChange={(e, value) => {
							setFieldValue('remember', value);
						}}
					/>
				}
				label="Запомнить пароль"
			/>
			<div className={styles.errorText}>{errors.submit}</div>
			<ColorButton disabled={isSubmitting} variant="contained" type="submit">
				Войти
			</ColorButton>
			<div className={styles.forgotPassword} onClick={() => alert('В настоящее время восстановление пароля недоступно')}>Забыли пароль?</div>
		</Form>
	);
};

export default connect(null, { loginAction: login })(withFormik({
	mapPropsToValues: props => ({
		login: props.login || '',
		password: props.password || '',
		remember: props.remember || false,
		loginAction: props.loginAction
	}),
	handleSubmit: async (values, { props, errors, setErrors, setFieldError, setSubmitting, resetForm }) => {
		const { login, password, remember, loginAction } = values;
		setSubmitting(true);
		const authRes = JSON.parse(await auth(login, password));
		if (authRes.accessToken) {
			const userInfo = JSON.parse(await getUserInfo(login))[0];
			setSubmitting(false);
			loginAction({id: userInfo.id, login, token: authRes.accessToken, firstname: userInfo.firstname, lastname: userInfo.lastname })
		} else {
			setFieldError('submit', 'Неверные логин или пароль');
			setSubmitting(false);
		}
	},
	validationSchema: AuthSchema
})(AuthForm));

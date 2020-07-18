import React, { useState } from 'react';
import { withFormik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { IconButton, FormControlLabel, Checkbox } from '@material-ui/core';
import MaterialButton from '@material-ui/core/Button';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const RememberCheckbox = withStyles({
	root: {
	  '&$checked': {
		color: '#b42dcb',
	  },
	},
	checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const AuthSchema = Yup.object().shape({
	login: Yup.string().required('Не заполнено обязательное поле'),
	password: Yup.string().required('Не заполнено обязательное поле')
});

const AuthForm = ({ setErrorMsg, setAlertVisible, values, children, setFieldValue, isSubmitting }) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Form>
			<div>Логин</div>
			<Field
				placeholder="Логин"
				name="login"
				component={TextField}
				type="text"
				variant="outlined"
			/>
			<div>Пароль</div>
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
			<MaterialButton variant="contained" type="submit">
				Войти
			</MaterialButton>
			<div onClick={() => console.log('forgotPassword')}>Забыли пароль?</div>
		</Form>
	);
};

export default withFormik({
	mapPropsToValues: props => ({
		login: props.login || '',
		password: props.password || '',
		remember: props.remember || false
	}),
	handleSubmit: async (values, { props, setErrors, setSubmitting, resetForm }) => {
		// const { login, password, remember } = values;
		// const { history, setErrorMsg, setAlertVisible } = props;
		// setSubmitting(true);
		// var formData = new FormData();
		// formData.append('UserName', login);
		// formData.append('Password', password);
		// try {
		// 	const responce = await sendFormData('auth', formData);
		// 	authenticate({
		// 		username: login,
		// 		token: responce.token,
		// 		userId: responce.user.userId,
		// 		persist: remember
		// 	});
		// 	Promise.all([props.dispatch.user.checkAuthorized(), props.dispatch.app.init()]).then(() => {
		// 		history.push('/');
		// 	});
		// } catch (error) {
		// 	setErrorMsg(error.msg || "Не авторизован");
		// 	setAlertVisible(true);
		// }
		// setSubmitting(false);
	},
	validationSchema: AuthSchema
})(AuthForm);

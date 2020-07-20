import React from 'react';
import { withFormik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import MaterialButton from '@material-ui/core/Button';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/core/styles';
import { addProject } from '../../utils/network';

import styles from './styles.module.scss'

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
	title: Yup.string().required('Не заполнено обязательное поле'),
	leader: Yup.string().required('Не заполнено обязательное поле'),
	admin: Yup.string().required('Не заполнено обязательное поле'),
	date_start: Yup.date().required("Не заполнено обязательное поле").nullable(),
	date_finish: Yup.date().required("Не заполнено обязательное поле").nullable()
});

const ProjectModalForm = ({ setErrorMsg, setAlertVisible, values, errors, children, setFieldValue, isSubmitting }) => {

	return (
		<Form className={styles.form}>
			<div className={styles.fieldContainer}>
				<div className={styles.fieldLabel}>Название проекта</div>
				<Field
					placeholder="Название проекта"
					name="title"
					component={TextField}
					type="text"
					variant="outlined"
				/>
			</div>
			<div className={styles.fieldContainer}>
				<div className={styles.fieldLabel}>Дата старта</div>
				<Field
					placeholder="Дата старта"
					name="date_start"
					component={TextField}
					type="date"
					variant="outlined"
				/>
			</div>
			<div className={styles.fieldContainer}>
				<div className={styles.fieldLabel}>Дата окончания</div>
				<Field
					placeholder="Дата окончания"
					name="date_finish"
					component={TextField}
					type="date"
					variant="outlined"
				/>
			</div>
			<div className={styles.fieldContainer}>
				<div className={styles.fieldLabel}>Руководитель проекта</div>
				<Field
					placeholder="Руководитель проекта"
					name="leader"
					component={TextField}
					type="text"
					variant="outlined"
				/>
			</div>
			<div className={styles.fieldContainer}>
				<div className={styles.fieldLabel}>Администратор проекта</div>
				<Field
					placeholder="Администратор проекта"
					name="admin"
					component={TextField}
					type="text"
					variant="outlined"
				/>
			</div>
			<div className={styles.errorText}>{errors.submit}</div>
			<ColorButton className={styles.addProjectBtn} disabled={isSubmitting} variant="contained" type="submit">
				Добавить
			</ColorButton>
		</Form>
	);
};

export default withFormik({
	mapPropsToValues: () => ({
		title: '',
		date_start: '',
		date_finish: '',
		leader: '',
		admin: ''
	}),
	handleSubmit: async (values, { props, errors, setErrors, setFieldError, setSubmitting, resetForm }) => {
		const { title, date_start, date_finish, leader, admin } = values;
		const { onClose } = props;
		setSubmitting(true);
		await addProject({ title, date_start, date_finish, leader, admin });
		setSubmitting(true);
		onClose({ title, date_start, date_finish, leader, admin });
	},
	validationSchema: AuthSchema
})(ProjectModalForm);

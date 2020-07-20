import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import MaterialButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { ProjectCard, ProjectModal } from '../../../components';
import { getProjects } from '../../../utils/network';

import styles from './ProjectList.module.scss';

const ColorButton = withStyles(() => ({
	root: {
		color: '#fff',
		backgroundColor: '#b42dcc',
		margin: '0 10px 0 0',
		'&:hover': {
			backgroundColor: '#9174c3',
		},
	},
}))(MaterialButton);

const ProjectList = () => {
	const [openModal, setOpenModal] = useState(false);
	const [projects, setProject] = useState([]);

	const closeModal = ( project={} ) => {
		if (project.title) {
			const _projects = projects;
			_projects.push(project);
			setProject(_projects);
		}
		setOpenModal(false)
	};

	useEffect(() => {
		getProjects().then(res => setProject(JSON.parse(res)));
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>{"Список проектов".toUpperCase()}</div>
				<ColorButton onClick={() => setOpenModal(true)}>
					Добавить проект
				</ColorButton>
			</div>
			<div className={styles.projectListContainer}>
				{projects.map((project, index) => <ProjectCard key={index} project={project} />)}
			</div>
			<Modal open={openModal} onClose={closeModal}>
				<ProjectModal onClose={closeModal}/>
			</Modal>
		</div>
	);
};

export default ProjectList;
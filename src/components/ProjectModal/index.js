import React from 'react';
import ProjectModalForm from './ProjectModalForm';

import styles from './styles.module.scss';

const ProjectModal = ({ onClose }) => {
	return (
		<div className={styles.container}>
			<ProjectModalForm onClose={onClose}/>
		</div>
	);
};

export default ProjectModal;
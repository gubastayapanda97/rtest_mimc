import React from 'react';
import moment from 'moment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ProjectImage from '../../assets/images/projectImage.png';
import Rouble from '../../assets/images/rouble.png';

import styles from './styles.module.scss';

const ProjectCard = ({ project }) => {
	return (
		<div className={styles.container}>
			<img className={styles.projectImg} src={ProjectImage} alt={project.title}/>
			<div className={styles.projectInfoContainer}>
				<div className={styles.projectTitle}>
					{project.title.toUpperCase()}
				</div>
				<div className={styles.infoItem}>
					<CalendarTodayIcon style={{ width: '20px', height: '20px', margin: '0 8px 0 0' }}/>
					{moment(project.date_start, 'YYYY-MM-DD').format('DD.MM.YYYY')} - {moment(project.date_finish, 'YYYY-MM-DD').format('DD.MM.YYYY')} гг.
				</div>
				<div className={styles.infoItem}>
					<PermIdentityIcon style={{ width: '20px', height: '20px', margin: '0 8px 0 0' }}/>
					{project.leader}
				</div>
				<div className={styles.infoItem}>
					<img src={Rouble} alt={project.admin} className={styles.infoImg}/>
					{project.admin}
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
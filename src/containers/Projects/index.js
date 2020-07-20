import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabComponents from './Tabs';
import { Layout } from '../../components';

import styles from './styles.module.scss';

const CustomTabs = withStyles({
	root: {
		borderBottom: '1px solid #e8e8e8',
	},
	indicator: {
		backgroundColor: '#9277c3',
	},
})(Tabs);

const CustomTab = withStyles(() => ({
	root: {
		'&:hover': {
			color: '#27292d'
		},
		'&$selected': {
			color: '#27292d',
			fontWeight: 'bold'
		},
		'&:focus': {
			color: '#27292d'
		},
	},
	selected: {}
}))((props) => <Tab disableRipple {...props} />);

const Projects = () => {
	const [tabValue, setTabValue] = useState(0);
	
	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	return (
		<Layout>
			<div className={styles.container}>
				<h1 className={styles.pageTitle}>Проекты</h1>
			
				<CustomTabs value={tabValue} onChange={handleTabChange} aria-label="ant example">
					<CustomTab label="Список проектов" />
					<CustomTab label="Дорожные карты" />
				</CustomTabs>
				
				{TabComponents[tabValue] 
					? TabComponents[tabValue].component
					: null 
				}
			</div>
		</Layout>
	);
};

export default Projects;

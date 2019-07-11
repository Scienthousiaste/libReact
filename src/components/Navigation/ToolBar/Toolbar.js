import React from 'react';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import classes from './Toolbar.css';


const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<DrawerToggle clicked={props.drawerToggleClicked} />
	</header>
);

export default toolbar;

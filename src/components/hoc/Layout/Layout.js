import React, {useState} from 'react';

import classes from './Layout.css';

import Aux from '../Aux/Aux';
import Toolbar from '../../Navigation/ToolBar/Toolbar';
import SideDrawer from '../../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {

	const [layoutState, setLayoutState] = useState({
		showSideDrawer: false,
	});

	const sideDrawerClosedHandler = () => {
		setLayoutState({
			...layoutState,
			showSideDrawer: false,
		});
	};

	const sideDrawerToggleHandler = () => {
		setLayoutState({
			...layoutState,
			showSideDrawer: !layoutState.showSideDrawer,
		});
	};

	return (
		<Aux>
			<Toolbar drawerToggleClicked={sideDrawerToggleHandler}/>
			<SideDrawer
				show={layoutState.showSideDrawer}
				closed={sideDrawerClosedHandler}/>
			<main className={classes.Layout}>
				{props.children}
			</main>
		</Aux>
	);
};

export default Layout;
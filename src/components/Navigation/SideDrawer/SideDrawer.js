import React from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../hoc/Aux/Aux';
import Media from 'react-media';

import classes from './SideDrawer.less';


const sideDrawer = (props) => {

	let attachedClasses = [classes.SideDrawer];

	attachedClasses.push(props.show ? classes.Open : classes.Close);

	return (
		<Aux>
			<Backdrop show={props.show} clicked={props.closed}/>
			<div className={attachedClasses.join(' ')}>

			</div>
		</Aux>
	);
};

export default sideDrawer;

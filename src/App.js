import React from 'react';

import classes from './style/App.less';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Layout from './components/hoc/Layout/Layout';

import Npuzzle from './components/Npuzzle/Npuzzle';

const App = () => {

	return (
		<BrowserRouter>
			<Layout>
				<div className={classes.App}>
					<Switch>
					<Route path={'/'} component={Npuzzle} />
					</Switch>
				</div>
			</Layout>
		</BrowserRouter>
	);
};

export default App;

import React from 'react';

import classes from './style/App.less';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Layout from './components/hoc/Layout/Layout';

import NPuzzle from './components/NPuzzle/NPuzzle';

const App = () => {

	return (
		<BrowserRouter>
			<Layout>
				<div className={classes.App}>
					<Switch>
					<Route path={'/'} component={NPuzzle} />
					</Switch>
				</div>
			</Layout>
		</BrowserRouter>
	);
};

export default App;

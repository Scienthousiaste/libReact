import React, {Component} from 'react';

import classes from './style/App.less';

import NPuzzleApp from './components/NPuzzleApp/NPuzzleApp';

const App = () => {

        return (
            <div className={classes.App}>
				<NPuzzleApp />
            </div>
        );
};

export default App;

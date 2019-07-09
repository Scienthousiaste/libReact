import React from 'react';

import classes from './style/App.less';

import NPuzzle from './components/NPuzzle/NPuzzle';

const App = () => {

        return (
            <div className={classes.App}>
				<NPuzzle />
            </div>
        );
};

export default App;

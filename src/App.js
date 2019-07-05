import React, {Component} from 'react';
import './style/App.css';
import Npuzzle from './components/Npuzzle';

class App extends Component {
    render()
    {
        return (
            <div className="App">
                <Npuzzle size={2}/>
                <Npuzzle size={3}/>
                <Npuzzle size={4}/>
                <Npuzzle size={5}/>
            </div>
        );
    }
}

export default App;

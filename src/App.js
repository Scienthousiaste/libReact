import React, {Component} from 'react';
import './style/App.css';
import Npuzzle from './components/Npuzzle';
import PuzzleInput from './components/PuzzleInput';

class App extends Component {
	parseNpuzzle = (input) => {
		alert(input);
		console.log(input);
	}

    render()
    {
        return (
            <div className="App">
				<PuzzleInput parseNpuzzle={this.parseNpuzzle}/> 
                <Npuzzle size={2}/>
                <Npuzzle size={4}/>
            </div>
        );
    }
}

export default App;

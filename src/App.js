import React, {Component} from 'react';
import './style/App.css';
import Npuzzle from './components/Npuzzle';
import PuzzleInput from './components/PuzzleInput';

class App extends Component {
	state = {
		puzzles : []
	}
	
	createNewPuzzle = (puzzleParams) => {
		let newPuzzles = [...this.state.puzzles];
		newPuzzles.push(puzzleParams);
		this.setState({puzzles: newPuzzles});
	}

    render()
    {
		const npuzzles = this.state.puzzles.map((p, index) => {
			return (<Npuzzle
				key={index}
				size={p.size}
				arrayNumbers={p.arrayNumbers}
			/>)
		})
        return (
            <div className="App">
				<PuzzleInput createNewPuzzle={this.createNewPuzzle}/> 
				{npuzzles}
            </div>
        );
    }
}

export default App;

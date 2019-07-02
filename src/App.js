import React, {Component} from 'react';
import './App.css';
import Npuzzle from './components/Npuzzle';

const App = (props) => {
     return (
         <div className="App">
             <Npuzzle size="3"/>
         </div>
     );
};

export default App;

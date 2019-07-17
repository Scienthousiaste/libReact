import React, {useState, useEffect} from 'react';

import classes from './TileSetLoading.less';
import TileSet from '../TileSet/TileSet';
import {generateRandomArray} from '../../../helpers/Npuzzle/functions';

const TileSetLoading = (props) => {

	useEffect(() => {

	}, []);

	const [array, setArray] = useState(null);


	useEffect(() => {
		setTimeout(() => {
			setArray(generateRandomArray(props.size));
		}, 400)
	}, [array]);

	const tileSet = array ? <TileSet arrayNumbers={array} size={props.size} tileClass={'Loading'}/> :
		<TileSet arrayNumbers={generateRandomArray(props.size)} size={props.size} tileClass={'Loading'}/>;

	return (
		<div>
			{tileSet}
		</div>
	);
};

export default TileSetLoading;
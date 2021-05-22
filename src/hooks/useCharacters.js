import {useState, useEffect} from 'react';
import getCharacters from '../services/getCharacters';

const useCharacters = () => {
	const [character, setCharacter] = useState();

	useEffect(() => {
		getCharacters().then(res => {
			setCharacter(res);
		});
	}, []);
	return character;
};

export default useCharacters;

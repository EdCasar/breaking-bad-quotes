import {useState, useEffect} from 'react';
import getQuotes from '../services/getQuotes';

const useQuotes = () => {
	const [quote, setQuote] = useState();

	useEffect(() => {
		getQuotes().then(res => {
			setQuote(res);
		});
	}, []);
	return quote;
};

export default useQuotes

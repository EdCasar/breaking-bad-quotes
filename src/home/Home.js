import {useState, useEffect} from 'react';

import useQuotes from '../hooks/useQuotes';
import useCharacters from '../hooks/useCharacters';

const Home = () => {
	const quote = useQuotes();
	const character = useCharacters();
	const [charAndQuote, setCharAndQuote] = useState([]);

	useEffect(() => {
		if (character) {
			character.map(each => {
				if (quote) {
					const nameAll = quote.filter(fil => fil.author === each.name);
					if (nameAll.length > 0) {
						each.quotes = nameAll;
						setCharAndQuote(state => [...state, each]);
					}
				}
			});
		}
	}, [character, quote]);
	return (
		<div>
		<h1>Home</h1>
		{charAndQuote ? (
			charAndQuote.map(({char_id, name, img, quote, quote_id, quotes}) => (
				<div key={Math.random()}>
				<img src={img} width="200" alt="" />
				<p>{name}</p>

				{quotes
					? quotes.map(ea => <li key={ea.quote_id}>{ea.quote}</li>)
					: null}
				</div>
			))
		) : (
			<p>Loading...</p>
		)}
		</div>
	);
};

export default Home;

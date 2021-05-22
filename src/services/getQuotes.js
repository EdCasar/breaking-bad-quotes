const getQuotes = () => {
	return fetch('https://www.breakingbadapi.com/api/quotes')
		.then(res => res.json())
		.then(response => {
			const data = response;
			const quotes = data.map(each => {
				const {quote_id, quote, author, series} = each;
				return {quote_id, quote, author, series};
			});
			return quotes 
		});
};

export default getQuotes

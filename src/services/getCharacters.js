const getCharacters = () => {
	return fetch('https://www.breakingbadapi.com/api/characters')
		.then(res => res.json())
		.then(response => {
			const data = response;
			const character = data.map(each => {
				const {char_id, name, img} = each;
				return {char_id, name, img};
			});
			return character 
		});
};

export default getCharacters


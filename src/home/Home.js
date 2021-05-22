import useQuotes from '../hooks/useQuotes';
import useCharacters from '../hooks/useCharacters';

const Home = () => {
  const quote = useQuotes();
  const character = useCharacters();

  return (
    <div>
      <h1>Home</h1>
      {character ? (
        character.map(({char_id, name, img}) => (
          <div key={char_id}>
            <img src={img} alt="" width="200" />
            <p>{name}</p>
          </div>
        ))
      ) : (
        <p>No found </p>
      )}
    </div>
  );
};

export default Home;

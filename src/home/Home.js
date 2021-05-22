import useCharAndQuote from '../hooks/useCharAndQuote';
import CardQuote from '../components/cardQuote/CardQuote';

const Home = () => {
  const charAndQuote = useCharAndQuote();
  return (
    <div>
      <h1>Home</h1>
      {charAndQuote ? (
        charAndQuote.map(({char_id, name, img, quote, quote_id, quotes}) => (
          <div key={Math.random()}>
            <img src={img} width="200" alt="" />
            <p>{name}</p>

            {quotes
              ? quotes.map(each => (
                  <CardQuote
                    key={each.quote_id}
                    {...each}
                    add={true}
                    remove={false}
                  />
                ))
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

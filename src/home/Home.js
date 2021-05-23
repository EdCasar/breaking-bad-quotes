import {useState, useEffect} from 'react';
import {SkipPrevious, SkipNext} from '@material-ui/icons';
import useCharAndQuote from '../hooks/useCharAndQuote';
import CardQuote from '../components/cardQuote/CardQuote';

const Home = () => {
  const charAndQuote = useCharAndQuote();
  //paginación
  const [page, setPage] = useState(0);
  const [showForPage, setShowForPage] = useState(1);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setPage(0);
  }, [charAndQuote]);

  const totalPages =
    charAndQuote && Math.ceil(charAndQuote.length / showForPage);

  const pageData = () => {
    if (charAndQuote) return charAndQuote.slice(page, page + showForPage);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - showForPage);
    if (count > 1 && count <= totalPages) setCount(count - 1);
  };
  const nextPage = () => {
    if (page < charAndQuote.length - showForPage) setPage(page + showForPage);
    if (count < totalPages) setCount(count + 1);
  };
  return (
    <div className="home">
      <div className="pagination">
        <button className="prev" onClick={prevPage}>
          <SkipPrevious />
          Prev
        </button>
        <p>
          Página {count} de {totalPages}
        </p>
        <p>Total: {charAndQuote && charAndQuote.length}</p>
        <button className="next" onClick={nextPage}>
          Next
          <SkipNext />
        </button>
      </div>
      {charAndQuote ? (
        pageData().map(({char_id, name, img, quote, quote_id, quotes}) => (
          <div className="eachChar" key={Math.random()}>
            <div className="eachHead">
              <div className="eachImg">
                <img src={img} alt="" />
                <h3>{name}</h3>
              </div>
            </div>

            {quotes
              ? quotes.map(each => (
                  <CardQuote
                    key={each.quote_id}
                    {...each}
                    add={true}
                    img={img}
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

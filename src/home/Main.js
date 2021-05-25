import {useState, useEffect} from 'react';
import CardQuote from '../components/cardQuote/CardQuote';
import Pagination from '../components/pagination/Pagination';

const Main = ({data, change}) => {
  //paginación
  const [page, setPage] = useState(0);
  const [showForPage, setShowForPage] = useState(1);
  const [count, setCount] = useState(1);

  useEffect(() => {
    //si se realiza alguna busqueda iremos a la primera página
    if (change) {
      setPage(0);
      setCount(1);
    }
  }, [change]);

  const totalPages = data && Math.ceil(data.length / showForPage);

  const pageData = () => {
    if (data) return data.slice(page, page + showForPage);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - showForPage);
    if (count > 1 && count <= totalPages) setCount(count - 1);
  };
  const nextPage = () => {
    if (page < data.length - showForPage) setPage(page + showForPage);
    if (count < totalPages) setCount(count + 1);
  };
  return (
    <>
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        count={count}
        totalPages={totalPages}
        data={data}
      />
      {data ? (
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
        <p style={{ color: '#fff'}}>No found</p>
      )}
    </>
  );
};

export default Main;

import {SkipPrevious, SkipNext} from '@material-ui/icons';

const Pagination = ({ prevPage, nextPage, count, totalPages, data}) => {
  return (
    <div className="pagination">
      <button className="prev" onClick={prevPage}>
        <SkipPrevious />
        Prev
      </button>
      <p>
        Página {count} de {totalPages}
      </p>
      <p>Total: {data && data.length}</p>
      <button className="next" onClick={nextPage}>
        Next
        <SkipNext />
      </button>
    </div>
  );
};
export default Pagination

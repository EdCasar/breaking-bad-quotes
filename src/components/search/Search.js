const Search = ({searchInFields, searchFor, name, inputType}) => {
  const getSearch = e => {
    searchInFields(e.target.value, e.target.name);
  };
  return (
    <div className="inputFields">
      <input
        type={inputType ? inputType : 'text'}
        name={searchFor}
        onChange={getSearch}
        placeholder={`Search for ${name}`}
      />
    </div>
  );
};
export default Search;

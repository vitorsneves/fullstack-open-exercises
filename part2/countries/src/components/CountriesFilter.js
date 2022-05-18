const CountriesFilter = ({ filter, handleFilterChange }) => (
  <div>
    <label htmlFor="countriesFilter">find countries </label>
    <input
      type="text"
      id="countriesFilter"
      value={filter}
      onChange={handleFilterChange}
    />
  </div>
);

export default CountriesFilter;

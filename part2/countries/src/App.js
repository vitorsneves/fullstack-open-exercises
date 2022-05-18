import { useState, useEffect } from "react";

import countriesService from "./services/countriesService";
import CountryFilters from "./components/CountriesFilter";
import CountriesDisplay from "./components/CountriesDisplay";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    const getAllCountries = async () => {
      const response = await countriesService.getAll();
      setCountries(response);
    };

    getAllCountries();
  }, []);

  const getFilteredCountries = () =>
    countries.filter((country) =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    );

  const filteredCountries = getFilteredCountries();

  return (
    <>
      <CountryFilters value={filter} handleFilterChange={handleFilterChange} />
      <CountriesDisplay countries={filteredCountries} />
    </>
  );
}

export default App;

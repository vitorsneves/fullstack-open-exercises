import CountryDetails from "./CountryDetails";

const CountriesDisplay = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many maches, specify another filter</p>;
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.id}>{country.name}</li>
        ))}
      </ul>
    );
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }
};

export default CountriesDisplay;

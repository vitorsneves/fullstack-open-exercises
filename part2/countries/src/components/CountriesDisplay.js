import CountryDetails from "./CountryDetails";
import CountryItem from "./CountryItem";

const CountriesDisplay = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many maches, specify another filter</p>;
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <CountryItem country={country} key={country.id} />
        ))}
      </ul>
    );
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }
};

export default CountriesDisplay;

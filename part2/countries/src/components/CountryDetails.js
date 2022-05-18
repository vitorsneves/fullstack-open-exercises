const CountryDetails = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital.join(" ")}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flag} style={{ height: 100 }} />
    </>
  );
};

export default CountryDetails;

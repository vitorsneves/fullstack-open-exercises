import axios from "axios";

const url = "https://restcountries.com/v3.1";

const getAll = async () => {
  const response = await axios.get(`${url}/all`);

  const countries = response.data.map((country) => ({
    name: country.name.common,
    languages: Object.values(country.languages ?? []),
    capital: country.capital,
    area: country.area,
    flag: country.flags.svg,
    id: country.name.official,
  }));

  return countries;
};

export default { getAll };

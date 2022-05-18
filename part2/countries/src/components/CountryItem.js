import { useState } from "react";

import CountryDetails from "./CountryDetails";

const CountryItem = ({ country }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  };

  if (isCollapsed) {
    return (
      <li>
        {country.name} <button onClick={toggleCollapsed}>show</button>
      </li>
    );
  }

  if (!isCollapsed) {
    return (
      <li>
        <button onClick={toggleCollapsed}>hide</button>
        <CountryDetails country={country} />
      </li>
    );
  }
};

export default CountryItem;

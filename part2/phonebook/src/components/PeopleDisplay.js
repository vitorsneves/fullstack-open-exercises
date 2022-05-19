import { useState } from "react";

import PersonDetails from "./PersonDetails";

const PeopleDisplay = ({ persons, removePerson }) => {
  const [filter, setFilter] = useState("");

  const filterPhoneList = () => {
    const lowerCaseFilter = filter.toLowerCase();

    return persons.filter((person) =>
      person.name.toLowerCase().includes(lowerCaseFilter)
    );
  };

  const visiblePersons = filterPhoneList();
  return (
    <>
      <div>
        filter show with{" "}
        <input
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        />
      </div>
      <h2>Numbers</h2>
      <ul>
        {visiblePersons.map((person) => (
          <PersonDetails
            person={person}
            removePerson={removePerson}
            key={person.id}
          />
        ))}
      </ul>
    </>
  );
};

export default PeopleDisplay;

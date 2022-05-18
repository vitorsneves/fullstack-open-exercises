import { useState } from "react";

import AddPeopleForm from "./components/AddPeopleForm";
import PeopleDisplay from "./components/PeopleDisplay";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456" },
    { name: "Ada Lovelace", phone: "39-44-5323523" },
    { name: "Dan Abramov", phone: "12-43-234345" },
    { name: "Mary Poppendieck", phone: "39-23-6423122" },
  ]);

  const addNewPerson = (newPerson) => {
    if (isPersonAlreadyAdded(newPerson)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    setPersons((persons) => persons.concat(newPerson));
  };

  const isPersonAlreadyAdded = (person) =>
    persons.some((o) => o.name === person.name);

  return (
    <div>
      <h2>Phonebook</h2>
      <AddPeopleForm addNewPerson={addNewPerson} />
      <PeopleDisplay persons={persons} />
    </div>
  );
};

export default App;

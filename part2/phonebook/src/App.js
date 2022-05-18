import { useState, useEffect } from "react";
import axios from "axios";

import AddPeopleForm from "./components/AddPeopleForm";
import PeopleDisplay from "./components/PeopleDisplay";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const getPersons = async () => {
      const response = await axios.get("http://localhost:3001/persons");
      setPersons(response.data);
    };

    getPersons();
  }, []);

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

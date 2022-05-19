import { useState, useEffect } from "react";

import phoneService from "./service/phoneService";

import AddPeopleForm from "./components/AddPeopleForm";
import PeopleDisplay from "./components/PeopleDisplay";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    phoneService.getAllPhones().then((phones) => setPersons(phones));
  }, []);

  const addNewPerson = async (newPerson) => {
    if (isPersonAlreadyAdded(newPerson)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    try {
      const newPerson = await phoneService.postPerson(newPerson);

      setPersons((persons) => persons.concat(newPerson));
    } catch {
      alert(
        "It was not possible to connect with the server. Check your connection"
      );
    }
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

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
      const addedPerson = await phoneService.postPerson(newPerson);

      setPersons((persons) => persons.concat(addedPerson));
    } catch (e) {
      console.log(e);

      alert(
        "It was not possible to connect with the server. Check your connection"
      );
    }
  };

  const removePerson = async (id) => {
    if (
      !window.confirm(`Do you really want to delete ${getPersonById(id).name}`)
    ) {
      return;
    }

    const wasRevomeSuccessful = await phoneService.deletePhone(id);

    if (wasRevomeSuccessful) {
      setPersons((persons) => persons.filter((person) => person.id !== id));
    }
  };

  const getPersonById = (id) => persons.filter((person) => person.id === id)[0];

  const isPersonAlreadyAdded = (person) =>
    persons.some((o) => o.name === person.name);

  return (
    <div>
      <h2>Phonebook</h2>
      <AddPeopleForm addNewPerson={addNewPerson} />
      <PeopleDisplay persons={persons} removePerson={removePerson} />
    </div>
  );
};

export default App;

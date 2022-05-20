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
      updatePerson({ ...newPerson, id: getPersonId(newPerson.name) });
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

  const updatePerson = async (newPerson) => {
    if (
      !window.confirm(
        `${newPerson.name} is already added to the phone list. Replace the old number with a new one?`
      )
    ) {
      return;
    }

    phoneService.updateNumber(newPerson);

    setPersons((persons) => {
      const personsClone = structuredClone(persons);
      const personsWithoutNewPerson = personsClone.filter(
        (person) => person.id !== newPerson.id
      );
      return personsWithoutNewPerson.concat(newPerson);
    });
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

  const getPersonId = (name) =>
    persons.find((person) => person.name === name).id;

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

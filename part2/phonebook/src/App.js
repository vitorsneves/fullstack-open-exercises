import { useState, useEffect } from "react";
import axios from "axios";

import phoneService from "./service/phoneService";

import AddPeopleForm from "./components/AddPeopleForm";
import PeopleDisplay from "./components/PeopleDisplay";
import MessageBox from "./components/MessageBox";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState({ content: "", wasSuccessful: true });

  useEffect(() => {
    phoneService.getAllPhones().then(
      (phones) => setPersons(phones),
      () => {
        showNotConnectedError();
      }
    );
  }, []);

  const addNewPerson = async (newPerson) => {
    if (isPersonAlreadyAdded(newPerson)) {
      updatePerson({ ...newPerson, id: getPersonId(newPerson.name) });
      return;
    }

    try {
      const addedPerson = await phoneService.postPerson(newPerson);

      setPersons((persons) => persons.concat(addedPerson));
      updateMessage({
        content: `added ${addedPerson.name}`,
        wasSuccessful: true,
      });
    } catch (e) {
      console.log(e);

      showNotConnectedError();
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

    try {
      await phoneService.updateNumber(newPerson);

      setPersons((persons) => {
        const personsClone = structuredClone(persons);
        const personsWithoutNewPerson = personsClone.filter(
          (person) => person.id !== newPerson.id
        );
        return personsWithoutNewPerson.concat(newPerson);
      });

      updateMessage({
        content: `${newPerson.name} was updated`,
        wasSuccessful: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response.status;

        if (status === 404) {
          updateMessage({
            content: `information of ${newPerson.name} was already removed from server`,
          });
          return;
        }

        showNotConnectedError();
      }
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

  const showNotConnectedError = () => {
    updateMessage({
      content:
        "It was not possible to connect with the server. Check your connection",
      wasSuccessful: false,
    });
  };

  const updateMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage({ content: "", wasSuccessful: true });
    }, 5000);
  };

  const getPersonById = (id) => persons.filter((person) => person.id === id)[0];

  const getPersonId = (name) =>
    persons.find((person) => person.name === name).id;

  const isPersonAlreadyAdded = (person) =>
    persons.some((o) => o.name === person.name);

  return (
    <div>
      <MessageBox message={message} />
      <h2>Phonebook</h2>
      <AddPeopleForm addNewPerson={addNewPerson} />
      <PeopleDisplay persons={persons} removePerson={removePerson} />
    </div>
  );
};

export default App;

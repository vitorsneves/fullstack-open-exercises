import { useState } from "react";

const AddPeopleForm = ({ addNewPerson }) => {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const submitForm = (event) => {
    event.preventDefault();

    const newPerson = collectFormData();

    addNewPerson(newPerson);
  };

  const collectFormData = () => {
    const newPerson = {
      name: newName,
      phone: newPhone,
    };

    setNewName("");
    setNewPhone("");

    return newPerson;
  };

  return (
    <form onSubmit={submitForm}>
      <header>
        <h2>add a new</h2>
      </header>

      <div>
        <label htmlFor="name">name</label>
        <input
          id="name"
          name="name"
          value={newName}
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
      </div>

      <div>
        <label htmlFor="phone">phone number</label>
        <input
          id="phone"
          name="phone"
          value={newPhone}
          onChange={(event) => {
            setNewPhone(event.target.value);
          }}
        />
      </div>

      <button type="submit">add</button>
    </form>
  );
};

export default AddPeopleForm;

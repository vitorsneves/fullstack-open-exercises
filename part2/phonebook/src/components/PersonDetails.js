import phoneService from "../service/phoneService";

const PersonDetails = ({ person, removePerson }) => {
  return (
    <li>
      {person.name} {person.phone}
      <button
        onClick={() => {
          removePerson(person.id);
        }}
      >
        delete
      </button>
    </li>
  );
};

export default PersonDetails;

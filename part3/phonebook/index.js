import express from 'express';
import morgan from 'morgan';

const PORT = 3001;
const baseRoute = '/api';

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

const app = express();

app.use(express.json());

morgan.token("response-object", (request, response) =>
  request.method == 'POST' && JSON.stringify(request.body)
);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :response-object'));



app.get(baseRoute + '/info', (request, response) => {
  const entries = persons.length;
  const entriesString = `<p>Phonebook has info for ${entries} people<p>`

  const date = new Date();
  const dateString = `<p>${date.toLocaleString()}<p>`;

  const entriesAndDate = entriesString.concat(dateString);

  response.end(entriesAndDate);
});

app.get(baseRoute + '/persons', (request, response) => {
  response.json(persons);
});

app.get(baseRoute + '/persons/:id', (request, response) => {
  const person = persons.find(person => person.id == request.params.id);

  if(person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete(baseRoute + '/persons/:id', (request, response) => {
  persons = persons.filter(persons => persons.id != request.params.id);

  response.status(204).end();
});

app.post(baseRoute + '/persons', (request, response) => {
  const newPerson = request.body;
  
  const emptyFieldHandler = (fieldName) => {
    response.status(400).json({error: `${fieldName} field cannot be empty.`});
  }

  if(!newPerson.name) {
    return emptyFieldHandler("Name");
  }

  if(!newPerson.phone) {
    return emptyFieldHandler("phone");
  }

  if(persons.find(person => person.name == newPerson.name)) {
    return response.status(400).json({error: `${newPerson.name} was already added to the phonebook`})
  } 

  persons.push({id: generateUniqueId(), ...newPerson});

  response.json(newPerson);
});

const generateUniqueId = () => {
  const maxID = persons.length > 0
   ? Math.max(...persons.map(person => person.id))
   : 0;

  return maxID + 1;
};

app.listen(PORT, () => {console.log('server running on port', PORT)});
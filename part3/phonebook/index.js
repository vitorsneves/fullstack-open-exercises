import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Person from './model/Person.js'

const baseRoute = '/api';

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "phone": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "phone": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "phone": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "phone": "39-23-6423122"
  }
];

const app = express();

app.use(cors());

app.use(express.static('build'));

app.use(express.json());

morgan.token("response-object", (request, response) =>
  request.method == 'POST' && JSON.stringify(request.body)
);

app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :response-object'
));



app.get(baseRoute + '/info', (request, response) => {
  const entries = persons.length;
  const entriesString = `<p>Phonebook has info for ${entries} people<p>`

  const date = new Date();
  const dateString = `<p>${date.toLocaleString()}<p>`;

  const entriesAndDate = entriesString.concat(dateString);

  response.end(entriesAndDate);
});

app.get(baseRoute + '/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result);
  });
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

  if(!newPerson.name) {
    return emptyFieldHandler("Name");
  }

  if(!newPerson.phone) {
    return emptyFieldHandler("phone");
  }

  const person = new Person({
    name: newPerson.name,
    phone: newPerson.phone
  });

  person.save().then(result => {response.json(result)});
});

const emptyFieldHandler = (fieldName) => {
  response.status(400).json({error: `${fieldName} field cannot be empty.`});
}

const generateUniqueId = () => {
  const maxID = persons.length > 0
   ? Math.max(...persons.map(person => person.id))
   : 0;

  return maxID + 1;
};

app.listen(process.env.PORT, () => {
  console.log('server running on port', process.env.PORT)
});
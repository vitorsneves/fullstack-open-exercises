import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Person from './model/Person.js'

const baseRoute = '/api';

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

app.get(baseRoute + '/info', (request, response, next) => {
  
  Person.find({})
  .then(result => {
    const entriesString = `<p>Phonebook has info for ${result.length} people<p>`
  
    const date = new Date();
    const dateString = `<p>${date.toLocaleString()}<p>`;
  
    const entriesAndDate = entriesString.concat(dateString);
  
    response.end(entriesAndDate);
  })
  .catch(error => {next(error)});
  
});

app.get(baseRoute + '/persons', async (request, response, next) => {
  Person.find({})
    .then(result => { response.json(result) })
    .catch(error => {next(error)});
});

app.get(baseRoute + '/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(result => {
      if(result) {
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => {next(error)});
});

app.delete(baseRoute + '/persons/:id', (request, response, next) => {
  console.log(request.params.id)

  Person.findOneAndDelete({_id: request.params.id})
    .then(result => {console.log(result); response.status(204).end()})
    .catch(error => {next(error)})
});

app.post(baseRoute + '/persons', (request, response, next) => {
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

  person.save()
    .then(result => {response.json(result)})
    .catch(error => {next(error)})
});

app.put(baseRoute + '/persons/:id', (request, response, next) => {
  const id = request.params.id;

  const newPerson = {
    name: request.body.name,
    phone: request.body.phone
  };

  Person.findByIdAndUpdate(id, newPerson, {new: true})
    .then(result => {response.json(result)})
    .catch(error => {next(error)});
});

const emptyFieldHandler = (fieldName) => {
  response.status(400).json({error: `${fieldName} field cannot be empty.`});
}

const unknownEndpoint = (request, response) => {
  response.status(404).json({error: 'unkown endpoint'});
}

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  if(error.name === 'CastError') {
    return response.status(400).json({error: 'malformatted id'});
  }

  next(error);
};

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log('server running on port', process.env.PORT)
});
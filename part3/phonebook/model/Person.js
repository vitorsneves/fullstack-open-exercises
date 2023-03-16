import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

console.log('connecting to', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(result => {console.log('connection suceed')})
  .catch(error => {console.log('error connecting to MongoDB', error.message)});

const personSchema = new mongoose.Schema({
  name: String,
  phone: String
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject.__v;
    delete returnedObject._id;
  }
});

const Person = new mongoose.model('Person', personSchema);

export default Person;
import * as dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI);

const personSchema = new mongoose.Schema({
  name: String,
  phone: String
});

const Person = new mongoose.model('Person', personSchema);

if(process.argv[3]) {

  const name = process.argv[3];
  const phone = process.argv[4];

  const person = new Person({
    name: name,
    phone: phone
  })

  person.save().then(result => {
    console.log(`${person.name} was successfully added to the database!`);
    mongoose.connection.close();
  });

} else {

  Person.find({}).then(result => {
    if(result.length === 0) {
      console.log('There are no entries at persons colletion.');
    } else {
      result.forEach(person => console.log(person));
    }
  
    mongoose.connection.close();
  });
}

import mongoose from 'mongoose'

if(!process.argv[2]) {
  console.log('give the password as as the first argument');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://viniciosneves10:${password}@cluster0.nuvvc6b.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

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

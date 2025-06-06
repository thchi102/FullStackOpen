const mongoose = require('mongoose')

// assumes the password will be passed as a command line parameter
// node mongo.js <password>
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
else{
  const password = process.argv[2]
  const url = `mongodb+srv://thchi102:${password}@fso-practice.7wujfio.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=FSO-practice`
  mongoose.set('strictQuery',false)
  mongoose.connect(url)
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  const Person = mongoose.model('Person', personSchema)

  if(process.argv.length === 3){
    Person.find({}).then(result => {
      console.log('phonebook:')
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
  }
  else if(process.argv.length === 5){
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
      name: name,
      number: number,
    })
    person.save().then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
    })
  }
  else{
    console.log('Invalid number of arguments')
    process.exit(1)
  }
}


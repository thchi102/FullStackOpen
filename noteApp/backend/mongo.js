const mongoose = require('mongoose')

// assumes the password will be passed as a command line parameter
// node mongo.js <password>
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://thchi102:${password}@fso-practice.7wujfio.mongodb.net/noteApp?retryWrites=true&w=majority&appName=FSO-practice`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// create a new note with the Note model
// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// save the note to the database
// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

//find({}) fetches all notes from the database
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
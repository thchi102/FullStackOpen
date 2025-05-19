# Part 3 Note

### Some JavaScript note
`filter()` returns a array of objects that satisfied the condition
`find()` returns the object that satisfied the condition

## Node.js and Express
### Simple web server
* Node.js uses **common JS module**. Importing modules is done different to ES6
```javascript
// ES6
import http from 'http'
//commonJS
const http = request('http')
```
* `response.end()` expects a string or a buffer as the respond body. You can turn an array into JSON formatted string with `stringify()`
> **NOTE**: Using Node's built in http to create server is possible but not ideal. 

### Express
Express is a **library** to build backend servers
```javascript
// create express server
const express = require('express')
const app = express()

// create service
app.get('/', (req, res) => {
    // express will set the header for you
    res.send(...) //define the payload to response
})
```
* To make the server keep track of the changes we made, start the server with `node --watch index.js`

### REST
Representational State Transfer, an architechtural style meant for building scalable web application.
* A singular thing is called **resources** in RESTful thinking. And every resources has an uniquely associated URL.\
Take the notes as example, each note is a resourse, and we need an URL to access it.\
we can define **parameters for routes** in the Express using colons
```javascript
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id //how to access the parameter
  const note = notes.find(note => note.id === id)
  response.json(note)
})
```
* When the resource requested does not exist, we should handle the response accordingly.
```javascript
response.status(404).end()
// status() set the response status
// end() respond the request without any data
```

### Postman
To test our API, we can use `curl` in the CLI, or use tools like **Postman**

### Receiving Data
We need the help of the Express json-parser to access the data easily
```javascript
app.use(express.json())
// the body of the parsed data will be populated on the request object
```
* **One benefit REST Client has over Postman** is that the requests lives at the root of the project, and they can be distributed to everyone in the development team. You can also add multiple request in the same file using `###` seperator.

* When debugging, you can find out what headers have been sent set in the request by accessing `request.headers`

### HTTP requests
* The HTTP standard states that the request should be **safe and idempotency**\
  * GET request should always be **safe**
    Safe means the request doesn't cause any side affect to the server.
  * All HTTP requests except POST shoule be **idempotency.**
    Idempotency means an operation can be applied **multiple times** without side effects

### Middleware
Middlewares are functions that handle the request and repsonse object. Like the JSON parser we used.

## Deploying app to internet

### Same origin policy and CORS
protocol + host + port = origin
* **Same origin policy** happens on the Browser side. when a response is coming from a foreign origin. The browser will check the `Access-Control-Allow-origin` header to determine whether to refuse it. This is a security mechanism to prevent vulnerability like XSS
* **CORS**(Cross-Origin Resource Sharing) allows restricted resource to be requested from a foreign domain. CORS is a server-side mechanism to safely share resources with specific origins.
* we can allow CORS with Node's `cors` middleware

### Deploy to Vercel
https://vercel.com/guides/using-express-with-vercel
* add the `vercel.json` to the project root 
```json
{ "version": 2, "rewrites": [{ "source": "/(.*)", "destination": "/api" }] }
```
### Frontend Production build
* When the application is deployed, we must create a **production build**, this can be done with `npm run build`. This will create a `dist` directory, containing the html file and a minified version of our JavaScript code. 

### Serving static file from the backend
* One option for deployiing the frontend is to copy the production build. 
* To make express show the static content, we need a built-in middleware called `static`. Add the following line: 
``` javascript
app.use(express.static('dist'))
```

### Streamlining deploying of the frontend
To deploy new production build without extra manual work.
Put the Frontend and Backend file in seperate `frontend` and `backend` folder. And add the following scripts to `package.json`
```json
{
  "scripts": {
    //...
    "build:ui": "rm -rf dist && cd ../frontend && npm run build && cp -r dist ../backend",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push"
  }
}
```

### Proxy
Since we've changed the `baseURL` to relative, the local development mode won't work. This can be solved by modifying the `vite.config.js` file.
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
})
```
* Backend on port 3001
* Frontend on port 5173
This way the React develoment server will act as a proxy. Any request to `http://localhost:5173/api` will be forwarded to the server at `http://localhost:3001`. And from the frontend(5173) perspective, the request is made to the same source(5173/api). There is no longer needed for the CORS library.

## Saving data to MongoDB
### MongoDB
Steps to setup a MongoDB database:
1. Create a cluster on the MongoDB Atlas website
2. Create user
3. Define IP address access list
4. Connect to your database
> **Important**: We will not use the native MongoDB drive library, we will use Mongoose instead, for more straightforward operations.

* To set the name of a database:
  ```js
  const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=Cluster0`
  ```
  change the `<db_name>` to the name you wish to set.

### Schema
Document databases like Mongo are **schemaless**, meaning it can store documents with completely different fields. However, Mongoose uses schema to define the documents stored

```js
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
```
creates a model in mongoose, it is a constuctor function that allows modifying certain MongoDB collections.
> **Important**: The model name must be set with **singular, capitalized** form. Mongoose will pluralizes it, and associates it with a MongoDB collection in lowercase. eg. `Note -> notes`

* `Models` are constructor functions that create new JavaScript objects based on the provided parameters.

### Connecting the backend to database
* To format the objects returned by mongoose, we can modify the `toJSON` method in the schema, which is used on all instances produced with that schema.
```js
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
```

### Moving DB to its own module
The public interface of the module is defined by setting a value to the `module.exports` variable
```js
module.exports = mongoose.model('Note', noteSchema)
```
This way other things designed inside the module like variable `mongoose` and `url` will not be accessible to users of the module.

### Define environment variable with dotenv
`npm install dotenv`\
Then you can store your environment variable in the `.env` file.\
* Add `require('dotenv').config()`, then you can reference the env variables like usual
* When deploying the application, remember not to expose your .env online. 

### Moving error handling into middleware
Change the route handler to pass the error forward with `next` function, the `next` function is passed into the route handler as the third parameter. If the `next` function is called without an argument, then the execution will simply move on to the next route. But if it is called with an argument, the execution will continue to the **error handler middelware**.\

Express error handler:
```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  // In other error situation, the error will be passed to the default Express error handler
  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)
```

> **IMPORTANT**: this has to be the last loaded middleware, also all the routes should be registered before this!

### Order of middleware
It is important to be aware of the order when defining middleware. The correct order should be like:
```js
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.post('/api/notes', (request, response) => {
  const body = request.body
  // ...
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  // ...
}

// handler of requests with result to errors
app.use(errorHandler)
```

## Validation and ESLint
* we can validate a request body format using Mongoose. We can define validation rules in the schema:
```js
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})
```
There are built-in validator, we can also create custom validator. When validation fails, we get `ValidationError`

### Deploying the database to production
When deploying application, we can't use `.env`. We have to set the environment variable in the hosting service.

### Lint
* Lint is any tool that detects and flags error in programming languages
* We add ESLint to **Development dependencies**, these dependencies are not needed in production mode.\
  `npm install eslint @eslint/js --save-dev`\
  After installation, we can initialize ESLint by\
  `npx eslint --init`

### Formatting the configuration file
1. First we modify the default  config file to: 
```js
import globals from 'globals'
import js from '@eslint/js'

export default [
  js.configs.recommended, //Use ESLint's recommended settings
  {
    files: ['**/*.js'], //Files to check
    languageOptions: {
      sourceType: 'commonjs', //Language feature to expect
      globals: { ...globals.node }, //Include global variables defined in globals.node
      ecmaVersion: 'latest', //understand and lint the latest features
    },
  },
]

```
* `@eslint/js` provides recommended setting you can use in the config file.

2. Install plugins that defines code style related rules.\
`npm install --save-dev @stylistic/eslint-plugin-js`\
Import and enable these coding style rules.
```js
import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  {
    // ...
    plugins: { 
      '@stylistic/js': stylisticJs,
    },
    rules: { 
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
    }, 
  },
]
```

### Running the Linter
* Insepcting and validating a file can be done with: `npx eslint index.js`. But it is recommended to create a npm command for linting. 








  


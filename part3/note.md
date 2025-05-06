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

  


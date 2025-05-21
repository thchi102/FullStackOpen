# Part 4

## Structure of backend application, introduction to testing

### Project structure
* NodeJS's best practice for backend application structure:
```txt
├── controllers
│   └── notes.js
├── dist
│   └── ...
├── models
│   └── note.js
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js  
├── app.js
├── index.js
├── package-lock.json
├── package.json
```

* Instead of using `console.log`, we seperate them to its own module: `utils/logger.js`. 

* Extract environment variables into `utils/config.js`. Then we can access them by importing `config.js`

* Move **route handlers** into dedicated modules usually called `controllers`.
    1. Create a new router object: `const notesRouter = require('express').Router()`
    2. And exports the module: `module.exports = notesRouter`

    Router object is a middleware that only perform middleware and routing functions. The router is then used in `app.js`. Routers are **only** used when the request start with `/api/notes`, therefore the router objects must only define the **relative path** of the route.

* `app.js` defines the appication. It takes different middleware into use, including route handlers
* `index.js` only imports the actual appication from `app.js` and start the application

* Definition of custom middlewares are moved into `utils/middleware.js`

### Testing Node applications
* There are a lot of test libraries: Mocha, Jest, Vitest. Node also has built-in test laibrary: `node --test`
    1. Create a seperate directory for our tests, and create test files with `.test.js` as extension
    2. add this to create tests and check the results
       ```js
       const { test } = require('node:test')
       const assert = require('node:assert')
       ```
    3. Create a test like the following:
    ```js
    test('reverse of a', () => {
        const result = reverse('a')
        assert.strictEqual(result, 'a')
    })
    ```
* When comparing objects, `deepStrictEqual` is more suitable than `strictEqual`
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

## Testing the backend
### Test environment
* The convention in Node is to define the excution mode with the `NODE_ENV` environment variable. We can define the `NODE_ENV` in the npm run script. To ensure cross platform compatibility, we install the `cross-env` package.

* When running tests, it is better to use a database that is installed and running on the developer's local machine. This can be achieved by Mongo in-memory or docker.

### Supertest
* To test our API, we use the [Supertest](https://github.com/visionmedia/supertest) package

* We specified the port in index.js, but we didn't include it in the test. Supertest will handle the port problem so we don't have to worry about it.

* Supertest handles port assigning for us and provide functions like `expect()`, which makes testing easier when compared to axios.

### Initializing the database before test
* The library `node:test` offers functions for executing operations before or during the test
* We can use the `beforeEach` function to initialize the database before each test

### Running tests one by one
* use the `.only` method to define which test to execute. and run the test with `npm test -- --test-only`. Or we can also specify the file name or test names in the command line.

### async/await
* The syntax makes it possible to use *asynchronous functions* look synchronous
* If we want to make several asynchronous function calls with callback functions in one `.then` method, this will result in a callback hell. We can solve this by **chaining promises**. But we can write cleaner and more readable code with **async/await**

* To use `await` in asynchronous operation, they have to return a promise. and using `await` is only possible in an `async` function

### Error handling
* `try/catch` is recommended for handling exception when using async/await. 
* There is a way to eliminate the use of `try/catch`. We can use the `express-async-error` library, just import it in `app.js` and you're ready to go. The library will pass the error directly to the error-handling middleware.

### Nested async
* If an async function is defined inside another async function, they create a seperate asynchronous operation. There are several ways to resolve this issue.
    1. use the `Promise.all(<promiseArray>)` method. We store promises returned by each tasks in the array. The method will transform the promise array into a single promise that will be fulfilled **after all promises in the array is resolved**. We can also access each promise by assigning a variable to the returned value.
    However, this method processes promises **in parallel**. Promises can't be executed in order
    2. If we need the promises to be executed in order, we can use a `for...of` block to complete the inner process.
    3. Even simpler, if you are inserting instances into mongoDB, we can use the mongoose's built-in method `insertMany()`

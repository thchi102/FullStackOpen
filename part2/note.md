# Part 2 Notes

## Promises
Promises are central to modern JavaScript developmen.
https://www.w3schools.com/jS/js_promise.asp

Producing code: is code that can take some time\
Consuming code: is code that must wait for the result\
--> **Promise is an object that links producing codea and consuming code.**

A promise object have three states: Pending, Fulfilled, Rejected.

You can think of it as a modern way to handle **asynchronous callback**




## Debug ProTips: VS Code snippets
https://code.visualstudio.com/docs/editing/userdefinedsnippets#_creating-your-own-snippets

Snippets make it easier to enter repeating code patterns. press `ctrl+shift+P` and enter `insert snippet` to find the snippets available. 

## Rendering a collection, modules
* Array methods like `filter`, `map` and `reduce` can be used when dealing with array objects
* `<li>` tag needs a key attribute, **never use index as key**
* **Refactoring Modules**:
    * Create a directory in `src` called `Components` to store the module files
    * **Remember** to include the `export default <module>` line in the end of the module file
    * In the file that is using the module, add `import <module> from '<path/to/module>'`
## Forms
* We define the event handler like this:
    ```javascript
    const addNote = (event) => {
    event.preventDefault() // to prevent the default action of submitting the form.
    console.log('button clicked', event.target)
    }
    ```
    * the `event` parameter is the event that triggers the event handler
    * `preventDefault` prevent hte default action
    * `event.target` stores the element where the event occurs
* **How to access form input**
    * Using state in to manage inputs allow us to **control** the input. This means the input is managed by React and can perform instant validation.
* **Template String**
    similar to format string in python. use ` `` ` to form the string, and `${}` to access variables.

## Getting data from server
* You can start a JSON server with a JSON file using the following command:
`npx json-server --port 3001 <filename>.json`
* **Axios and promises**
    * import axios: `import axios from 'axios'`
    * `axios.get(<server_url>)` returns a promise object
    * **Promise object**\
    a promise object represents a eventual completion of an asynchronous operation
        * `pending`
        * `fulfilled`
        * `rejected`
* **Effect hooks**\
    `import {useEffect} from 'react'`
    * `useEffect` takes 2 parameters.
        1. The effect itself(a function)
        2. How often the effect is run: an empty array means that the effect only run with the **first render**. or you can define components in the array so that the effect run every time the component is changed.

## Altering data in server
* **REST**
    * Resources are fetched from the server with HTTP GET request
    * Creating new resources in the server is done by HTTP POST request
    * When you want to update an object in the server:
        * use PUT request to replace the object with a new one
        * use PATCH to only modify a portion of the object
    >**Note:** POST is usually used for creating a new object in the server. and PUT/PATCH is used for updating objects in the server.
* **Extracting communication with backend to seperate module:**
    * We can put all the backend communication function to a seperate module in folder `services`
    >**IMPORTANT** : the `then()` method in promise will also returns a promise.

* A cleaner syntax to define objects:
    ```javascript
    const person = {
        name: name,
        age: age
        }

        ↓
        ↓ //when the key and value has the same name
        ↓

        const person = { name, age }
    ```

* **Promise error handling**
    * If there is an error means the promise is in rejected state. we can add a error handling function with the `.catch()` method after the `.then()` methed\
    -->`promise.then(<callback>).catch(<errHandler>)`
    * If the `catch()` method is after a promise chain. It will be called **once any promise in the chain throws an error**

## Adding styles to React app
* If want to add style to specific component, it is better to use **class selector**
    * in HTML: `<p class="yourClass"></p>`
    * in React: `<p className="yourClass"></p>`

    and in the CSS file, to select the specific component:
    `.yourClass`

* **Inline-style**
    * CSS: 
    ```css
    {
        color: green;
        font-style: italic;
        font-size: 16px;
    }
    ```
    * React inline style object:
    ```javascript
    {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    ```
    * Limitation: [pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) can't be used straightforwardly.

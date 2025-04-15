# Part 2 Notes

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
    a promise object represents a eventual completion of an asynchronous operstion
        * `pending`
        * `fulfilled`
        * `rejected`
* **Effect hooks**\
    `import {useEffect} from 'react'`
    * `useEffect` takes 2 parameters.
        1. The effect itself
        2. How often the effect is run: an empty array means that the effect only run with the **first render**. or you can define components in the array so that the effect run every time the component is changed.
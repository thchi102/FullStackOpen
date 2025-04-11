# Part 1 notes

## Intro to React

### Components
To create a React app, the easiest way is to use **Vite**
``` bash
# Create a simple react app with vite
npm create vite@latest
# Create a react app with template
npm create vite@latest my-vue-app -- --template vue
```
After creating the project,
```bash
# install required packages specified in the node_modules folder
npm install
# start the application
npm run dev
```
* When using React, we don't directly edit the HTML file. All content that needs to be rendered is usually defined as a React component
* React can also render dynamic content
- **Never remove the `export default` line from the buttom of the file**
    
### JSX
* It may seems like the React component is returning HTML markups, but in fact, it is JSX.
* JSX is **XML-like**, which means that all tags needs to be closed
    * e.g. HTML: `<br>`, XML: `<br />`
* First letter of React components must be **Capitalized**
* A React component ussually needs to contain a root element(e.g `<div>`), otherwise it will result in error. But this will create extra div element, which is not ideal. This can be avoid by using **[Fragments](https://react.dev/reference/react/Fragment)**
* Objects cannot be rendered 

### Component State and event handler
* Destructing:

    In the following case, the props passed to the component are directly assigned to variables
    ``` javascript
    // The following two behaves the same
    // 1. 
    const Hello = (props) => {
    const { name, age } = props
    }
    // 2. 
    const Hello = ({ name, age }) => {
    }
    ```

* **Stateful component**

    We can add state with the help of React state hook.

    `import { useState } from 'react'`

    The [`useState()`](https://react.dev/reference/react/useState) function add state to the component. The function returns a state variable and a function to modify the state.

    When the state modifying function is called, React re-renders the component.

* `setTimeout(functionRef, delay)`:

    This function take **function references**, not function. Therefore, we can't directly pass a function into it. 

* **Event Handling**
    An event handler can be a function or a function reference. The best practice is to avoid defining inline function for event handler in JSX format. Define the event handling function seperately.

### Complex state and debugging
* We can define state object more neatly with **object spread**: `...<state object name>`
>**WARNING**: It is forbidden to mutate state directly. So everytime you need to modify the state, you create a new state object and update it with the state modification function. e.g. Use `concat()` instead of `push()` to add element into arrays. And reassign instead of modifying numbers.
* State updates are **Asynchronous**. The state is not update right after calling the set state function but at some point before the application is rendered. **Try not to use the state directly in other function. We can use a newly defined variable to keep represent the updated state.**

* the `useState()` function should **never** be called in loop, conditional expressions. Hooks may only be called from the inside of a function body that defines a React component.

* **A function that returns a function**: Event handlers only accept a function or reference to function, but not function call. **But if the function call returns a function, it can be used to assign to a event handler.** This is useful when you want to define a generic function that can be customized with parameters.

* **Never define component inside a component**. React treat the component defined in a component as a new component in every render. React cannot optimize the components this way.

### Exercise
* How to create a zero-filled array:
    1. `Array(anecdotes.length).fill(0)`
    2. `const ary = new Uint8Array(10)`
* Find the Max value in an array:
    `Math.max(...arr)` --> **Use spread syntax** if the input is an array\
    `Math.max()` takes numbers directly, like:`Math.max(1,2,3)`



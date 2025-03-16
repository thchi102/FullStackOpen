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
* When using React, we don't directly edit the HTML file. All content that needs to be rendered is usually defined as a React component
* React can also render dynamic content
- **Never remove the `export default` line from the buttom of the file**

### JSX
* It may seems like the React component is returning HTML markups, but in fact, it is JSX.
* JSX is **XML-like**, which means that all tags needs to be closed
    * e.g. HTML: `<br>`, XML: `<br />`


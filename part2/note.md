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
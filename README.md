# Todo App

A simple task management application that we will build step by step. We'll start with the HTML structure and gradually add JavaScript functionality.

This project is part of the **Web Programming Basics (4IT427)** course at the University of Economics in Prague.

## Table of Contents

- [JavaScript and TypeScript History](#javascript-and-typescript-history)
- [Project Description](#project-description)
- [How to Run the Project](#how-to-run-the-project)
- [Why Vite?](#why-vite)
- [HTML Structure](#html-structure)
- [Basic JavaScript Functions](#basic-javascript-functions)
- [Key JavaScript Concepts](#key-javascript-concepts)
  - [Data Types](#data-types)
  - [Variables (let, var, const)](#variables-let-var-const)
  - [Functions (normal and arrow)](#functions-normal-and-arrow)
  - [Conditions](#conditions)
  - [Loops](#loops)
  - [Operators](#operators)
  - [Objects and Classes](#objects-and-classes)
  - [Arrays](#arrays)
  - [Set and Map](#set-and-map)
  - [Events](#events)
  - [Document and Window Objects](#document-and-window-objects)
  - [Asynchronous Programming](#asynchronous-programming)
  - [Polyfills](#polyfills)
- [Useful Links](#useful-links)

## JavaScript and TypeScript History

### JavaScript Evolution

JavaScript was created by Brendan Eich at Netscape in 1995. It was initially called Mocha, then LiveScript, and finally JavaScript. The language was created in just 10 days and was designed to be a simple scripting language for web browsers.

Key milestones in JavaScript history:

- 1995: JavaScript 1.0 released
- 1997: ECMAScript 1 (First standardization)
- 2009: ECMAScript 5 (Strict mode, JSON support)
- 2015: ECMAScript 2015 (ES6) - Major update with classes, modules, promises
- 2016+: Yearly releases with new features

### TypeScript Introduction

TypeScript was developed by Microsoft and first released in 2012. It's a superset of JavaScript that adds static typing. Key benefits include:

- Static type checking
- Better IDE support
- Enhanced code documentation
- Catch errors during development
- Better maintainability for large projects

TypeScript compiles to JavaScript, making it compatible with all JavaScript environments.

## Why Vite?

This project uses Vite as its build tool and development server. Vite offers several advantages:

1. **Fast Development Server**

   - Uses native ES modules
   - No bundling during development
   - Instant hot module replacement (HMR)

2. **Optimized Production Builds**

   - Automatic code splitting
   - Efficient asset handling
   - Modern JavaScript features support

3. **TypeScript Support**

   - Native TypeScript support
   - Fast type checking
   - No separate compilation step needed

4. **Modern Development Experience**
   - Built-in support for modern web features
   - Simple configuration
   - Excellent developer experience

## Project Description

In this project, we will together create a simple task management application. We'll start with the HTML structure, which will include a form for adding new tasks and a list for displaying them. Then we'll gradually add JavaScript functionality that will allow:

- Adding new tasks
- Marking tasks as completed
- Deleting tasks
- Displaying a list of all tasks

This approach will help you understand how JavaScript interacts with HTML and how we can gradually add functionality to the basic HTML structure.

## How to Run the Project

1. Make sure you have Node.js installed
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser at: `http://localhost:5173`

## HTML Structure

The HTML structure of the application is simple and understandable:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Todo List</title>
    <link rel="stylesheet" href="./src/style.css" />
  </head>
  <body>
    <div class="container">
      <header>
        <h1>My Todo List</h1>
        <p class="subtitle">Add your tasks</p>
      </header>

      <main>
        <form id="todo-form">
          <div class="input-group">
            <input
              name="todo-text"
              id="new-todo-input"
              placeholder="What needs to be done?"
              autocomplete="off"
            />
            <button type="submit" id="add-btn">Add</button>
          </div>
        </form>

        <div class="todo-container">
          <ul id="todo-list"></ul>
        </div>
      </main>

      <footer>
        <p>Click on a task to mark it as completed</p>
      </footer>
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

Main elements:

- `<form id="todo-form">` - form for adding a new task
- `<input name="todo-text" id="new-todo-input">` - input field for task text
- `<button type="submit" id="add-btn">` - button for adding a task
- `<ul id="todo-list">` - list of tasks that is dynamically generated by JavaScript

## Basic JavaScript Functions

The application uses the following basic JavaScript functions:

### 1. Getting Elements from the Page

```javascript
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
```

The `document.getElementById()` function returns an element by its ID. In TypeScript, we use `as HTMLFormElement` to specify the element type.

### 2. Adding an Event Listener

```javascript
todoForm.addEventListener("submit", handleTodoFormSubmit);
```

The `addEventListener()` method adds an event listener to an element. In this case, we're listening for the `submit` event on the form.

### 3. Getting Form Data

```javascript
const formData = new FormData(todoForm);
const todoText = formData.get("todo-text") as string;
```

`FormData` is an object that allows easy access to form data. The `get()` method returns the value by field name.

### 4. Creating Elements

```javascript
const todoItem = document.createElement("li");
const span = document.createElement("span");
const button = document.createElement("button");
```

The `document.createElement()` method creates a new HTML element.

### 5. Setting Attributes and Properties

```javascript
todoItem.setAttribute("data-id", todo.id);
span.textContent = todo.text;
button.textContent = "Delete";
```

The `setAttribute()` method sets an element's attribute, the `textContent` property sets the text content of an element.

### 6. Adding Elements to the DOM

```javascript
todoItem.appendChild(span);
todoItem.appendChild(button);
todoList.appendChild(todoItem);
```

The `appendChild()` method adds an element as a child of another element.

### 7. Clearing Element Content

```javascript
todoList.innerHTML = "";
```

The `innerHTML` property allows setting or getting the HTML content of an element. Setting it to an empty string clears the element's content.

## Key JavaScript Concepts

### Data Types

JavaScript has several basic data types:

#### Primitive Types

```javascript
// String
const text = "Hello world";

// Number
const number = 42;
const decimal = 3.14;

// Boolean
const isTrue = true;
const isFalse = false;

// Undefined
let undefined;
console.log(undefined); // undefined

// Null
const empty = null;

// Symbol
const symbol = Symbol("description");

// BigInt
const bigNumber = 9007199254740991n;
```

#### Objects

```javascript
// Object
const person = {
  name: "John",
  age: 30,
  address: {
    street: "Main St 123",
    city: "Prague",
  },
};

// Array (special type of object)
const colors = ["red", "green", "blue"];
```

### Operators

JavaScript supports various types of operators:

#### Arithmetic Operators

```javascript
const a = 10;
const b = 5;

console.log(a + b); // Addition: 15
console.log(a - b); // Subtraction: 5
console.log(a * b); // Multiplication: 50
console.log(a / b); // Division: 2
console.log(a % b); // Modulo (remainder): 0
console.log(a ** b); // Exponentiation: 100000
console.log(a++); // Increment: 10 (returns value then increments)
console.log(++a); // Increment: 12 (increments then returns value)
console.log(b--); // Decrement: 5 (returns value then decrements)
console.log(--b); // Decrement: 3 (decrements then returns value)
```

#### Comparison Operators

```javascript
console.log(5 == "5"); // Equal to (with type conversion): true
console.log(5 === "5"); // Equal to (without type conversion): false
console.log(5 != "5"); // Not equal to (with type conversion): false
console.log(5 !== "5"); // Not equal to (without type conversion): true
console.log(5 > 3); // Greater than: true
console.log(5 >= 5); // Greater than or equal to: true
console.log(3 < 5); // Less than: true
console.log(5 <= 5); // Less than or equal to: true
```

#### Logical Operators

```javascript
console.log(true && true); // AND: true
console.log(true && false); // AND: false
console.log(true || false); // OR: true
console.log(false || false); // OR: false
console.log(!true); // NOT: false
```

#### Nullish Coalescing Operator (??)

```javascript
const value = null;
const default = value ?? "default value"; // "default value"
```

#### Optional Chaining Operator (?.)

```javascript
const person = { address: { city: "Prague" } };
console.log(person?.address?.city); // "Prague"
console.log(person?.contact?.email); // undefined (without error)
```

### Variables (let, var, const)

JavaScript offers three ways to declare variables:

#### var

```javascript
var x = 10;
```

- Function scope (accessible throughout the function)
- Hoisting (variable is available throughout the scope, even if declared later)
- Can be redeclared
- Not recommended in modern JavaScript

#### let

```javascript
let y = 20;
```

- Block scope (accessible only within the block where it's declared)
- No hoisting
- Can be changed but not redeclared
- Recommended way to declare variables that will change

#### const

```javascript
const z = 30;
```

- Block scope
- No hoisting
- Cannot be changed or redeclared
- Recommended way to declare constants

### Objects and Classes

JavaScript is an object-oriented language that supports working with objects and classes.

#### Objects

```javascript
// Creating an object using a literal
const person = {
  name: "John",
  age: 30,
  greet: function () {
    return `Hello, I'm ${this.name}`;
  },
};

// Accessing properties
console.log(person.name); // "John"
console.log(person["age"]); // 30
console.log(person.greet()); // "Hello, I'm John"

// Adding a new property
person.occupation = "programmer";

// Deleting a property
delete person.age;
```

#### Classes

```javascript
// Class definition
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }

  // Static method
  static createAnonymous() {
    return new Person("Anonymous", 0);
  }
}

// Creating an instance
const john = new Person("John", 30);
console.log(john.greet()); // "Hello, I'm John"

// Inheritance
class Programmer extends Person {
  constructor(name, age, language) {
    super(name, age);
    this.language = language;
  }

  code() {
    return `${this.name} is coding in ${this.language}`;
  }
}

const programmer = new Programmer("John", 30, "JavaScript");
console.log(programmer.code()); // "John is coding in JavaScript"
```

### Arrays

Arrays in JavaScript are a special type of object that allows storing and processing collections of values.

```javascript
// Creating an array
const colors = ["red", "green", "blue"];

// Accessing elements
console.log(colors[0]); // "red"
console.log(colors.length); // 3

// Adding an element to the end
colors.push("yellow");
console.log(colors); // ["red", "green", "blue", "yellow"]

// Removing the last element
const last = colors.pop();
console.log(last); // "yellow"
console.log(colors); // ["red", "green", "blue"]

// Adding an element to the beginning
colors.unshift("white");
console.log(colors); // ["white", "red", "green", "blue"]

// Removing the first element
const first = colors.shift();
console.log(first); // "white"
console.log(colors); // ["red", "green", "blue"]

// Array methods
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map((number) => number * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - filter elements based on a condition
const even = numbers.filter((number) => number % 2 === 0);
console.log(even); // [2, 4]

// reduce - reduce array to a single value
const sum = numbers.reduce((accumulator, number) => accumulator + number, 0);
console.log(sum); // 15

// find - find the first element that satisfies a condition
const greaterThanThree = numbers.find((number) => number > 3);
console.log(greaterThanThree); // 4

// some - check if at least one element satisfies a condition
const containsThree = numbers.some((number) => number === 3);
console.log(containsThree); // true

// every - check if all elements satisfy a condition
const allGreaterThanZero = numbers.every((number) => number > 0);
console.log(allGreaterThanZero); // true
```

### Functions (normal and arrow)

#### Normal Functions

```javascript
function add(a, b) {
  return a + b;
}
```

- Has its own `this` context
- Can be used as a constructor (with the `new` keyword)
- Has access to the `arguments` object
- Can be named

#### Arrow Functions

```javascript
const multiply = (a, b) => a * b;
```

- Inherits `this` context from the surrounding scope
- Cannot be used as a constructor
- Does not have access to the `arguments` object
- Shorter syntax
- Ideal for callback functions

#### Scoping Difference

```javascript
// Normal function
function example() {
  console.log(this); // this is the context in which the function is called

  setTimeout(function () {
    console.log(this); // this is window or undefined (depending on strict mode)
  }, 1000);
}

// Arrow function
function example() {
  console.log(this); // this is the context in which the function is called

  setTimeout(() => {
    console.log(this); // this is the same as in the parent scope
  }, 1000);
}
```

The main difference is in how they work with the `this` context. Arrow functions don't have their own `this`, but inherit it from the parent scope. This is especially useful in callback functions where we want to preserve the original `this` context.

### Conditions

Conditions in JavaScript allow performing different actions based on whether a certain condition is met.

#### if, else if, else

```javascript
if (condition) {
  // Code that executes if the condition is true
} else if (anotherCondition) {
  // Code that executes if anotherCondition is true
} else {
  // Code that executes if no condition is true
}
```

#### Ternary Operator

```javascript
const result = condition ? value1 : value2;
```

The ternary operator is a shorthand for a condition. If the condition is true, it returns value1, otherwise value2.

#### switch

```javascript
switch (value) {
  case 1:
    // Code for value 1
    break;
  case 2:
    // Code for value 2
    break;
  default:
  // Code for all other values
}
```

Switch is useful when we want to perform different actions based on a variable's value.

### Loops

Loops in JavaScript allow repeatedly executing a certain block of code.

#### for

```javascript
for (let i = 0; i < 10; i++) {
  // Code that executes 10 times
}
```

For loop is used when we know how many times we want to repeat the loop.

#### while

```javascript
let i = 0;
while (i < 10) {
  // Code that executes as long as i < 10
  i++;
}
```

While loop executes as long as the condition is true.

#### do...while

```javascript
let i = 0;
do {
  // Code that executes at least once
  i++;
} while (i < 10);
```

Do...while loop executes at least once, even if the condition is not met.

#### for...of

```javascript
const array = [1, 2, 3, 4, 5];
for (const value of array) {
  // Code that executes for each value in the array
}
```

For...of loop is used for iterating over iterable objects (arrays, strings, etc.).

#### for...in

```javascript
const object = { a: 1, b: 2, c: 3 };
for (const key in object) {
  // Code that executes for each key in the object
}
```

For...in loop is used for iterating over object properties.

### Events

JavaScript allows responding to various events that occur in the browser.

#### Basic Events

```javascript
// Mouse events
element.addEventListener("click", function (event) {
  console.log("Click on element");
});

element.addEventListener("mouseover", function (event) {
  console.log("Mouse is over element");
});

element.addEventListener("mouseout", function (event) {
  console.log("Mouse left element");
});

// Keyboard events
document.addEventListener("keydown", function (event) {
  console.log(`Key pressed: ${event.key}`);
});

// Form events
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default behavior (form submission)
  console.log("Form was submitted");
});

input.addEventListener("change", function (event) {
  console.log(`Value changed to: ${event.target.value}`);
});

// Window events
window.addEventListener("load", function () {
  console.log("Page was loaded");
});

window.addEventListener("resize", function () {
  console.log(`Window size: ${window.innerWidth}x${window.innerHeight}`);
});
```

#### Event Object

When an event occurs, JavaScript creates an event object that contains information about the event.

```javascript
element.addEventListener("click", function (event) {
  console.log(event.type); // "click"
  console.log(event.target); // Element that was clicked
  console.log(event.clientX); // X coordinate of click
  console.log(event.clientY); // Y coordinate of click
  console.log(event.preventDefault); // Function to prevent default behavior
  console.log(event.stopPropagation); // Function to stop event propagation
});
```

#### Event Delegation

Event delegation is a technique where an event is captured on a parent element and processed based on the target element.

```javascript
// Instead of adding an event to each element
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    console.log("Button clicked");
  });
});

// Use event delegation
const container = document.querySelector(".container");
container.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    console.log("Button clicked");
  }
});
```

### Asynchronous Programming

JavaScript is a single-threaded language, which means it can only execute one block of code at a time. Asynchronous programming allows performing long-running operations without blocking the main thread.

#### Callback Functions

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "John", age: 30 };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log(data); // { name: "John", age: 30 }
});
```

Callback functions are passed as arguments to other functions and are called after the operation is completed. They can lead to "callback hell" (nested callbacks), which makes code harder to read and maintain.

#### Promises

A Promise is an object that represents the completion (or failure) of an asynchronous operation and its resulting value.

```javascript
const promise = new Promise((resolve, reject) => {
  // Asynchronous operation
  const success = true;

  if (success) {
    resolve({ name: "John", age: 30 });
  } else {
    reject(new Error("Operation failed"));
  }
});

promise
  .then((data) => {
    console.log(data); // { name: "John", age: 30 }
  })
  .catch((error) => {
    console.error(error);
  });
```

A Promise has three states:

- **Pending**: Initial state, operation is not yet completed
- **Fulfilled**: Operation was successfully completed
- **Rejected**: Operation failed

#### async/await

`async/await` is syntactic sugar over Promises that allows writing asynchronous code in a synchronous style.

```javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Usage
fetchData()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

Key terms:

- `async` before a function indicates that the function returns a Promise
- `await` can only be used inside an `async` function and waits for a Promise to complete
- `try/catch` block allows catching errors in asynchronous code

#### Parallel Processing

```javascript
async function fetchMultipleData() {
  try {
    // Parallel processing of multiple Promises
    const [data1, data2] = await Promise.all([
      fetch("https://api.example.com/data1").then((res) => res.json()),
      fetch("https://api.example.com/data2").then((res) => res.json()),
    ]);

    return { data1, data2 };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
```

`Promise.all()` allows running multiple Promises in parallel and waiting for all of them to complete.

### Set and Map

#### Set

A Set is a collection of unique values. Each value can occur only once in a Set.

```javascript
// Creating a Set
const uniqueNumbers = new Set([1, 2, 3, 3, 4, 4, 5]); // [1, 2, 3, 4, 5]

// Adding values
uniqueNumbers.add(6);
uniqueNumbers.add(1); // Won't add duplicate

// Checking values
console.log(uniqueNumbers.has(3)); // true
console.log(uniqueNumbers.size); // 6

// Removing values
uniqueNumbers.delete(3);

// Iterating
for (const number of uniqueNumbers) {
  console.log(number);
}

// Converting to Array
const array = [...uniqueNumbers];
```

#### Map

A Map is a collection of key-value pairs where keys can be of any type.

```javascript
// Creating a Map
const userMap = new Map();

// Adding entries
userMap.set("id", 1);
userMap.set("name", "John");
userMap.set({ key: "object" }, "value"); // Object as key

// Getting values
console.log(userMap.get("name")); // 'John'

// Checking keys
console.log(userMap.has("id")); // true

// Removing entries
userMap.delete("id");

// Iterating
for (const [key, value] of userMap) {
  console.log(`${key}: ${value}`);
}

// Converting to Array
const entries = [...userMap.entries()];
```

### Document and Window Objects

#### Document Object

The `document` object represents the web page and provides access to its content.

```javascript
// Selecting elements
const element = document.getElementById("myId");
const elements = document.getElementsByClassName("myClass");
const elements = document.getElementsByTagName("div");
const element = document.querySelector(".myClass");
const elements = document.querySelectorAll(".myClass");

// Creating elements
const div = document.createElement("div");
div.textContent = "Hello World";
document.body.appendChild(div);

// Modifying elements
element.style.color = "red";
element.classList.add("active");
element.setAttribute("data-id", "123");

// Event handling
document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded");
});
```

#### Window Object

The `window` object represents the browser window and provides global functions and properties.

```javascript
// Window properties
console.log(window.innerWidth); // Window width
console.log(window.innerHeight); // Window height
console.log(window.location.href); // Current URL

// Window methods
window.scrollTo(0, 100); // Scroll to position
window.alert("Hello"); // Show alert
window.confirm("Continue?"); // Show confirmation
window.prompt("Enter name"); // Show prompt

// Timing functions
const timeoutId = setTimeout(() => {
  console.log("After 1 second");
}, 1000);

const intervalId = setInterval(() => {
  console.log("Every second");
}, 1000);

// Clearing timers
clearTimeout(timeoutId);
clearInterval(intervalId);
```

### Polyfills

Polyfills are code that implements a feature on web browsers that don't support the feature natively. They "fill in" the gaps in browser support.

```javascript
// Example: Array.prototype.includes polyfill
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement, fromIndex) {
    if (this == null) {
      throw new TypeError('"this" is null or undefined');
    }

    var o = Object(this);
    var len = o.length >>> 0;

    if (len === 0) {
      return false;
    }

    var n = fromIndex | 0;
    var k = Math.max(n >= 0 ? n : len + n, 0);

    while (k < len) {
      if (o[k] === searchElement) {
        return true;
      }
      k++;
    }
    return false;
  };
}
```

Common use cases for polyfills:

1. Supporting new JavaScript features in older browsers
2. Implementing missing browser APIs
3. Ensuring consistent behavior across browsers

Modern development often uses tools like Babel to automatically handle polyfills, but understanding how they work is important for legacy code maintenance and debugging.

## Useful Links

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Official JavaScript documentation
- [MDN Web Docs - DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) - DOM API documentation
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Official TypeScript documentation
- [W3Schools JavaScript Tutorial](https://www.w3schools.com/js/) - Interactive JavaScript tutorial
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial

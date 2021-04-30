# Py-me
### Remote Python Socket.io API

## Abstract :
- Py-me is a Socket.io API used to execute a Python snippet and get back the output for app-development.
- Py-me is secure, free and can be accessed from any language that has Socket.io Framework.
- Py-me was built specially for static webpages hosted on free web hosting services like GitHub, Glitch and Heroku where you might have to pay for a Backend services.
- A static website has various limitations which can be overcome using py-me.
---
## Let's start using py-me :
Imagine py-me as a function that takes in **Python** code as argument and returns it's output as a string. Py-me can be accessed in 2 ways:
- Calling from a Web app
- Calling from any programming language
---
## Calling py-me from a Web App :
This is what py-me was built for, running a python script off a website using JavaScript.

Configure your website to run py-me in 2 steps :
- **Step 1** : Add this Socket.io link to your HTML page.
**`<script src="https://py-me.glitch.me/socket.io/socket.io.js"></script>`**
- **Step 2** : Initialize the socket in your JS file.
**`var socket = io("https://py-me.glitch.me/");`**

---
- To send your python code to the server for execution, use the **`socket.emit()`** method. This is similar to a HTTP request. **socket.emit()** method takes 2 arguements. The 1st arguement shall always be **"py-me"** and the 2nd one is a JSON object containing your code in a key named **"code"**.

**`socket.emit("py-me", { code : python_code } );`**

- To get the output back, use **`socket.on()`** method. It takes 2 arguements with the first one being **"py-out"** and the second one being a JS callback function whose arguement is a JSON Object (data).

The data object consists of **code** (the python code executed), **output** (output of the Python code) and **exceptions** (any exceptions defined by py-me).

```JavaScript
  socket.on("py-out", (data) => {
  console.log("Py-me replied");
  console.log("Py-me said "+JSON.stringify(data));
  console.log("\n");
  console.log("code : "+String(data.code));
  console.log("output : "+String(data.output));
  console.log("exceptions : "+String(data.exceptions));
  });
```

The final code looks something like :

```JavaScript
var socket = io("https://py-me.glitch.me/");

python_code=`
# Your Python code here :
print("hello world")
`;

socket.emit("py-me", { code : python_code } );

socket.on("py-out", (data) => {
console.log("Py-me replied");
console.log("Py-me said "+JSON.stringify(data));
console.log("\n");
console.log("code : "+String(data.code));
console.log("output : "+String(data.output));
console.log("exceptions : "+String(data.exceptions));
});

```

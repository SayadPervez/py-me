# Py-me
### Remote Python Socket.io API
## Table of contents :
- [Abstract](#abstract-)
- [Let's start using py-me](#lets-start-using-py-me-)
- [Calling py-me from a Web App](#calling-py-me-from-a-web-app-)
- [Accessing py-me as a Client-Side server](#accessing-py-me-as-a-client-side-server-)
- [Py-me defined exceptions](#py-me-defined-exceptions-)
    * [Unpermitted Modules Exception](#py-me-defined-exceptions-)
---
## Abstract :
- Py-me is a Socket.io API used to execute a Python snippet and get back the output for app-development.
- Py-me is secure, free and can be accessed from any language that has Socket.io Framework.
- Py-me was built specially for static webpages hosted on free web hosting services like GitHub, Glitch and Heroku where you might have to pay for a Backend services.
- A static website has various limitations which can be overcome using py-me.
---
## Let's start using py-me :
Imagine py-me as a function that takes in **Python** code as argument and returns it's output as a string. Py-me can be accessed in 2 ways:
- Calling from a Web app
- Accessing py-me as a Client-Side server
---
## Calling py-me from a Web App :
This is what py-me was built for, running a python script off a website using JavaScript.

Configure your website to run py-me in 2 steps :
- **Step 1** : Add this Socket.io link to your HTML page.
```JavaScript
<script src="https://py-me.glitch.me/socket.io/socket.io.js"></script>
```
- **Step 2** : Initialize the socket in your JS file.
```JavaScript
var socket = io("https://py-me.glitch.me/");
```

---
- To send your python code to the server for execution, use the **`socket.emit()`** method. This is similar to a HTTP request. **socket.emit()** method takes 2 arguements. The 1st arguement shall always be **"py-me"** and the 2nd one is a JSON object containing your code in a key named **"code"**.

```JavaScript
socket.emit("py-me", { code : python_code } );
```

- To get the output back, use **`socket.on()`** method. It takes 2 arguements with the first one being **"py-out"** and the second one being a JS callback function whose arguement is a JSON Object (data).

The data object consists of **`code`** (the python code executed), **`output`** (output of the Python code) and [**`exceptions`**](#py-me-defined-exceptions-) (any exceptions defined by py-me).

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

The final JS code file looks something like :

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

---

Here is an example web python interpreter built using py-me : [Web App Based Example](https://py-me.glitch.me/)

[Source Code of the below website](https://github.com/SayadPervez/py-me/tree/main/app/views)


![Web based example image](https://github.com/SayadPervez/py-me/blob/main/app/web%20based%20example.jpg?raw=true)

---
## Accessing py-me as a Client-Side server :

You can access py-me from any programming language as long as the language supports Socket.io Client. Some other languages are :
- Python
- NodeJS
- Java
- C++
- Swift
- Dart

For more info, check this out : [Socket.io Docs](https://socket.io/docs/v4/index.html)

This example will explain How to call py-me from a **NodeJS** server :

- **Installation** : Install **`Socket.io-client`** from npm.
```bash
npm install Socket.io-client
```
- **Initialization** : Add the following lines to initialize your socket connection to py-me.
```JavaScript
const sio = require("socket.io-client")
const io = sio.connect("https://py-me.glitch.me/");
```

- **Emit event** : To send your python code to the server for execution, use the **`io.emit()`** method. This is similar to a HTTP request. **io.emit()** method takes 2 arguements. The 1st arguement shall always be **"py-me"** and the 2nd one is a JSON object containing your python code in a key named **"code"**.
```JavaScript
io.emit("py-me", { code : python_code } );
```
- **Receive event** : To get the output back, use **`io.on()`** method. It takes 2 arguements with the first one being **"py-out"** and the second one being a JS callback function whose arguement is a JSON Object (data).

The data object consists of **`code`** (the python code executed), **`output`** (output of the Python code) and [**`exceptions`**](#py-me-defined-exceptions-) (any exceptions defined by py-me).

```JavaScript
  io.on("py-out", (data) => {
  console.log("Py-me replied");
  console.log("Py-me said "+JSON.stringify(data));
  console.log("\n");
  console.log("code : "+String(data.code));
  console.log("output : "+String(data.output));
  console.log("exceptions : "+String(data.exceptions));
  });
```
- **Final code** : Run your final code using NodeJS.

```JavaScript
// npm install Socket.io-client
const sio = require("socket.io-client")
const io = sio.connect("https://py-me.glitch.me/");

var python_code = 'print("hello world")';

io.emit("py-me", { code : python_code } );

io.on("py-out", (data) => {
console.log("Py-me replied");
console.log("Py-me said "+JSON.stringify(data));
console.log("\n");
console.log("code : "+String(data.code));
console.log("output : "+String(data.output));
console.log("exceptions : "+String(data.exceptions));
});
```

---
## Py-me defined exceptions :
### Unpermitted Modules Exception :
Py-me allows only certain built-in and external modules to be used as a measure of security. When you use py-me API, the python code is sent from your desktop or website to a cloud server where it is executed. A harmful piece of code that tampers with the existing file structure of the server could shutdown py-me services. Thus here are a list of few Modules that are permitted to use :


|  time       |  abc      |  argparse     |  collections    |  copy           |  csv            |
|:---:|:---:|:---:|:---:|:---:|:---:|
|  **datetime**   |  **decimal**  |  **functools**    |  **hashlib**        |  **http**           |  **importlib**      |
|  **itertools**  |  **inspect**  |  **json**         |  **logging**        |  **math**           |  **pdb**            |
|  **random**     |  **re**       |  **shutil**       |  **types**          |  **urllib**         |  **uuid**           |
|  **ast**        |  **numpy**    |  **numpy as np**  |  **field-vacant**   |  **field-vacant**   |  **field-vacant**   |


Unpermitted Modules Exception arises when you try to use any modules other than the permitted ones.

Note that importing a module as something else will also throw this exception.

The only external module available to use is **`numpy`**.
```Python
import random          # This would work just fine
import random as rd    # This would throw an exception since "random as rd" is not in permitted modules list.
import numpy as np     # This would work since "numpy as np" is defined in the permitted list.
```

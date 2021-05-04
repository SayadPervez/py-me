var app = require('express')();
var express = require('express');
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static("./views"));

function pip(){
  const execSync = require('child_process').execSync;
  const output = execSync("pip install numpy ", { encoding: 'utf-8' });
  console.log("numpy installed");
}
//pip();

function cls(){
  const execSync = require('child_process').execSync;
  const output = execSync("python3 clear.py ", { encoding: 'utf-8' });
  console.log("Cleaning Done !!");
}

setInterval(function() {
    cls();
}, 60 * 1000); // 60 * 1000 milsec

function py(code){
  const execSync = require('child_process').execSync;
  const output = execSync("python3 pyme.py "+`"${code}"`, { encoding: 'utf-8' });
  return(output);
}
function validate(code){
  const execSync = require('child_process').execSync;
  const output = execSync("python3 v.py "+`"${code}"`, { encoding: 'utf-8' });
  return(output);
}
function vx(code){
  const execSync = require('child_process').execSync;
  const output = execSync("python3 vx.py "+`"${code}"`, { encoding: 'utf-8' });
  return(output);
}

io.on('connection', (socket) => {
  socket.on("Hi",(x)=>{
    var status="success";
    console.log("hi from client");
    io.to(socket.id).emit("Hello",{status:status});
  });
  socket.on("py-me",(x)=>{
    var st = validate(x.code);
    if(st.replace("\n","")=="$-SUCCESS-$")
    {
      var sx = vx(x.code);
      if(sx.replace("\n","")=="$-SUCCESS-$")
      {  
        var out=py((x.code).replace(/"/g, "'"));
        io.to(socket.id).emit("py-out",{code:x.code,output:out,exceptions:"None"});
        cls();
      }
      else
      {
        io.to(socket.id).emit("py-out",{code:x.code,output:"Code was not executed due to Banned Words Exception\n",exceptions:"Banned Words Exception :\n"+sx+"<-^--- words are not allowed to be used in py-me.\nCheck documentation for banned words !\n"});    
      }
    }
    else
    {
      io.to(socket.id).emit("py-out",{code:x.code,output:"Code was not executed due to Unpermitted Modules Exception\n",exceptions:"Unpermitted Modules Exception :\n"+st+"<-^--- modules are not allowed to be used in py-me.\nCheck documentation for permitted modules !\n"});
    }
  });

});

http.listen(process.env.PORT||3000, () => {;
});

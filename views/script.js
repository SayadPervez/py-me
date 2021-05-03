var socket = io("https://py-me.glitch.me/");
var cd = ``;

document.getElementById('codebox').addEventListener('keydown', function(e) {
  if (e.key == 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    this.value = this.value.substring(0, start) +
      "\t" + this.value.substring(end);

    // put caret at right position again
    this.selectionStart =
      this.selectionEnd = start + 1;
  }
});

function buttonclick() {
  socket.emit("py-me", {
    code: cd + document.getElementById("codebox").value
  });
}
socket.emit("py-me", {
  code: cd + document.getElementById("codebox").innerText
});
socket.on("py-out", data => {
  console.log("reply is back");
  document.getElementById("output").innerHTML =
    'OUTPUT : <br class="pch"><strong>' + data.output + "</strong><br>" + "EXCEPTION : <strong>" + data.exceptions+"</strong>";
});

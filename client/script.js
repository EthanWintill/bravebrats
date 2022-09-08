var socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');

function submit(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
}
form.addEventListener('submit', submit);
const socket = io();

chat_form = document.getElementById("chat-form");
const msg_input = document.getElementById("msg");

socket.on("message", (message) => {
  console.log(message);
});

chat_form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (msg_input) {
    socket.emit("chat-message", msg_input.value);
  }
  msg_input.value = "";
});

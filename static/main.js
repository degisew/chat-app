const socket = io();

const container = document.querySelector(".chat-messages");
chat_form = document.getElementById("chat-form");
const msg_input = document.getElementById("msg");

const outputMessage = (message) => {
  const div = document.createElement("div");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
     ${message.text}
    </p>`;

  container.append(div);
};

socket.on("message", (message) => {
  outputMessage(message);
  container.scrollTop = container.scrollHeight;
});

chat_form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (msg_input) {
    socket.emit("chatMessage", msg_input.value);
  }
  msg_input.value = "";
  msg_input.focus();
});

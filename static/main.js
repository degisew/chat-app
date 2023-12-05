const socket = io();

const container = document.querySelector(".chat-messages");
chat_form = document.getElementById("chat-form");
const msg_input = document.getElementById("msg");

// Get username and room name from URL query string.
// I have added QS cdn instead of installing qs npm package.
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
})

// Join room
socket.emit('joinRoom', {username, room});

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

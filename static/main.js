const socket = io();

const container = document.querySelector(".chat-messages");
chat_form = document.getElementById("chat-form");
const msg_input = document.getElementById("msg");
const roomName = document.getElementById("room-name");
const usersList = document.getElementById("users");
// Get username and room name from URL query string.
// I have added QS cdn instead of installing qs npm package.
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Join room
// socket.emit("joinRoom", { username, room });

// const getRoomUsersList = (users) => {
//   usersList.innerHTML = `
//   ${users.map((user) => `<li>${user.username}</li>`).join('')}`;
// };

// const getRoomName = () => {
//   roomName.innerText = room;
// };

const sender = username;
const receiver = '@Meshueamer';

function  generateChatRoomId(senderId, receiverId) {
  return senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`;
}

const receiverUsername = 'Meshueamer'; // Replace with the actual receiver's username

const chatRoomId = generateChatRoomId(username, receiverUsername);
console.log('############################', chatRoomId);

const outputMessage = (message) => {
  message = typeof(Array.isArray(message)) ? message : [message]
  const div = document.createElement("div");
  div.innerHTML = `
  ${message.map((msg) => `<p class="meta">${msg.sender} <span class'"meta>${msg.time}</span></p>
  <p class="text">
   ${msg.text}
  </p>`).join('')}`;

  container.append(div);
};

socket.on("start", (message) => {
  outputMessage(message);
  container.scrollTop = container.scrollHeight;
});

socket.on("message", (message) => {
  outputMessage(message);
  container.scrollTop = container.scrollHeight;
});

// socket.on("roomUsers", ({ room, users }) => {
//   getRoomName(room);
//   getRoomUsersList(users);
// });

chat_form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (msg_input) {
    socket.emit("chatMessage", {chatRoomId: generateChatRoomId(username, '@Meshueamer'), messageId: socket.id, text: msg_input.value, sender: username});
  }
  msg_input.value = "";
  msg_input.focus();
});

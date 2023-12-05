const users = [];

const userJoin = (id, username, room) => {
  const user = {id, username, room };
  users.push(user);
  return user;
};

// Get current user
const getCurrentUser = (id) => {
  return users.find(user => user.id === id);
};


// users that leave the chat
const usersLeave = (id) => {
    const index = users.findIndex(user => user.id = id);
    if(index != -1) {
        return users.splice(index, 1)[0];
    }
}


const getRoomUsers = (room) => {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    usersLeave,
    getRoomUsers,
}
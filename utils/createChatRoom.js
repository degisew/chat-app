const createChatId = (senderUid, receiverUid) => {
    // Ensure a consistent order of user IDs to create the same room ID regardless of the order
    const sortedIds = [senderUid, receiverUid].sort();
    // Concatenate the sorted user IDs to create a unique room ID
    const roomId = sortedIds.join('-');

    return roomId;
};


module.exports = createChatId;
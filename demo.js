const generateChatRoomId = ( receiverId, senderId) => {
    return senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`;
  };
  
  const chatRoomId = generateChatRoomId('@Dagi_spider', '@Meshueamer');

  
  console.log(chatRoomId);
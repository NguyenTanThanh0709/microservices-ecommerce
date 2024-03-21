const Chat = require('../models/chats'); // Import model của Bảng Chat

// Function để lấy tất cả các tin nhắn giữa hai bên dựa trên sender_id và receiver_id
async function getChatMessages(user1Id, user2Id) {
    try {
        const chatMessages = await Chat.find({
            $or: [
                { sender_id: user1Id, receiver_id: user2Id },
                { sender_id: user2Id, receiver_id: user1Id }
            ]
        }).sort({ created_at: 1 }); // Sắp xếp theo thời gian tạo tin nhắn (tăng dần)

        return chatMessages;
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        throw error;
    }
}

// Sử dụng function để lấy thông tin của các tin nhắn giữa hai bên
// getChatMessages('user1_id', 'user2_id')
//     .then(chatMessages => {
//         console.log('Chat messages:', chatMessages);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

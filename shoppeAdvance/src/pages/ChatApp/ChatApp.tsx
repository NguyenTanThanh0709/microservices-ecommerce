import React, { useEffect, useState } from 'react';
import axiosInstance from 'src/apis/axiosClient'; 
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Notification } from 'src/constants/contant';
interface Message {
    id: string;
    customer_id: string;
    seller_id: string;
    message: string;
    created_at: Date;
    type: string;
}

const ChatApp: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const { id } = useParams();
    const { status } = useParams();
    const shopId = id ? id : '0';
    const status1 = status ? status : '0';
    console.log(status)


    const fetchMessages = async () => {
      try {
          // Example POST request
          const response = await axiosInstance.get(`/api/v1/communicate/chat/list`,{
            params: { customer_id: localStorage.getItem('phone'), seller_id: shopId }
        });
        setMessages(response.data);
        console.log(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  const fetchMessages1 = async () => {
    try {
        // Example POST request
        const response = await axiosInstance.get(`/api/v1/communicate/chat/list`,{
          params: { customer_id: shopId , seller_id: localStorage.getItem('id') }
      });
      setMessages(response.data);
      console.log(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    };

  useEffect(() => {
    if(status1 == 'seller'){
        fetchMessages1()
    }else{
        fetchMessages()
    }
  },[])



  const SellerSend = async () =>{

    try {
        // Example POST request
        const response = await axiosInstance.post(`/api/v1/communicate/chat/send`, {
            customer_id: shopId,
            seller_id:  localStorage.getItem('id'),
            message: newMessage,
            type: 'seller'
        });

        if(response){
          if(status1 == 'seller'){
              const phone = localStorage.getItem('id');
              const data: Notification = {
                  description: "Bạn có tin nhắn! Click để xem chi tiết",
                  seller: phone ? parseInt(phone) : 0,
                  customer: shopId,
                  type: 'TIN NHẮN',
                  id_type: phone ?phone : '0',
                  date: new Date(),
              };
              console.log(data)
              fetchAddThongBao(data);
              handleClickaddUser(data)     
          }
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }

    if(status1 == 'seller'){
      fetchMessages1()
  }
  }

  const CustomerrSend = async () =>{
    try {
        // Example POST request
        const response = await axiosInstance.post(`/api/v1/communicate/chat/send`, {
            customer_id: localStorage.getItem('phone'),
            seller_id:   shopId,
            message: newMessage,
            type: 'customer'
        });

        if(response){
          if(status1 == 'customer'){
              const phone = localStorage.getItem('phone');
              const data: Notification = {
                  description: "Bạn có tin nhắn! Click để xem chi tiết",
                  seller: parseInt(shopId),
                  customer: phone ? phone : '0',
                  type: 'TIN NHẮN',
                  id_type: phone ?phone : '0',
                  date: new Date(),
              };
              console.log(data)
              fetchAddThongBao(data);
              handleClickaddUser1(data)     
          }
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }

    if(status1 == 'customer'){
      fetchMessages()
  }
  }


    const sendMessage = async () => {
      if(status1 == 'seller'){
        SellerSend();
      }else{
        CustomerrSend();
      }
      setNewMessage('')
    };

    const [socket, setSocket] = useState<Socket | null>(null);
    useEffect(() => {
      setSocket(io("ws://localhost:8900"));
    }, []);


    useEffect(() => {
        if (socket) {

      
          socket.on('thongbaochocustomeremit', (data) => {
            let phone = localStorage.getItem('phone');
            if(phone == data.customer) {
                fetchMessages()
            }
          });
      
          socket.on('thongbaochoselleremit', (data) => {
            let phone = localStorage.getItem('id');
            if(phone == data.seller) {
                fetchMessages1()
            }
          });
      
      
        }
      
        return () => {
          if (socket) {

            socket.off('thongbaochoseller');
            socket.off('thongbaochocustomeremit');
          }
        };
      }, [socket]);
    const fetchAddThongBao = async ( thongbao: Notification) => {
        try {
          const response = await axiosInstance.post('/api/v1/communicate/noti/', thongbao);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const handleClickaddUser = (message: Notification) => {
        if(socket){
          socket.emit("thongbaochocustomer", message);
        }
      }

      const handleClickaddUser1 = (message: Notification) => {
        if(socket){
          socket.emit("thongbaochoseller", message);
        }
      }


    return (
        <div className="container mx-auto mt-8">
            <div className="flex flex-col h-96 overflow-auto">
            {messages.map((msg, index) => (
                <div
                key={index}
                className={`p-2 rounded-lg ${
                    msg.type == status1  ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'
                }`}
            >
                {msg.message}
            </div>
))}



            </div>
            <div className="mt-4 flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 rounded-l-lg border"
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
            </div>
        </div>
    );
};

export default ChatApp;

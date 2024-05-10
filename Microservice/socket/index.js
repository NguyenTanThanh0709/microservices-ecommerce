const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
   
  
    socket.on("notireceive", (message) => {
      console.log(message)
      io.emit("notipush", message); 
    });

    socket.on("thongbaochocustomer", (message) => {
      console.log(message)
      io.emit("thongbaochocustomeremit", message); 
    });

    socket.on("thongbaochoseller", (message) => {
      console.log(message)
      io.emit("thongbaochoselleremit", message); 
    });
  });
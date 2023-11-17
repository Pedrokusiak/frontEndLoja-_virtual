// import React, { useEffect, useState } from 'react';

// const WebSocketComponent = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Estabelece a conexão WebSocket
//     const socket = new WebSocket('ws://localhost:8080/ws');

//     // Evento chamado quando uma mensagem é recebida
//     socket.onmessage = (event) => {
//       const newMessage = JSON.parse(event.data);
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     };

//     // Limpeza ao desmontar o componente
//     return () => {
//       socket.close();
//     };
//   }, []);

//   return (
//     <div>
//       <h2>WebSocket Messages:</h2>
//       <ul>
//         {messages.map((message, index) => (
//           <li key={index}>{message.content}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default WebSocketComponent;

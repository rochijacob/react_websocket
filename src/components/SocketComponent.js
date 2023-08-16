import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function SocketComponent() {
    const [messages, setMessages] = useState([]);
    const socket = io('http://192.168.1.184:5001', {
        transports: ['websocket'],
        cors: {
            origin: "http://localhost:3000/",
          },
    });

    useEffect(() => {
        socket.on("connect", (data) => {
            console.log(data);
          });
        
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h2>Messages from React Native:</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
}

export default SocketComponent;
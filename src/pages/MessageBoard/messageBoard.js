import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {  ref, push, serverTimestamp, onValue } from 'firebase/database';
import { database, auth } from '../data/firebase';
import messagesData from './messages.json';
import './messageBoar.css'
import { collection, getDocs } from "firebase/firestore"; 

const querySnapshot = await getDocs(collection(database, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});


const MessageList = ({ messages }) => {
  const { matchId } = useParams();
  const matchMessages = messages[matchId];

  if (!auth.currentUser) {
    return <p>Please sign in to view the messages.</p>;
  }

  if (!matchMessages) {
    return <p>No messages available for this match.</p>;
  }

  return (
    <div className="message-list">
      {Object.values(matchMessages).map((message, index) => (
        <div key={index} className="message">
          <p className="author">{message.author}</p>
          <p className="text">{message.text}</p>
          <p className="timestamp">{message.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

const ChatScreen = () => {
  const [newMessage, setNewMessage] = useState("");
  const messageRef = ref(database, 'messages');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;
  
    await push(messageRef, {
      text: newMessage,
      timestamp: serverTimestamp(),
      author: auth.currentUser.email,
    });
  
    setNewMessage('');
  }; 
  
      useEffect(() => {
        const unsubscribe = onValue(messageRef, (snapshot) => {
          const data = snapshot.val();
          // Process the received data
        });
      
        return () => {
          unsubscribe();
        };
      }, []);

  return (
    <div>
      <MessageList messages={messagesData.messages} />
      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-message-input"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatScreen;



/* use effect  
  const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // User is not signed in, display a message or redirect to the sign-in page
        console.log("User is not signed in");
      } 
      
      import { collection, getDocs } from "firebase/firestore"; 

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});

      */
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { database, auth } from '../../firebase';
import './messageBoard.css';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { getDocs, query, orderBy } from 'firebase/firestore';
import { Image } from 'react-bootstrap';

const ChatScreen = () => {
  const [newMessage, setNewMessage] = useState('');
  const { matchId } = useParams();
  const messageRef = collection(database, `NorthsideMessageBoard/messages/${matchId}`);
  const [messagesData, setMessagesData] = useState([]);
  const messagesContainerRef = useRef(null);
  console.log(messagesData)
  let idNumber = matchId.split('_')
    let matchName= `Match #${idNumber[1]}`;

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollToBottom = messagesContainerRef.current.scrollHeight;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    console.log('Adding new message:', newMessage);

    try {
      const docRef = await addDoc(messageRef, {
        text: newMessage,
        timeStamp: serverTimestamp(),
        author: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid
      });

      console.log('Message added with ID:', docRef.id);

      setNewMessage('');
      fetchMatchMessages();
      scrollToBottom();
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  const fetchMatchMessages = async () => {
    try {
      const q = query(messageRef, orderBy('timeStamp', 'asc'));

      const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map((doc) => doc.data());
      setMessagesData(messages);
    } catch (error) {
      console.error('Error fetching match messages:', error);
    }
  };

  useEffect(() => {
    fetchMatchMessages();
    scrollToBottom();
  }, []);




  return (
    <div className='card'>
     
        <Card.Header>{matchName}</Card.Header>
        {auth.currentUser ? (
        messagesData.length > 0 ? (
          <div className="messages-container card-body" ref={messagesContainerRef}>
            <MessageBoard messagesData={messagesData} />
          </div>
        ) : (
          <div className="messageNoMessages">
            <p className="text-center">There aren't any messages here yet...</p>
          </div>
        )
      ) : (
        <div className="messageNoMessages">
          <p className="text-center">Please sign in to view messages</p>
        </div>
      )}
      

      <form className="new-message-form card-footer" onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-message-input"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className='sendButton'><FontAwesomeIcon icon={faPaperPlane} /></button>
      </form>
    </div>
  );
};

export default ChatScreen;

const MessageBoard = ({ messagesData }) => {
  const authUserUid = auth.currentUser.uid; // Assuming you have the current user's UID

  return (
    <div className="message-board">
      {messagesData.map((message, index) => {
        const userImg = message.photoURL || 'https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png';
        const isAuthUserMessage = message.uid === authUserUid; // Check if message belongs to the current user
        const messageClass = isAuthUserMessage ? 'auth-user-message' : 'other-user-message';
        const timeStamp = message.timeStamp?.toDate();
        const formattedDate = timeStamp?.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        });
        const formattedTime = timeStamp?.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
        });
        return (
          <div key={index} className={`message ${messageClass}`}>
            <div className='userInfo'>
              <Image src={userImg} roundedCircle className='userImg' />
              <p className="author">{message.author}</p>
            </div>
            <p className="text">{message.text}</p>
            <p className="timestamp">{formattedDate} - {formattedTime}</p>
          </div>
        );
      })}
    </div>
  );
};



/*  

 import React, { useState, useEffect, useRef } from 'react';

const ChatScreen = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messagesData, setMessagesData] = useState([]);

  // Ref for the messages container element
  const messagesContainerRef = useRef(null);

  // Scroll to bottom of messages container
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    // Add your logic to handle new message submission here

    setNewMessage('');
    scrollToBottom();
  };

  useEffect(() => {
    // Fetch and update messages data

    scrollToBottom();
  }, []);

  return (
    <>
      <div className="messages-container" ref={messagesContainerRef}>
        {messagesData.slice(-15).map((message, index) => (
          // Render individual messages
        ))}
      </div>

      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-message-input"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="sendButton">
          Send
        </button>
      </form>
    </>
  );
};

export default ChatScreen;
 
 
 few questions  and reminders 
 add the match title to the chat page
 stick the new message input at the bottom of the page
 is not working in the phone as it is in the computer, idk why
 im not being able to open certain things and the user doesnt get authenticated properly????
 create storage with firebase and add photos to the photo galery, get bootstrap css examples 


 
  */
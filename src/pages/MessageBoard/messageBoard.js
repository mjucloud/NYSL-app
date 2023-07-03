import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { database, auth } from '../data/firebase';
import './messageBoard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { getDocs, query, orderBy } from 'firebase/firestore';
import { Image } from 'react-bootstrap';

const ChatScreen = () => {
  const [newMessage, setNewMessage] = useState('');
  const { matchId } = useParams();
  const messageRef = collection(database, `NorthsideMessageBoard/messages/${matchId}`);
  const [messagesData, setMessagesData] = useState([]);


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
      });

      console.log('Message added with ID:', docRef.id);

      setNewMessage('');
      fetchMatchMessages();
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  const fetchMatchMessages = async () => {
    try {
      const messageRef = collection(database, 'NorthsideMessageBoard/messages', matchId);
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
  }, []);

  console.log(messagesData)



  return (
    <>
      <MessageBoard matchId={matchId} messagesData={messagesData} />


      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-message-input"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className='sendButton'><FontAwesomeIcon icon={faPaperPlane} /></button>
      </form>
    </>
  );
};

export default ChatScreen;

const MessageBoard = ({ messagesData }) => {


  return (
    <div className="message-board">
      {messagesData.map((message, index) => {
       const userImg = message.photoURL || 'https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png';
        return (
          <div key={index} className="message">
            <div className='userInfo'>
              <Image src={userImg} roundedCircle className='userImg' />
              <p className="author">{message.author}</p>
            </div>
            <p className="text">{message.text}</p>
            <p className="timestamp">{message.timeStamp?.toDate()?.toString()}</p>
          </div>
        )
      })}
    </div>
  );
};


/*  
  );
};
<img src="https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png" alt="Avatar - Unknown Dp@pngkey.com">

use effect  
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

      {userLoggedIn ? (
        <form className="new-message-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="new-message-input"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
         <button type="submit" className='sendButton'><FontAwesomeIcon icon={faPaperPlane} /></button>
        </form>
      ) : (
        <div className="login-message">
          <p>Please sign in to post a message.</p>
          <Link to="/signin">Sign In</Link>
        </div>
      )}
    </div>

useEffect(() => {
    const fetchMessages = async () => {
      const matchCollectionRef = collection(database, 'NorthsideMessageBoard/messages/match_1');
      const matchQuerySnapshot = await getDocs(matchCollectionRef);
      
      matchQuerySnapshot.forEach(async (matchDoc) => {
        const message1DocRef = doc(database, matchDoc.ref.path, 'message_1');
        const message2DocRef = doc(database, matchDoc.ref.path, 'message_2');
        
        const message1DocSnapshot = await getDoc(message1DocRef);
        const message2DocSnapshot = await getDoc(message2DocRef);
        
        console.log(`Message 1: ${message1DocSnapshot.data().text}`);
        console.log(`Message 2: ${message2DocSnapshot.data().text}`);
      });
    };

    fetchMessages();
  }, []);


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

const fetchMessages = async () => {
  const match1CollectionRef = collection(database, 'NorthsideMessageBoard', 'messages', 'match_1');
  const message1DocRef = doc(match1CollectionRef, 'message_1');
  const message2DocRef = doc(match1CollectionRef, 'message_2');

  const message1DocSnapshot = await getDoc(message1DocRef);
  const message2DocSnapshot = await getDoc(message2DocRef);

  const matchMessages = {
    message_1: message1DocSnapshot.data(),
    message_2: message2DocSnapshot.data(),
  };

  return (
    <div className="message-list">
      {Object.values(matchMessages).map((message, index) => (
        <div key={index} className="message">
          <p className="author">{message.author}</p>
          <p className="text">{message.text}</p>
          <p className="timestamp">{message.timeStamp.toDate().toString()}</p>
        </div>
      ))}
    </div>
  );
};
  


  const messageBoardRef = useRef(null);

  useEffect(() => {
    if (messageBoardRef.current) {
      messageBoardRef.current.scrollTop = messageBoardRef.current.scrollHeight;
    }
  }, [messagesData]);
  
  */
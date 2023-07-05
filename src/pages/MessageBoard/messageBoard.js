import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { database, auth } from '../../firebase';
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
  const matchTitle = matchId
 
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

 
 
 
 few questions  and reminders 
 add the match title to the chat page
 stick the new message input at the bottom of the page
 is not working in the phone as it is in the computer, idk why
 im not being able to open certain things and the user doesnt get authenticated properly????
 create storage with firebase and add photos to the photo galery, get bootstrap css examples 


 
  */
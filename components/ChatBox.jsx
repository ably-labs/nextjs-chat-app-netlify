import React, { useEffect, useState, useRef } from 'react';
import { useMessages } from '@ably/chat/react';
import styles from './ChatBox.module.css';

export default function ChatBox() {
  const inputBox = useRef(null);
  const messageEndRef = useRef(null);

  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [reactions, setReactions] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const { send: sendMessage } = useMessages({
    listener: (payload) => {
      const newMessage = payload.message;
      setMessages((prevMessages) => {
        // Skip duplicates
        if (prevMessages.some((existingMessage) => existingMessage.isSameAs(newMessage))) {
          return prevMessages;
        }

        // Find insertion index based on message ordering
        const index = prevMessages.findIndex((existingMessage) => existingMessage.after(newMessage));

        const newMessages = [...prevMessages];
        if (index === -1) {
          newMessages.push(newMessage);
        } else {
          newMessages.splice(index, 0, newMessage);
        }
        return newMessages;
      });
    },
  });

  const sendChatMessage = async (text) => {
    if (!sendMessage) {
      // hook isn’t ready yet
      return;
    }
    try {
      // send via Ably Chat SDK
      await sendMessage({ text });
      // clear out the textarea and restore focus
      setMessageText('');
      inputBox.current?.focus();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event) => {
    // only send on plain Enter (not Shift+Enter)
    if (event.key !== 'Enter' || event.shiftKey) {
      return;
    }
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const messageElements = messages.map((message, index) => {
    const key = message.serial ?? index;
    return (
      <span key={key} className={styles.message}>
        {message.text}
      </span>
    );
  });

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.chatHolder}>
      <div className={styles.chatText}>
        {messageElements}
        <div ref={messageEndRef}></div>
      </div>
      <form onSubmit={handleFormSubmission} className={styles.form}>
        <textarea
          ref={inputBox}
          value={messageText}
          placeholder={'Type a message...'}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.textarea}
        ></textarea>
        <button type="submit" className={styles.button} disabled={messageTextIsEmpty}>
          Send
        </button>
      </form>
    </div>
  );
}

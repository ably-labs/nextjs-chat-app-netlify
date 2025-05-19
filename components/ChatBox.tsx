'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useMessages } from '@ably/chat/react';
import { Message } from '@ably/chat';
import styles from './ChatBox.module.css';
// Define a simplified Message interface based on how it's used in the component

export default function ChatBox() {
  const inputBox = useRef<HTMLTextAreaElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const [messageText, setMessageText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const { send: sendMessage } = useMessages({
    listener: (event) => {
      const newMessage = event.message;
      setMessages((prevMessages) => {
        if (prevMessages.some((existingMessage) => existingMessage.isSameAs(newMessage))) {
          return prevMessages;
        }

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

  const sendChatMessage = async (text: string) => {
    try {
      await sendMessage({ text: text });
      setMessageText('');
      inputBox.current?.focus();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
          onKeyDown={handleKeyPress}
          className={styles.textarea}
        ></textarea>
        <button type="submit" className={styles.button} disabled={messageTextIsEmpty}>
          Send
        </button>
      </form>
    </div>
  );
}

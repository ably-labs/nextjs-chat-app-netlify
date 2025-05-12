'use client';

import * as Ably from 'ably';
import { ChatClient, AllFeaturesEnabled } from '@ably/chat';
import { ChatClientProvider, ChatRoomProvider } from '@ably/chat/react';
import ChatBox from './ChatBox.jsx';

const roomOptions = {
  history: { limit: 50 },
  reactions: {},
};

export default function Chat() {
  const realtimeClient = new Ably.Realtime({ authUrl: 'http://localhost:8888/.netlify/functions/auth' }); // make sure this matches your localhost server
  const chatClient = new ChatClient(realtimeClient);

  return (
    <ChatClientProvider client={chatClient}>
      <ChatRoomProvider id="chat-demo" options={roomOptions}>
        <ChatBox />
      </ChatRoomProvider>
    </ChatClientProvider>
  );
}

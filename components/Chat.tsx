'use client';

import * as Ably from 'ably';
import { ChatClient } from '@ably/chat';
import { ChatClientProvider, ChatRoomProvider } from '@ably/chat/react';
import ChatBox from './ChatBox';
import React, { useEffect, useState } from 'react';

export default function Chat() {
  const [chatClient, setChatClient] = useState<ChatClient | null>(null);

  useEffect(() => {
    const clientId = `ably-chat-demo-user-${Math.random().toString(36).substring(2, 10)}`;
    const realtimeClient = new Ably.Realtime({ authUrl: `/api/auth?clientId=${clientId}`, clientId });
    const ablyChatClient = new ChatClient(realtimeClient);

    setChatClient(ablyChatClient);
    return () => {
      realtimeClient.close();
    };
  }, []);

  if (!chatClient) {
    return <div>Loading...</div>;
  }

  return (
    <ChatClientProvider client={chatClient}>
      <ChatRoomProvider id="chat-demo">
        <ChatBox />
      </ChatRoomProvider>
    </ChatClientProvider>
  );
}

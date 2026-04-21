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
    const realtimeClient = new Ably.Realtime({
      authCallback: async (_tokenParams, callback) => {
        try {
          const response = await fetch(`/api/auth?clientId=${clientId}`);
          const token = await response.text();
          callback(null, token);
        } catch (error) {
          callback(error as Ably.ErrorInfo, null);
        }
      },
      clientId,
    });
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
      <ChatRoomProvider name="chat-demo">
        <ChatBox />
      </ChatRoomProvider>
    </ChatClientProvider>
  );
}

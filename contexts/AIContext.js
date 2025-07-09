import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

const AIContext = createContext();

/**
 * Provides conversation memory, sending messages and receiving AI responses.
 */
export function AIProvider({ children }) {
  const { user } = useUser();
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // Initialize or resume a conversation for this user
      fetch('/api/conversations', { method: 'POST' })
        .then((res) => res.json())
        .then((data) => {
          setConversationId(data.id);
          setMessages(data.messages || []);
        });
    }
  }, [user]);

  const sendMessage = async (content) => {
    if (!conversationId) return;
    setLoading(true);
    const res = await fetch(`/api/conversations/${conversationId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'user', content }),
    });
    const data = await res.json();
    setMessages(data.messages);
    setLoading(false);
    return data;
  };

  return (
    <AIContext.Provider value={{ conversationId, messages, loading, sendMessage }}>
      {children}
    </AIContext.Provider>
  );
}

/**
 * Hook to access AI context.
 */
export function useAI() {
  return useContext(AIContext);
}

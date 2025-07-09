import React from 'react';

/**
 * Shows a simple typing indicator (e.g., dots animation) when AI is processing.
 */
export default function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1">
      <span className="h-2 w-2 rounded-full bg-gray-500 animate-ping" />
      <span className="h-2 w-2 rounded-full bg-gray-500 animate-ping delay-200" />
      <span className="h-2 w-2 rounded-full bg-gray-500 animate-ping delay-400" />
    </div>
  );
}

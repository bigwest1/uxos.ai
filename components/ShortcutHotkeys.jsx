import { useEffect } from 'react';

/**
 * Global shortcut listener: Ctrl+Enter to send, Ctrl+L to clear.
 */
export default function ShortcutHotkeys({ onSend, onClear }) {
  useEffect(() => {
    function handler(e) {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        onSend();
      }
      if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
        e.preventDefault();
        onClear();
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSend, onClear]);
  return null;
}

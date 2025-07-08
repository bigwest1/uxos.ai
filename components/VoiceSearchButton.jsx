// Button that starts voice recognition using the Web Speech API
import React, { useState, useEffect } from 'react';

export default function VoiceSearchButton({ onResult }) {
  const [listening, setListening] = useState(false);
  let recognition;

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setListening(false);
      };
      recognition.onend = () => setListening(false);
    }
  }, [onResult]);

  const startListening = () => {
    if (recognition) {
      setListening(true);
      recognition.start();
    }
  };

  return (
    <button
      type="button"
      className="voice-btn"
      onClick={startListening}
      aria-pressed={listening}
      aria-label="Start voice search"
    >
      🎙
    </button>
  );
}

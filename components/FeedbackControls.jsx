import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

/**
 * Render inline feedback buttons for each AI response.
 */
export default function FeedbackControls({ onFeedback }) {
  return (
    <div className="flex space-x-4 mt-2">
      <button
        aria-label="Helpful"
        onClick={() => onFeedback('up')}
        className="text-green-400 hover:text-green-600"
      >
        <FontAwesomeIcon icon={faThumbsUp} />
      </button>
      <button
        aria-label="Not helpful"
        onClick={() => onFeedback('down')}
        className="text-red-400 hover:text-red-600"
      >
        <FontAwesomeIcon icon={faThumbsDown} />
      </button>
    </div>
  );
}

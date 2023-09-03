import { InputField } from '@/components/form/input-field';
import React, { useState } from 'react';

export type Props = {
  note: string;
  onSave: (note: string) => void;
};

export const BookmarkNote: React.FC<Props> = ({ note, onSave }) => {
  const [currentNote, setCurrentNote] = useState(note);

  return (
    <div>
      <textarea
        value={currentNote}
        onChange={(e) => setCurrentNote(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <button
        onClick={() => onSave(currentNote)}
        className="mt-2 p-2 bg-green-500 text-white"
      >
        Save Note
      </button>
    </div>
  );
};

import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const toggleComplete = async () => {
    try {
      await updateDoc(doc(db, 'todos', todo.id), {
        completed: !todo.completed
      });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async () => {
    try {
      await deleteDoc(doc(db, 'todos', todo.id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const saveEdit = async () => {
    try {
      await updateDoc(doc(db, 'todos', todo.id), {
        text: newText
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <li className="flex justify-between items-center mb-2">
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="bg-base-300 border-none p-2 rounded-sm w-full"
        />
      ) : (
        <span
          onClick={toggleComplete}
          className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
        >
          {todo.text}
        </span>
      )}
      <div className="flex gap-2">
        {isEditing ? (
          <button onClick={saveEdit} className="bg-primary text-primary-content p-2 rounded-sm">Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-secondary text-primary-content p-2 rounded-sm">Edit</button>
        )}
        <button onClick={deleteTodo} className="bg-error text-primary-content p-2 rounded-sm">Delete</button>
      </div>
    </li>
  );
}

export default TodoItem;
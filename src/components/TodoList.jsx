import React, { useState, useEffect, useContext } from 'react';
import { collection, addDoc, deleteDoc, updateDoc, doc, onSnapshot, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import AppContext from '../context/AppContext';
import TodoItem from './TodoItem';

function TodoList() {
  const { user } = useContext(AppContext);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'todos'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTodos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(fetchedTodos);
    });

    return () => unsubscribe();
  }, [user]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await addDoc(collection(db, 'todos'), {
        text: newTodo,
        completed: false,
        userId: user.uid,
        createdAt: serverTimestamp()
      });
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">Todo List</h2>
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="bg-base-300 border-none p-2 rounded-sm w-full"
          placeholder="New Todo"
        />
        <button type="submit" className="bg-primary text-primary-content p-2 rounded-sm">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
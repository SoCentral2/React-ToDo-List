/* eslint-disable react/jsx-key */
import { useState } from 'react';
import './styles.css';



export default function App() {
  // NB: the first array entry of a useState object (newItem here) cannot be directly changed, the second entry (setNewItem here) must be used.
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault() //This will prevent the page refreshing
  
    setTodos(currentTodos => {
      return [
        // ... is a Spread Operator - When used in an array or object literal, it creates a new array or object using an existing one. (ALso: Rest Operator: When used in a function’s argument list, it bundles up ‘the rest’ of the arguments into an array.)
        ...currentTodos, { 
          id: crypto.randomUUID(), 
          title: newItem, 
          completed: false
        }
      ]
    })
    setNewItem("")
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo;
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className='form-row'>
          <label htmlFor='item'>New Item</label>
          <input 
            value={newItem} 
            //without the onChange below, the value of newItem will always be what was initially set in useState() so the input box won't show anything!
            onChange={e => setNewItem(e.target.value)}
            type='text' 
            id='item' />
        </div>
        <button className='btn'>Add</button>
      </form>
      <h1 className='header'>Todo List</h1>
      <ul className='list'> 
        {todos.length === 0 && "No Todos"}
        {todos.map(todo => {
          return (
            <li key={todo.id}>
            <label>
              <input type='checkbox' 
                onChange={e => toggleTodo(todo.id, e.target.checked)}/>
                {todo.title}
            </label>
            <button onClick={() => deleteTodo(todo.id)} className='btn btn-danger'>Delete</button>
          </li>
          )
        })}
      </ul>   
        
          
    </>
  )
}

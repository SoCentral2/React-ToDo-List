/* eslint-disable react/prop-types */
import { useState } from 'react';

export function NewTodoForm(props) {
    props.onSubmit;
    const [newItem, setNewItem] = useState("");

    function handleSubmit(e) {
        e.preventDefault() //This will prevent the page refreshing
        if (newItem === "") return       
        props.onSubmit(newItem)
        setNewItem("")
      }

    return (
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
    )
}
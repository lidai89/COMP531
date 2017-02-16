import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ToDoItem from './todoItem'

export const AddTodo = ({ addTodo }) => {
    let newTODO;
    
    const _addTodo = () => {
        if (newTODO && newTODO.value) {
            addTodo(newTODO.value)
            newTODO.value = ''
        }
    }

    return (<span>
        <input type="text" placeholder="To Do" ref={ (node) => newTODO = node } />
        <button onClick={_addTodo}>Add Item</button>
    </span>)
}

export const ToDos = ({ todoItems, addTodo }) => (
    <div>
        <AddTodo addTodo={addTodo} />
        <span className="submit">
            <a href="https://webdev-rice.herokuapp.com" target="_blank">
            Submit your exercise</a>
        </span>
        <ul className="todo">
            {todoItems.map(({text, id, done}) => (
                <ToDoItem key={id} id={id} text={text} done={done} />
            ))}
        </ul>
    </div>
)

ToDos.propTypes = {
    todoItems: PropTypes.arrayOf(PropTypes.shape({
        ...ToDoItem.propTypes
    }).isRequired).isRequired,
    addTodo: PropTypes.func.isRequired
}

export default connect(
    (state) => {
        return {
            todoItems: state.todoItems
        }
    }, 
    (dispatch) => {
        return {
            addTodo: (text) => dispatch({ type: 'ADD_TODO', text })
        }
    }
)(ToDos)

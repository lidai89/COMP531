import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ToDoItem from './todoItem'
import { filterTodos, actions } from './filterTodos'
import Link from './filterLink'

export const AddTodo = ({ addTodo }) => {
    let newTODO;

    const _addTodo = () => {
        if (newTODO && newTODO.value) {
            addTodo(newTODO.value)
            newTODO.value = ''
        }
    }

    return (<span>
        <input name="inputAddTodo" type="text" placeholder="To Do" ref={(node) => newTODO = node} />
        <button name="btnAddTodo" onClick={_addTodo}>Add Item</button>
    </span>)
}

export const ToDos = ({ todoItems, addTodo }) => (
    <div>
        <AddTodo addTodo={addTodo} />
        {"  "} Show: {" "}
        <Link filter={actions.SHOW_ALL}>all</Link>
        {" | "}
        <Link filter={actions.SHOW_ACTIVE}>active</Link>
        {" | "}
        <Link filter={actions.SHOW_COMPLETED}>completed</Link>
        {" | "}
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
            todoItems: filterTodos(state.todoItems, state.visibilityFilter)
        }
    },
    (dispatch) => {
        return {
            addTodo: (text) => dispatch({ type: 'ADD_TODO', text })
        }
    }
)(ToDos)

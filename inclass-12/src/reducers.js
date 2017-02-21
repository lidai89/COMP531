const initialItems = require('./initialState.json')

// todoItems: [
//     {id: 0, text: "This is an item", done: false},
//     {id: 1, text: "Another item", done: false}
// ],

const Reducer = (state = {
    nextId: 2,
    todoItems: initialItems.todoItems,
    visibilityFilter: 'SHOW_ALL'
}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state, nextId: state.nextId + 1,
                todoItems: [...state.todoItems,
                { id: state.nextId, text: action.text, done: false }]
            }
        case 'REMOVE_TODO':
            return {
                ...state,
                todoItems: state.todoItems.filter(({id}) => id != action.id)
            }
        case 'TOGGLE_TODO':
            return {
                ...state,
                todoItems: state.todoItems.map(({ id, text, done }) => (
                    { id, text, done: action.id === id ? !done : done }
                ))
            }
        case 'SET_VISIBILITY_FILTER':
            return { ...state, visibilityFilter: action.filter }
        default:
            return state
    }
}

export default Reducer
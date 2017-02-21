
export const actions = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const filterTodos = (todos, filter) => {
    switch (filter) {
        case actions.SHOW_COMPLETED:
            return todos.filter(todo => todo.done)
        case actions.SHOW_ACTIVE:
            return todos.filter(todo => !todo.done)
        case actions.SHOW_ALL:
        default:
            return todos
    }
}

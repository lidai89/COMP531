import { expect } from 'chai'
import { filterTodos, actions } from './filterTodos'

describe('Validate FilterTodos', () => {

    it('should filter the list of toods', () => {
        const todos = [
            { id: 0, text: "This is an item", done: false },
            { id: 1, text: "Another item", done: true }
        ]
        const all = filterTodos(todos, actions.SHOW_ALL)
        const completed = filterTodos(todos, actions.SHOW_COMPLETED)
        const active = filterTodos(todos, actions.SHOW_ACTIVE)

        expect(all.length).to.equal(2)
        expect(completed.length).to.equal(1)
        expect(active.length).to.equal(1)

        expect(all[0].id).to.equal(0)
        expect(all[1].id).to.equal(1)
        expect(completed[0].id).to.equal(1)
        expect(active[0].id).to.equal(0)
    })

})

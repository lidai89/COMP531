import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { shallow } from 'enzyme';
import { expect } from 'chai'

import { ToDos, AddTodo } from './todos'

const findByName = (children, name) => {
    const result = Array.prototype.filter.call(children, it => it.name === name)
    return result.length ? result[0] : null
}

describe('Validate ToDos', () => {

    it('should display ToDos', () => {
        const todos = [
            { id: 1, text: 'hi', done: false },
            { id: 2, text: 'hello', done: true }
        ]
        const node = shallow(<ToDos todoItems={todos} addTodo={_ => _} />)
        expect(node.children()).to.have.length(10)
        expect(node.find('ul').children()).to.have.length(2)
    })

    it('should add a new ToDo', () => {
        let added = false
        // This is similar to a "spy"
        // We'll check to make sure the addTodo() function is called.
        const addTodo = TestUtils.renderIntoDocument(<div>
            <AddTodo addTodo={() => { added = true }} />
        </div>).children[0]

        expect(addTodo.children).to.have.length(2)

        const input = findByName(addTodo.children, 'inputAddTodo')
        expect(input.type).to.equal('text')
        expect(input.value).to.equal('')
        input.value = 'foobar' // update the text in the input
        TestUtils.Simulate.change(input)

        const button = findByName(addTodo.children, 'btnAddTodo')
        expect(added).to.be.false
        TestUtils.Simulate.click(button)
        expect(added).to.be.true

        // check to make sure it doesn't execute with no text
        added = false
        input.value = ''
        TestUtils.Simulate.change(input)

        expect(added).to.be.false
        TestUtils.Simulate.click(button)
        expect(added).to.be.false
    })

})

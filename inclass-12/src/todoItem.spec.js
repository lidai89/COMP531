import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}

describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        const node=TestUtils.renderIntoDocument(<div>
            <ToDoItem text='test text' id={1} done={false} toggle={_=>_} remove={_=>_}/>
        </div>);
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert the innerHTML of the todo is the text you initially set
        

        const element=findDOMNode(node).children[0];
        //console.log(element.chilren);
        expect(element.children.length).to.equal(3);
        expect(element.children[1].innerHTML).to.equal('test text');

    })

    it('should display a single ToDo with no classname', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert there is no child with classname 'completed'
        const node=TestUtils.renderIntoDocument(<div>
            <ToDoItem text='test text' id={1} done={false} toggle={_=>_} remove={_=>_}/>
        </div>);
        const element=findDOMNode(node).children[0];
        //console.log(element.chilren);
        expect(element.children.length).to.equal(3);
        expect(element.children[1].className).to.equal('');
    })

    it('should toggle completed when clicked', () => {
        let toggled = false
        const node=TestUtils.renderIntoDocument(<div>
            <ToDoItem text='test text' id={1} done={false} toggle={()=>{toggled=!toggled}} remove={_=>_}/>
        </div>);
        const element=findDOMNode(node).children[0];
        TestUtils.Simulate.click(element.children[0]);
        expect(toggled).to.be.true;
        // use TestUtils.renderIntoDocument
        // when the checkbox is clicked via TestUtils.Simulate.click()
        // we expect the variable toggled to be true
    })

    it('should remove an item when clicked', () => {
        let removed = false
        const node=TestUtils.renderIntoDocument(<div>
            <ToDoItem text='test text' id={1} done={false} 
            toggle={_=>_}
            remove={()=>{removed=true}}/>
        </div>);
        const element=findDOMNode(node).children[0];
        TestUtils.Simulate.click(element.children[2]);
        expect(removed).to.be.true;
        // use TestUtils.renderIntoDocument
        // when the remove button is clicked via TestUtils.Simulate.click()
        // we expect the variable removed to be true
    })

    it('should display a completed ToDo', () => {
        // use TestUtils.renderIntoDocument
        // the item should have done=true
        // assert that the rendered className is "completed"
        const node=TestUtils.renderIntoDocument(<div>
            <ToDoItem text='test text' id={1} done={true} 
            toggle={_=>_}
            remove={_=>_}/>
        </div>);
        const element=findDOMNode(node).children[0];
        expect(element.children[1].className).to.equal('completed');
    })

})

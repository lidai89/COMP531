/** @jsx h */
;(function() {

'use strict'

// "global" task id counter
let _taskId = 1;

function getSpanSibling(e) {
    const children = e.target.parentElement.children
    for (let c in children) {
        if (children[c].tagName == "SPAN") {
            return children[c]
        }
    }
    return undefined
}

function toggleDone(e) {
    const el = getSpanSibling(e)
    const done = el.getAttribute('done') == 'false'
    el.setAttribute('done', done)
    el.className = done ? "completed" : ""
}

function removeTask(e) {
    const taskId = e.target.parentElement.getAttribute('id')
    const idx = listItems.findIndex(e => e.props.id === taskId)
    if (idx >= 0) listItems.splice(idx, 1)
}

function addItem(text) {
    const newTODO = document.getElementById("newTODO")
    if (newTODO) {
        text = newTODO.value
        newTODO.value = ''
    }
    if (text.length) {
        listItems.push(h("li", { id: `task${_taskId++}`}, [
            h("i", { className: "check glyphicon glyphicon-check", onClick: toggleDone }, []),
            h("span", { contentEditable: true, done: false }, typeof(text) === "string" ? text : ""),
            h("i", { className: "destroy glyphicon glyphicon-remove", onClick: removeTask }, []),
        ]))
    }
}

const listItems = [ ]

// initialize the list with two entries
addItem("This is an item")
addItem("Another item")

const view = h("div", { },
    h("input", { id: "newTODO", type: "text", placeholder: "To Do"}),
    h("button", { onClick: addItem }, "Add Item"),
    h("span", { className: "submit" }, [
        h("a", { href: "https://webdev-rice.herokuapp.com",
             target: "_blank" }, "Submit your exercise"),
    ]),
    h("ul", { className: "todo" }, listItems)
)

h.mount(document.getElementById('app'), view)

})()

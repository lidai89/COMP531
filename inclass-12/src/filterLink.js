import React from 'React'
import { connect } from 'react-redux'

const Link = ({children, active, onclick}) => (
    active ? <span>{children}</span> : <a href="#" onClick={(e) => {
        e.preventDefault()
        onclick()
    }}>{children}</a>
)

export default connect(
    (state, ownProps) => {
        return {
            active: state.visibilityFilter === ownProps.filter
        }
    },
    (dispatch, ownProps) => {
        return {
            onclick: () => dispatch({ type: 'SET_VISIBILITY_FILTER', filter: ownProps.filter })
        }
    }
)(Link)

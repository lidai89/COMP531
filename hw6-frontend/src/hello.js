import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateText,userlogin } from './actions'
import * as ReactBootstrap from 'react-bootstrap'
import Landpage from './landpage'
import ToDoItem from './todoItem'
import ArticleView from './components/Main/articleview'
import Profile from './components/Profile/profile'

export const Hello = ({ text, message,location }) => {
     let input;
    if(location=='Landing Page'){
    return(
    <div><Landpage text={text} message={message}/>
    </div>)}
    else if(location=='Main'){
    return(
        <div><ArticleView/>
        </div>
        )}
    else
    return(
        <Profile/>
    )
}


Hello.propTypes = {
    text: PropTypes.string.isRequired,
   // message: PropTypes.string.isRequired,
  //  update: PropTypes.func.isRequired,
}

export default connect(
    (state) => ({ text: state.text, location:state.location, message: state.message }),
    (dispatch) => {
        return {
            login:  ()     => dispatch(userlogin())  
        }
    }
)(Hello)


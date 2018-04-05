import React from 'react';
import { NavLink } from 'react-router-dom';
//import { NavItem } from 'reactstrap';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
    console.log(props.login);
  }

  return (<div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="text" name="name" placeholder="name"
               value={props.login.name} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password"
               value={props.login.pass} onChange={update} />
      </FormGroup>
      <Button onClick={create_token}>Log In</Button>
      <NavItem>
          <NavLink to="/user-form" exact={true} activeClassName="active" className="nav-link">New User</NavLink>
      </NavItem>
    </Form>
</div>);
});

let Session = connect(({token}) => {return {token};})((props) => {
  function destroy_token() {
    props.dispatch({type: 'CLEAR_TOKEN'})
  }
  return( <div className="navbar-text">
    User id = { props.token.user_id }
    <Form inline>
      <Button onClick={destroy_token}>Log Out</Button>
    </Form>  
</div>);
});


function Nav(props) {
  let session_info;
  if (props.token) {
    session_info = <Session token={props.token} />;
  }
  else {
    session_info = <LoginForm />
  }
  if (props.token){
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Tasker
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">View All Tasks</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={"/users/" + props.token.user_id} href="#" className="nav-link">Your Tasks and New Task</NavLink>
        </NavItem>
  
      </ul>
      <span className="navbar-text">
      { session_info }
      </span>
    </nav>
  );}
  else{
    return(
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Tasker
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">All Tasks</NavLink>
        </NavItem>
        <NavItem> 
         <span className="nav-link"> Login for more!  </span>

        </NavItem>
  
      </ul>
      <span className="navbar-text">
      { session_info }
      </span>
    </nav> );
  }
}
function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);
import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

 function UserForm(params) {
  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    console.log("updating")
    console.log(tgt)
    let action = {
      type: 'UPDATE_REG_FORM',
      data: data,
    };
    console.log(action);
    params.dispatch(action);
  }

  function submit(ev) {
    console.log("Should create task.");
    console.log(params.uform);
    api.submit_user(params.uform);
  }

  function clear(ev){
    params.dispatch({type: 'CLEAR_REG_FORM'})
  }

  
  return (<div style={{padding: "4ex"}}>
    <h2>New User</h2>
    <FormGroup>
      <Label for="name">Name</Label>
      <Input type="textarea" name="name" value={params.uform.name} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="email">Email</Label>
      <Input type="email" name="email" value={params.uform.email} onChange={update}/>
    </FormGroup>
    <FormGroup>
      <Label for="password">Password</Label>
      <Input type="password" name="password" value={params.uform.password} onChange={update}/>
    </FormGroup>
    
    <Button onClick={submit} color="primary">New User</Button> &nbsp;
    <Button onClick={clear}> Clear </Button>
</div>);
}
function state2props(state) {
  console.log("rerender", state);
  return { uform: state.uform };
}

// Export the result of a curried function call.
export default connect(state2props)(UserForm);
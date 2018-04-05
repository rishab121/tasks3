import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

 function TaskForm(params) {
  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    console.log("updating")
    console.log(tgt)
    if ((tgt).is(':checked')){
      data.task_completed = true
    } 
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    console.log(action);
    params.dispatch(action);
  }

  function submit(ev) {
    console.log("Should create task.");
    console.log(params.form);
    api.submit_task(params.form);
  }

  function clear(ev){
    params.dispatch({type: 'CLEAR_FORM'})
  }

  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={{padding: "4ex"}}>
    <h2>New Task</h2>
    <FormGroup>
      <Label for="user_assigned_id">User</Label>
      <Input type="select" name="user_assigned_id" value={params.form.user_assigned_id} onChange={update}>
        <option></option>
        { users }
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="description">Body</Label>
      <Input type="textarea" name="description" value={params.form.description} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input type="textbox" name="title" value={params.form.title} onChange={update}/>
    </FormGroup>
    <FormGroup>
      <Label for="time_taken">Time Taken</Label>
      <Input type="number" name="time_taken" step="15" min="0" value={params.form.time_taken} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="task_completed">Completed?</Label>
      <Input type="checkbox" name="task_completed" value={params.form.task_completed} onChange={update}/>
    </FormGroup>
    
    <Button onClick={submit} color="primary">New Task</Button> &nbsp;
    <Button onClick={clear}> Clear </Button>
  </div>;
}
function state2props(state) {
  console.log("rerender", state);
  return { form: state.form };
}

// Export the result of a curried function call.
export default connect(state2props)(TaskForm);
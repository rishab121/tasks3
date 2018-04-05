import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Task(params) {
  let task = params.task;
  if(task.task_completed){
     var completed = "True";
  }
  else{
     var completed = "False"
  }
  return <Card>
    <CardBody>
      <div>
        <p> Task Id : {task.id} </p>
        <p>Assigned To <b>{ task.user_assigned.name }</b></p>
        <p>Title:  { task.title }</p>
        <p>Description: { task.description }</p>
        <p>Completed? : {completed} </p>
        <p>Time Taken : {task.time_taken} </p>
        
      </div>
    </CardBody>
  </Card>;
}
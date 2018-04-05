import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import Nav from './nav';
import Task from './task';
import Users from './users';
import TaskForm from './task-form';
import Feed from './feed';
import UserForm from './user-form';
 

export default function tasker_init(store) {
   // let root = document.getElementById('root');
    ReactDOM.render(<Provider store={store}>
                      <Tasker />
                    </Provider> , document.getElementById('root'));
}

let Tasker = connect((state) => state)((props) => {
      return (
        <Router>
          <div>
            <Nav />
            <Route path="/" exact={true} render={() => 
              <div>
                <h2> All Tasks </h2>
                <Feed tasks={props.tasks} />
              </div>
            } />
            <Route path="/users" exact={true} render={() =>
              <Users users={props.users} />
            } />
            <Route path="/user-form" exact={true} render={() => 
              <div>
                <UserForm users={props.users} />
              </div>
            } />
            <Route path="/users/:user_id" render={({match}) =>
              <div>
              < br />  
              <Feed tasks={_.filter(props.tasks, (pp) =>
                match.params.user_id == pp.user_assigned.id )
              } />
              <TaskForm users={props.users} />
              </div>
            } />
            <Route path="/tasks/:task_id" render={({match}) =>
              <UpdateForm task={_.filter(props.tasks, (pp) =>
                match.params.task_id == pp.id )
              } users={props.users} />
              
            } />
          </div>
        </Router>
      );
});

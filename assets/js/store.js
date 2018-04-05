import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
 *  state layout:
 *  {
 *   tasks: [... Posts ...],
 *   users: [... Users ...],
 *   form: {
 *     user_assigned_id: null,
 *     description: "",
 *     title: "",
 *      task_completed: boolean,
 *      time_taken: integer,
 *   }
 * }
 *
 * */

function tasks(state = [], action) {
    switch (action.type) {
        case 'TASKS_LIST':
          return [...action.tasks];
        case 'ADD_TASK':
          return [action.task, ...state];
        default:
          return state;
    }
}

function users(state = [], action) {
    console.log(action.user)
    console.log("users")
    switch (action.type) {
        case 'USERS_LIST':
          return [...action.users];
        case 'ADD_USER':
            return [action.user, ...state];
        default:
          return state;
    }
}

let empty_form = {
  user_assigned_id: "",
  description: "",
  title: "",
  time_taken: "0",
  task_completed: false,
  token: "",
};

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
        return empty_form;
    case 'SET_TOKEN':
        return Object.assign({}, state, action.token);
    default:
      return state;
  }
}

let empty_uform = {
    name: "",
    email: "",
    password: "",
}

function uform(state = empty_uform, action) {
    switch (action.type) {
      case 'UPDATE_REG_FORM':
        return Object.assign({}, state, action.data);
      case 'CLEAR_REG_FORM':
          return empty_uform;
      case 'SET_TOKEN':
          return Object.assign({}, state, action.token);
      default:
        return state;
    }
  }

function token(state = null, action) {
    switch (action.type) {
      case 'SET_TOKEN':
        return action.token;
      case 'CLEAR_TOKEN':
        return ""      
      default:
        return state;
    }
}
  
let empty_login = {
    name: "",
    pass: "",
};
  
function login(state = empty_login, action) {
    switch (action.type) {
      case 'UPDATE_LOGIN_FORM':
        return Object.assign({}, state, action.data);
      case 'CLEAR_LOGIN_FORM':
        return empty_login;
      default:
        return state;
    }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({tasks, users, form, token, login, uform});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
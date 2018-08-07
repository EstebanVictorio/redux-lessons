import React from 'react';
import ReactDOM from 'react-dom';
import Reducer from "Enum/Reducer";
import QueryString from "query-string";
import Counter from "Presentational/Element/Counter";
import ToDoList from "Presentational/Element/ToDoList";
import {createStore, combineReducers} from 'redux';

let container = document.querySelector('#container');

//<editor-fold desc="Store (from scratch - currently not in use)">
/*const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = action => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());

    };

    const subscribe = listener => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };

    dispatch({});
    return {getState, dispatch, subscribe};
};*/
//</editor-fold>

//<editor-fold desc="Counter Sample">
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};


const counterRender = () => {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={() => {
                store.dispatch({type: 'INCREMENT'})
            }}
            onDecrement={() => {
                store.dispatch({type: 'DECREMENT'})
            }}
        />, container);
};
//</editor-fold>

//<editor-fold desc="ToDo List Sample" >
let todoCartRidge = 0;
const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};


const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todoRenderer = () => {
    ReactDOM.render(
        <ToDoList
            todos={store.getState().todos}
            visibilityFilter={store.getState().visibilityFilter}
            toggleToDo={(id) => {

                store.dispatch({type: 'TOGGLE_TODO', id: id});
            }
            }
            addToDo={() => {
                let text = prompt('New to-do:');
                store.dispatch({type: 'ADD_TODO', text: text, id: todoCartRidge++});
            }
            }
            changeVisibility={(filter) => store.dispatch({type: 'SET_VISIBILITY_FILTER', filter: filter})}
        />, container);
};

//</editor-fold>

//<editor-fold desc="Reducer Selector">
let getReducer = reducer => {
    switch (Number.parseInt(reducer)) {
        case Reducer.COUNTER:
            return counter;
        case Reducer.TO_DO_LIST:
            return combineReducers({todos: todos, visibilityFilter: visibilityFilter});
    }
};
//</editor-fold>

//<editor-fold desc="Renderer Selector">
let getRenderer = renderer => {
    switch (Number.parseInt(renderer)) {
        case Reducer.COUNTER:
            return counterRender;
        case Reducer.TO_DO_LIST:
            return todoRenderer;
    }
};
//</editor-fold>

//<editor-fold desc="Main - Bootstrap Section">
let queryReducer = QueryString.parse(location.search).reducer;
let selectedReducer = getReducer(queryReducer);
let selectedRenderer = getRenderer(queryReducer);

const store = createStore(selectedReducer);
store.subscribe(selectedRenderer);
selectedRenderer();
//</editor-fold>

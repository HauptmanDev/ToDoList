import React from 'react';
import './App.css';
import style from './components/AddNewItemsForm/AddNewItemForm.module.css'
import TodoList from "./components/TodoList";
import {connect} from "react-redux";
import {addTodoLists, loadTodoLists} from "./reducer";
import Header from "./components/Header/Header";

class App extends React.Component {

    state = {
        todolists: []
    };

    componentDidMount() {
        this.restoreState();
    };

    restoreState = () => {
        this.props.loadTodoLists()
    };

    addTodoList = (title) => {
        this.props.addTodoLists(title);
    };

    render = () => {
        const todolists = this.props
            .todolists
            .map(tl => <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>);

        return (
            <div className='App'>
                <div className='title'>
                    <Header addItem={this.addTodoList}/>
                </div>
                <div className='lists'>
                    {todolists}
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
};

const ConnectedApp = connect(mapStateToProps, {loadTodoLists, addTodoLists})(App);
export default ConnectedApp;


import React from 'react';
import s from './MainComponent.module.css';
import {connect} from "react-redux";
import Header from "./Header/Header";
import TodoList from "./TodolistComponents/TodoList";
import {addTodoLists, loadTodoLists} from "./bll/reducer";

class MainComponent extends React.Component {

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
            .map(tl => <div className={s.list}><TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/></div>);

        return (
            <div className={s.todolist}>
                <Header addItem={this.addTodoList}/>
                <div className={s.lists}>
                    {todolists}
                </div>
                <svg version="1.1" xmlns='http://www.w3.org/2000/svg'>
                    <filter id="blur-filter">
                        <feGaussianBlur stdDeviation='5'/>
                    </filter>
                </svg>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
};

const ConnectedApp = connect(mapStateToProps, {loadTodoLists, addTodoLists})(MainComponent);
export default ConnectedApp;


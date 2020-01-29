import React from 'react';
import s from './MainComponent.module.css';
import {connect} from "react-redux";
import TodoList from "./TodolistComponents/TodoList";
import {addTodoLists, loadTodoLists} from "./bll/reducer";
import Header from "./Header/Header";

class MainComponent extends React.Component {
    render = () => {
        const todolists = this.props
            .todolists
            .map(tl => <div className={s.list}><TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/></div>);

        return (
            <div className={s.todolist}>
                <div className={s.lists}>
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

const ConnectedMainComponent = connect(mapStateToProps, null)(MainComponent);
export default ConnectedMainComponent;


import React from 'react';
import style from './MainComponent.module.css';
import {connect} from "react-redux";
import TodoList from "./TodolistComponents/TodoList";

class MainComponent extends React.Component {
    render = () => {
        const todolists = this.props
            .todolists
            .map(tl => <div className={style.list}><TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/></div>);

        return (
            <div className={style.lists}>
                <div className='backgroundList'></div>
                    {todolists}
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


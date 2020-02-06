import React from 'react';
import './App.css';
import MainComponent from "./components/MainComponent";
import {connect} from "react-redux";
import {addTodoLists, loadTodoLists} from "./components/bll/reducer";
import Header from "./components/Header/Header";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

class App extends React.Component {
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
        return (
            <div>
                <main className='wrapper'>
                    <div className='blur'>{}</div>
                    <div className='App'>
                        <div className='HeaderPart'>
                            <div className='Title'>
                                ToDoList
                            </div>
                            <div className='Header'>
                                <Header addItem={this.addTodoList}/>
                            </div>
                        </div>
                        <div className='TasksTable'>
                            <MainComponent/>
                        </div>
                        <div className='Footer'>2020 © Все права защищены.</div>
                    </div>
                </main>
            </div>
        );
    }
}

const ConnectedApp = connect(null, {addTodoLists, loadTodoLists})(App);
export default ConnectedApp;


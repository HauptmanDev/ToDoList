import React from 'react';
import style from './TodoList.module.css'
import TodoListTasks from "./../TodoListTasks";
import TodoListFooter from "./../TodoListFooter";
import TodoListTitle from "./../TodoListTitle";
import {connect} from "react-redux";
import {
    addTasks,
    deleteTasks,
    deleteTodoLists,
    loadTasks,
    updateTasks,
    updateTodoListTitle
} from "./../../bll/reducer";
import AddNewTaskForm from "../AddNewTaskForm";


class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        // переводим объект в строку
        let stateAsString = JSON.stringify(this.state);
        // сохраняем нашу строку в localStorage под ключом "our-state"
        localStorage.setItem("our-state-" + this.props.id, stateAsString);
    };

    restoreState = () => {
        this.props.loadTasks(this.props.id)
    };

    state = {
        filterValue: "All"
    };

    addTask = (newText) => {
        this.props.createTask(newText, this.props.id)
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState();
        });
    };

    changeTask = (taskId, obj) => {
        this.props.tasks.forEach(t => {
            if (t.id === taskId) {
                this.props.updateTask(t, taskId, obj, this.props.id)
            }
        })
    };

    changeStatus = (taskId, status) => {
        this.changeTask(taskId, {status: status});
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title});
    };

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    };

    deleteTask = (taskId) => {
        this.props.deleteTask(taskId, this.props.id)
    };

    updateTitle = (title) => {
        this.props.updateTodolistTitle(title, this.props.id)
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div>
                <div className={style.list}>
                    <TodoListTitle title={this.props.title} onDelete={this.deleteTodolist}
                                   updateTitle={this.updateTitle}/>
                    <AddNewTaskForm addItem={this.addTask}/>
                    <TodoListTasks changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
                                   deleteTask={this.deleteTask}
                                   tasks={tasks.filter(t => {
                                       if (this.state.filterValue === "All") {
                                           return true;
                                       }
                                       if (this.state.filterValue === "Active") {
                                           return t.isDone === false;
                                       }
                                       if (this.state.filterValue === "Completed") {
                                           return t.isDone === true;
                                       }
                                   })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTodolistTitle: (title, todolistId) => {
            const action = updateTodoListTitle(title, todolistId);
            dispatch(action)
        },
        deleteTodolist: (todolistId) => {
            const action = deleteTodoLists(todolistId);
            dispatch(action)
        },
        loadTasks: (todolistId) => {
            const action = loadTasks(todolistId);
            dispatch(action)
        },
        createTask: (title, todolistId) => {
            const action = addTasks(title, todolistId);
            dispatch(action)
        },
        updateTask: (t, taskId, obj, todolistId) => {
            const action = updateTasks(t, taskId, obj, todolistId);
            dispatch(action)
        },
        deleteTask: (taskId, todolistId) => {
            const action = deleteTasks(taskId, todolistId);
            dispatch(action)
        }
    }
};

const ConnectedTodolist = connect(null, mapDispatchToProps)(TodoList);

export default ConnectedTodolist;


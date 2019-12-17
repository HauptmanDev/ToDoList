import {api} from "./api";

export const ADD_TODOLIST = "TodoList/Reducer/ADD-TODOLIST";
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/Reducer/DELETE-TASK";
export const UPDATE_TODOLIST_TITLE = "TodoList/Reducer/UPDATE_TODOLIST_TITLE";
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const SET_TASKS = "TodoList/Reducer/SET_TASKS";
export const UPDATE_TASK = "TodoList/Reducer/UPDATE-TASK";
export const SET_TODOLISTS = "TodoList/Reducer/SET_TODOLISTS";

const initialState = {
    "todolists": []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl;
                    } else {
                        return {...tl, tasks: action.tasks}
                    }
                })
            };
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            };
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            };
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id != action.todolistId)
            };
        case UPDATE_TODOLIST_TITLE:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id != action.todolistId) return tl;
                    else return {...tl, title: action.title}
                })
            };
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => t.id != action.taskId)
                        }
                    } else {
                        return tl
                    }
                })
            };
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })
            };
        case UPDATE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id != action.taskId) {
                                    return t;
                                } else {
                                    return {...t, ...action.obj};
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
    }
    return state;
};

export const updateTaskAC = (taskId, obj, todolistId) => {
    return {type: UPDATE_TASK, taskId, obj, todolistId};
};
export const deleteTodolistAC = (todolistId) => {
    return {
        type: DELETE_TODOLIST,
        todolistId: todolistId
    };
};
export const deleteTaskAC = (taskId, todolistId) => {
    return {
        type: DELETE_TASK,
        todolistId,
        taskId
    };
};
export const updateTodolistTitleAC = (title, todolistId) => {
    return {
        type: UPDATE_TODOLIST_TITLE,
        todolistId,
        title
    };
};
export const addTaskAC = (newTask, todolistId) => {
    return {type: ADD_TASK, newTask, todolistId};
};
export const setTasksAC = (tasks, todolistId) => {
    return {type: SET_TASKS, tasks, todolistId};
};
export const addTodolistAC = (newTodolist) => {
    return {
        type: ADD_TODOLIST,
        newTodolist: newTodolist
    }
};
export const setTodolistsAC = (todolists) => {
    return {
        type: SET_TODOLISTS,
        todolists: todolists
    }
};

export const loadTodoLists = () => {
    return (dispatch) => {
        api.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data));
            })
    }
};
export const addTodoLists = (title) => {
    return (dispatch) => {
        api.createTodolist(title)
            .then(res => {
                let todolist = res.data.data.item;
                dispatch(addTodolistAC(todolist))
            })
    }
};
export const deleteTodoLists = (todolistId) => {
    return (dispatch) => {
        api.deleteTodolist(todolistId)
            .then(res => {
                // раз попали в then, значит
                dispatch(deleteTodolistAC(todolistId));
            });
    }
};
export const loadTasks = (todolistId) => {
    return (dispatch) => {
        api.getTasks(todolistId)
            .then(res => {
                let allTasks = res.data.items;                           // items - это таски сервака
                dispatch(setTasksAC(allTasks, todolistId));
            });
    }
};
export const addTasks = (title, todolistId) => {
    return (dispatch) => {
        api.createTask(title, todolistId)
            .then(res => {
                let newTask = res.data.data.item;
                dispatch(addTaskAC(newTask, todolistId));
            });
    }
};
export const updateTasks = (t, taskId, obj, todolistId) => {
    return (dispatch) => {
        api.updateTask({...t, ...obj})
            .then(res => {
                dispatch(updateTaskAC(taskId, obj, todolistId));
            });
    }
};
export const deleteTasks = (taskId, todolistId) => {
    return (dispatch) => {
        api.deleteTask(taskId)
            .then(res => {
                // раз попали в then, значит
                dispatch(deleteTaskAC(taskId, todolistId));
            });
    }
};
export const updateTodoListTitle = (title, todolistId) => {
    return (dispatch) => {
        api.updateTodolistTitle(title, todolistId)
            .then(res => {
                // для экшена успеха использовать в названии updateTodolistTitleSuccess
                dispatch(updateTodolistTitleAC(title, todolistId));
            });
    }
};

export default reducer;

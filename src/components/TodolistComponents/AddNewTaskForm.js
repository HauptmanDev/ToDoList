import React from 'react';
import style from './AddNewTaskForm.module.css';
import {Input} from "antd";
import {Button} from 'antd';

class AddNewTaskForm extends React.Component {
    state = {
        error: false,
        title: "",
        show: false,
    };

    onClickShowForm = () => {
        this.setState({show: true});
    };

    onAddItemClick = () => {
        let newText = this.state.title;
        this.setState({title: ""});
        if (newText === "") {
            this.setState({error: true});
        } else {
            this.setState({error: false});
            this.props.addItem(newText);
            this.setState({show: false});
        }
    };

    closeInput = () => {
        this.setState({show: false});
    };
    onTitleChanged = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };
    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddItemClick();
        }
    };


    render = () => {
        let classNameForInput = this.state.error ? "error" : "";
        return (
            <div className={style.AddNewTaskForm}>
                {this.state.show ?
                    <>
                        <div>
                                <div className={style.inputForm}>
                                    <span className={style.appeal}>Please, write list name</span>
                                    <div className={style.input}>
                                        <Input className={classNameForInput} type="text"
                                               onChange={this.onTitleChanged}
                                               onKeyPress={this.onKeyPress}
                                               value={this.state.title}/>
                                    </div>
                                    <div className={style.buttonConsole}>
                                        <div className={style.buttonAdd}>
                                            <Button onClick={this.onAddItemClick} style={{}}>Add</Button>
                                        </div>
                                        <div>
                                            <Button onClick={this.closeInput}>Close</Button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </>
                    :
                    <div className={style.posButton}>
                        <button className={style.buttonSend} onClick={this.onClickShowForm}>Add New Task</button>
                    </div>}
            </div>
        );
    }
}

export default AddNewTaskForm;


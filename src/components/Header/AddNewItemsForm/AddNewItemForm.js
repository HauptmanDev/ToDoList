import React from 'react';
import style from './AddNewItemForm.module.css';

class AddNewItemForm extends React.Component {
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
            <div className={style.AddNewItemForm}>
                {this.state.show ?
                    <>
                        <div>
                            <input className={classNameForInput} type="text" placeholder="New item name"
                                   onChange={this.onTitleChanged}
                                   onKeyPress={this.onKeyPress}
                                   value={this.state.title}
                            />
                        </div>
                        <div className={style.buttonAdd}>
                            <button onClick={this.onAddItemClick}>Add</button>
                        </div>
                    </>
                    :
                    <div className={style.posButton}>
                        <button className={style.buttonSend} onClick={this.onClickShowForm}>Add New List</button>
                    </div>}
            </div>
        );
    }
}

export default AddNewItemForm;


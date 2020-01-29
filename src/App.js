import React from 'react';
import './App.css';
import MainComponent from "./components/MainComponent";

class App extends React.Component {

    render = () => {
        return (
            <>
                <main className='wrapper'>
                    <div className='blur'>{}</div>
                    <div className='Title'>
                        Todolist
                    </div>
                    <div className='App'>
                        <MainComponent/>
                    </div>
                </main>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <filter id="blur">
                        <feGaussianBlur stdDeviation="5"/>
                    </filter>
                </svg>
            </>
        );
    }
}

export default App;


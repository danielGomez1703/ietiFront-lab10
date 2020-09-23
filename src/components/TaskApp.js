import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import HomeViews from "./HomeViews";
import 'react-datepicker/dist/react-datepicker.css';
import AddTask from "./AddTask"
import { BrowserRouter as Router, Link, Route, Redirect, Switch } from 'react-router-dom'


class TaskApp extends Component {

    constructor(props) {
            super(props);
            this.state = {
            adding: false,
            items: []

        };
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const homeView = () => (
            <HomeViews handleClick={this.handleClick} items={this.state.items}/>
        );
        const AddView = () => (
            <AddTask handleClick={this.handleClick} />
        );
        console.log("isAdding  return " + this.state.adding);
        const view = this.state.adding ? AddView : homeView
        

        return (
                <div className="TaskApp">
                    <Router>
                        <br />
                        <br />
                        <Route exact path="/" component={view} />
                    </Router>
                </div>
        );

    }

    handleClick(e) {
        console.log(" is adding " + localStorage.getItem("isAdding"));
        console.log(e);
       
        if (this.state.adding) {
            console.log("entra al if" + e);
            this.setState({
                adding: false,
                items: this.state.items.concat(e)
            })
        }
        else {
            
            this.setState({
                adding: true
               
            });
        }
    }

}

export default TaskApp;
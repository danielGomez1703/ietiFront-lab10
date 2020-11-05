import React from "react";
import MiniDrawer from "./MiniDrawer";
import TaskList from "./TaskList"
import { Container } from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
export class HomeViews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        var list = []
        await axios.get('http://localhost:8080/api/todo', {
            username: this.state.mail,
            password: this.state.password
        })
            .then(function (response) {
                const data = response.data;
                console.log(response);
                list = [];
                data.forEach(function (task) {
                    list.push({
                        "status": task.status,
                        "description": task.description,
                        "fileUrl": task.fileUrl,
                        "responsible": {
                            "name": task.responsible.name,
                            "email": task.responsible.email
                        },
                        "dueDate": task.dueDate
                    })

                });
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({ items: list });

    }

    render() {
        console.log("tasklist" + this.state.items)
        return (
            <div className="ViewTask">
                <MiniDrawer />
                <h2> TASKS </h2>
                <Container fixed>

                        <hr />
                        <br />
                        <br />

                        <br />
                        <TaskList taskList={this.state.items} />
                </Container>
                <Fab size="medium" color="primary" aria-label="add" onClick={this.handleClick}>
                    <AddIcon />
                </Fab>
            </div>
        );
    }


    handleClick(e) {
        localStorage.setItem("isAdding", false);
        this.props.handleClick(e);
    }
}
export default HomeViews;
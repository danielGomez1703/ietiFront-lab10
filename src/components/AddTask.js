import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavigationIcon from '@material-ui/icons/Navigation'
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import Login from "./Login";
import Moment from 'react-moment';
import { Container } from '@material-ui/core'
import MiniDrawer from "./MiniDrawer";  
import Grid from '@material-ui/core/Grid';
import TaskApp from "./TaskApp";
import axios from "axios"

class AddTask extends React.Component {


	constructor(props) {
        super(props)
        
        this.state = {
            items: [],
            descripcion: '',
            status: "",
            file: null,
            fileUrl:"",
            dueDate: moment(),
            responsible: {
                name: "Daniel Gomez",
                email: "daniel.gomez-su@mail.com"
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
      
    }

    
    render() {
        
    
        return (
        <div>
            <form onSubmit={this.handleSubmit} className="todo-form">

                <h3>New task</h3>

                <Grid container spacing={2}>
                    <Grid item xs>
                        <label>
                            responsible information
                                         <br />
                            <br />
                            <TextField label="Name" variant="outlined"
                                id="Name"
                                name="Name"
                                value="Daniel Gomez">
                                disabled
                                    </TextField>
                            <br />
                            <br />
                            <TextField label="Mail" variant="outlined"
                                id="Mail"
                                name="Mail"
                                value="daniel.gomez-su@mail.com">
                                disabled
                                    </TextField>
                        </label>

                        <br />
                        <br />
                        <label>
                            Task Information
                                        <br />
                            <br />
                            <TextField label="Descripcion" variant="outlined"
                                id="descripcion"
                                name="descripcion"
                                onChange={this.handleChange}
                                value={this.state.descripcion}>
                            </TextField>

                            <br />
                            <br />


                            <TextField label="status" variant="outlined"

                                id="status"
                                name="status"
                                type="status"
                                onChange={this.handleChange}
                                value={this.state.status}>
                            </TextField>
                            <br />
                            <br />
                        </label>
                    </Grid>
                    <Grid item xs>

                        <label>
                            Select a date for task:
                            <br />
                            <center>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <DatePicker autoOk
                                        orientation="landscape"
                                        variant="static"
                                        openTo="date"
                                        value={this.state.dueDate}
                                        onChange={this.handleDateChange} />
                                </MuiPickersUtilsProvider>
                            </center>
                            </label>
                        <label>
                                Imagen de la Tarea : 
                                <br/>

                            <input type="file" 
                                id="file"
                                name="file"
                                    onChange={this.handleInputChange}>
                            </input>
                            <br />
                            <br />
                        </label>

                    </Grid>
                    <br />
                </Grid>
                <br />
                <br />
                    <Button type="Submit" variant="outlined" color="primary">
                    Add #{this.state.items.length + 1}
                    </Button>
                    <Button type="Submit" variant="outlined" color="secondary" onClick={this.handleFinish}>
                        Back
                    </Button>
            </form>
            </div>
            )

    }


    handleDateChange(date) {
        this.setState({
            dueDate: date
        });
    }

    handleInputChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    handleChange(e) {
        var property = e.target.id
        this.setState({ [property]: e.target.value });
    }

    async handleSubmit(e) {
        console.log();

        e.preventDefault();

        if (!this.state.descripcion.length || !this.state.status.length || !this.state.dueDate)
            return;
        console.log(this.state.dueDate.toDateString());

       

        let data = new FormData();
        let stringFile = ""
        data.append('file', this.state.file);

        await axios.post('http://localhost:8080/api/files', data)
            .then(function (response) {
                console.log("file uploaded!", response);
                stringFile = response.data
            })
            .catch(function (error) {
                console.log("failed file upload", error);
            });
        this.setState({
            fileUrl: stringFile
        })

       

        const newItem = {
            description: this.state.descripcion,
            fileUrl: this.state.fileUrl,
            status: this.state.status,
            dueDate: moment(this.state.dueDate.toDateString()),
            responsible: this.state.responsible
        };


     await axios.post('http://localhost:8080/api/todo', {
        status: newItem.status,
        fileUrl: "http://localhost:8080/" + newItem.fileUrl,
        description: newItem.description,
        responsible: newItem.responsible,
        dueDate: newItem.dueDate
         })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
        console.log(newItem);

        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            descripcion: '',
            status: '',
            fileUrl: "",
            file:null,
            dueDate: moment()
        }));



    }

    handleFinish() {
        localStorage.setItem("isAdding", false);
        this.props.handleClick();
        //window.location.href = "/";
	}
}
export default AddTask;
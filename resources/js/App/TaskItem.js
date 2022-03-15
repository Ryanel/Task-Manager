import React from 'react';
import axios from 'axios';

export default class TaskItem extends React.Component {
    constructor(props) {
        super(props);
        this.doDelete = this.doDelete.bind(this);
        this.doEdit = this.doEdit.bind(this);
        this.state = {
            editMode: false,
            description: props.task.description,
            completed: props.task.completed
        }

        this.onDescriptionChange = this.onDescriptionChange.bind(this)
        this.onCompletedChecked = this.onCompletedChecked.bind(this)

    }

    async doDelete() {
        const task = this.props.task;

        const data  = JSON.stringify({
            method: 'delete'
        })

        const req = await axios.post(`/task/${task.id}`, data, {
            'Content-Type': 'application/json'
        });

        this.props.onDeleted(task.id);
    }

    async doEdit() {
        // Enter edit mode, or commit changes
        if (!this.state.editMode) {
            this.setState({editMode: true});
        }
        else {
            this.setState({editMode: false});
            this.save();
        }
    }

    onDescriptionChange(e) {
        this.setState({ description: e.target.value})
    }

    onCompletedChecked(e) {
        this.setState({ completed: !this.state.completed}, () => {
            if (!this.state.editMode) {
                // Submit this immediately
                this.save();
            }
        });
    }

    async save() {
        // Commit changes to server.
        const data  = JSON.stringify({
            method: 'update',
            description: this.state.description,
            completed: this.state.completed
        });

        const req = await axios.post(`/task/${this.props.task.id}`, data, {
            'Content-Type': 'application/json'
        });

        // TODO: Handle errors here!
    }

    drawNormal() {
        const task = this.props.task;
        return (
            <tr className="border-b hover:bg-sky-100">
                <td className="p-3 w-min">
                    <input type="checkbox" id="completed" name="completed" checked={this.state.completed} value={true} onChange={this.onCompletedChecked}/>
                </td>
                <td className="p-3" w-max>
                    {this.state.description}
                </td>
                <td className="p-3 w-min">
                    <button onClick={this.doEdit} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</button>
                    <button type="submit" onClick={this.doDelete} className="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
                </td>
            </tr>
        );
    }

    drawEditMode() {
        const task = this.props.task;
        return <tr className="border-b hover:bg-sky-100">
            <td className="p-3 w-min">
                <input type="checkbox" id="completed" name="completed" checked={this.state.completed} value={true} onChange={this.onCompletedChecked}/>
            </td>
            <td className="p-3 w-max">
                <input type="text" name="taskDescription" placeholder="Task Description" value={this.state.description} onChange={this.onDescriptionChange}/>
            </td>
            <td className="p-3 w-min">
                <button onClick={this.doEdit} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">Finish</button>
            </td>
        </tr>
    }

    render() {
        if (this.state.editMode) {
            return this.drawEditMode();
        }
        else {
            return this.drawNormal();
        }
    }
}
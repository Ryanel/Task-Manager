import React from 'react';
import axios from 'axios';

export default class TaskItemCreator extends React.Component {
    constructor(props) {
        super(props);
        this.createTask = this.createTask.bind(this);
    }

    async createTask(event) {
        event.preventDefault();

        let desc = event.target.taskDescription.value;

        if (desc.length == 0) { return; }

        const data = JSON.stringify({
            method: 'create',
            description: desc
        });

        const req = await axios.post(`/task`, data, {
            'Content-Type': 'application/json'
        });

        if (req.status == 200) {
            // Inform the parent
            this.props.onItemCreated(req.data)
            // Clear the input
            event.target.taskDescription.value = ""
        }
    }

    render() {
        return <form className="flex" onSubmit={this.createTask}>
            <input type="text" name="taskDescription" className="w-full outline-none" placeholder="Task Description" />
            <button type="submit" className="text-sm bg-green-500 hover:bg-green-700 text-white py-2 px-4 focus:outline-none focus:shadow-outline">Create</button>
        </form>
    }
}
import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from "@inertiajs/inertia-react";
import axios from 'axios';

import TaskItem from '@/App/TaskItem'
import TaskItemCreator from '@/App/TaskItemCreator'
import MyAuthLayout from '@/Layouts/MyAuthLayout';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            tasks: []
        };

        this.onItemDeleted = this.onItemDeleted.bind(this);
        this.onItemCreated = this.onItemCreated.bind(this);
    }

    /* Callback functions */
    onItemCreated(task) {
        let tasks = [...this.state.tasks] // Copy, so we don't muck with this.state
        tasks.push(task)
        this.setState({ tasks });
    }

    onItemDeleted(itemID) {
        let tasks = this.state.tasks.filter(function (item) {
            return item.id != itemID;
        });

        this.setState({ tasks });
    }

    /* Lifecycle Methods */
    async componentDidMount() {
        // Load tasks. Fail gracefully here.
        const req = await axios.get(`/task`, { validateStatus: (s) => { return s < 400; } })
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    tasks: result.data
                });
            })
            .catch((error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    render() {
        const { error, isLoaded, tasks } = this.state;
        const itemDeleted = this.onItemDeleted;
        if (!isLoaded) {
            return <MyAuthLayout
                auth={this.props.auth}
                errors={this.props.errors}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
                Loading...
            </MyAuthLayout>
        }

        if (error) {
            return <b>Error: {error.toString()}</b>
        }

        return (
            <MyAuthLayout
                auth={this.props.auth}
                errors={this.props.errors}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
                <Head title="Dashboard" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <TaskItemCreator onItemCreated={this.onItemCreated} />
                            <table className="w-full table-auto text-md rounded mb-4">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-3 max-w-[3em] w-min">Done</th>
                                        <th className="text-left p-3 w-max">Task</th>
                                        <th className="text-left p-3 w-20px">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks.map(function (task) {
                                            return <TaskItem key={task.id} task={task} onDeleted={itemDeleted} />
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </MyAuthLayout>
        );
    }
}


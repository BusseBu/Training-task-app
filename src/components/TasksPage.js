import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TasksList from './TasksList';
import TasksSort from './TasksSort';
import TaskForm from './NewTaskForm';
import TasksPagination from './TasksPagination';
import { connect } from 'react-redux';
import { loadTasks } from '../ac';

class TasksPage extends Component {
	static propTypes = {
		loading: PropTypes.bool,
		loadTasks: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.props.loadTasks();
	}

	render() {
		return (
			<div>
				{this.props.loading && <div className="overlay"></div>}
				<div className="d-flex justify-content-between align-items-center py-3">
					<TasksPagination />
					<TasksSort />
				</div>
				<TasksList />
				<TaskForm />
			</div>
		);
	}
}

export default connect(
	state => ({
		loading: state.tasks.loading,
	}),
	{ loadTasks },
)(TasksPage);

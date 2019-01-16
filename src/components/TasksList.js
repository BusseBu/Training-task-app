import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Task from './Task';

class TasksList extends Component {
	static propTypes = {
		tasks: PropTypes.array.isRequired,
		editTask: PropTypes.func.isRequired,
	};

	render() {
		const { tasks, editTask: edit } = this.props;
		return (
			<div className="mb-5">
				<ul className="list-group">
					{tasks.length > 0 && tasks.map(task => <Task task={task} key={task.id}/>)}
					{tasks.length === 0 && 'Нет активных задач'}
				</ul>
			</div>
		);
	}
}

export default connect(
	state => ({
		tasks: state.tasks.list,
	})
)(TasksList);

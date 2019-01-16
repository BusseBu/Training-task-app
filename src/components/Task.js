import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { editTask } from '../ac';
import { connect } from 'react-redux';

class Task extends Component {
	static propTypes = {
		task: PropTypes.object.isRequired,
		editTask: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		const { task } = props;
		this.state = {
			edit: false,
			editForm: {
				username: task.username,
				email: task.email,
				text: task.text,
				finished: task.finished,
			},
		}
	}

	toggleEditMode = () => {
		this.setState(prevState => ({ edit: !prevState.edit }));
	};

	onSubmit = e => {
		e.preventDefault();
		const { editTask: edit, task } = this.props;
		edit({ id: task.id, editForm: { ...this.state.editForm } });
		this.toggleEditMode();
	};

	onChange = e => {
		const { name, checked, value } = e.target;
		let inputValue;
		if (name === 'finished') {
			inputValue = checked;
		} else {
			inputValue = value;
		}
		this.setState(prevState => ({ editForm: { ...prevState.editForm, [name]: inputValue } }));
	};

	renderForm() {
		const { username, email, text, finished } = this.state.editForm;
		return (
			<div className="w-100">
				<div>Имя: {username}</div>
				<div>Email: {email}</div>
				<form onSubmit={this.onSubmit}>
					<div className="form-group mb-1">
						<label className="w-100" htmlFor="text">
							Текст задачи:
							<textarea
								className="form-control"
								name="text"
								id="text"
								onChange={this.onChange}
								value={text}
							/>
						</label>
					</div>
					<div className="form-check mb-3">
						<label className="form-check-label w-100" htmlFor="finished">
							<input
								className="form-check-input"
								type="checkbox"
								name="finished"
								checked={finished}
								onChange={this.onChange}
							/>
							Выполнена
						</label>
					</div>
					<button className="btn btn-primary" type="submit">Отправить</button>
				</form>
			</div>
		);
	}

	renderTask() {
		const { task } = this.props;
		return (
			<div className="w-100">
				<div>Имя: {task.username}</div>
				<div>Email: {task.email}</div>
				<div>Текст задачи: {task.text}</div>
				<div>Статус: {task.finished ? 'Выполнена' : 'Не выполнена'}</div>
			</div>
		);
	}

	render() {
		const { task } = this.props;
		const isAdmin = new Cookies().get('admin');
		const { edit } = this.state;

		return (
			<li key={task.id} className="list-group-item d-flex">
				<div className="pr-3 mr-3 border-right">{task.id}</div>
				{edit ? this.renderForm() : this.renderTask()}
				{isAdmin && (
					<button className="edit-button btn-sm btn btn-primary position-absolute" type="submit" onClick={this.toggleEditMode}>
						Редактировать
					</button>
				)}
			</li>
		);
	}
}

export default connect(
	null,
	{
		editTask
	}
)(Task);

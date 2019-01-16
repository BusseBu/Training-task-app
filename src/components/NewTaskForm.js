import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTask, changeInput } from '../ac';

class NewTaskForm extends Component {
	static propTypes = {
		username: PropTypes.string,
		email: PropTypes.string,
		text: PropTypes.string,
		loading: PropTypes.bool,
		createTask: PropTypes.func.isRequired,
		changeInput: PropTypes.func.isRequired
	};

	onSubmit = e => {
		e.preventDefault();
		this.props.createTask();
	};

	onChange = e => {
		const { name, files, value } = e.target;
		this.props.changeInput('tasks', name, name === 'image' ? files[0] : value);
	};

	render() {
		const { username, email, text, loading } = this.props;

		return (
			<div className="mb-5">
				<h3 className="mb-3">Добавить новую задачу</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label htmlFor="username" className="w-50">
							Имя:
							<input
								className="form-control"
								type="text"
								name="username"
								id="username"
								value={username}
								onChange={this.onChange}
								placeholder="Введите имя"
								required
							/>
						</label>
					</div>
					<div className="form-group">
						<label htmlFor="email" className="w-50">
							Email:
							<input
								className="form-control"
								type="email"
								name="email"
								id="email"
								value={email}
								onChange={this.onChange}
								placeholder="Введите email"
								required
							/>
						</label>
					</div>
					<div className="form-group">
						<label htmlFor="text" className="w-75">
							Текст задачи:
							<textarea
								className="form-control"
								name="text"
								id="text"
								value={text}
								onChange={this.onChange}
								placeholder="Введите текст задачи"
								required
							/>
						</label>
					</div>
					<button className="btn btn-primary" type="submit" disabled={Boolean(loading)}>Отправить</button>
				</form>
			</div>
		);
	}
}

export default connect(
	({ createForm }) => ({
		username: createForm.username,
		email: createForm.email,
		text: createForm.text,
		loading: createForm.loading
	}),
	{
		createTask,
		changeInput,
	},
)(NewTaskForm);

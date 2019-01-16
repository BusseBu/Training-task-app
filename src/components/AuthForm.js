import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cookie from 'universal-cookie';
import { login, changeInput } from '../ac';

class AuthForm extends Component {
	static propTypes = {
		username: PropTypes.string,
		password: PropTypes.string,
		loading: PropTypes.bool,
		error: PropTypes.string,
		login: PropTypes.func.isRequired,
		changeInput: PropTypes.func.isRequired
	};

	onSubmit = e => {
		e.preventDefault();
		this.props.login();
	};

	onChange = e => {
		this.props.changeInput('auth', e.target.name, e.target.value);
	};

	render() {
		const { username, password, loading, error } = this.props;
		return (
			<div>
				<h1 className="mb-3 mt-3">Авторизация</h1>
				{new Cookie().get('admin')
					?	<div className="alert alert-primary">Вы уже авторизованы</div>
					:	(
						<form onSubmit={this.onSubmit}>
							{error && <div className="alert alert-danger">{error}</div>}
							<div className="form-group">
								<label htmlFor="username" className="w-50">
									Имя пользователя:
									<input
										className="form-control"
										type="text"
										name="username"
										id="username"
										value={username}
										onChange={this.onChange}
									/>
								</label>
							</div>
							<div className="form-group">
								<label htmlFor="password" className="w-50">
									Пароль:
									<input
										className="form-control"
										type="password"
										name="password"
										id="password"
										value={password}
										onChange={this.onChange}
									/>
								</label>
							</div>
							<button className="btn btn-primary" type="submit" disabled={loading}>Авторизоваться</button>
						</form>
					)
				}
			</div>
		);
	}
}

export default connect(
	({ authForm }) => ({
		loading: authForm.loading,
		username: authForm.username,
		password: authForm.password,
		error: authForm.error
	}),
	{ login, changeInput },
)(AuthForm);

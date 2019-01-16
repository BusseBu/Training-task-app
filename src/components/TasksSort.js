import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeSort } from '../ac';

class TasksSort extends Component {
	static propTypes = {
		sort: PropTypes.string,
		direction: PropTypes.string,
		changeSort: PropTypes.func.isRequired
	};

	static getSortList() {
		return [
			{
				name: 'username',
				title: 'имени пользователя',
			},
			{
				name: 'email',
				title: 'email',
			},
			{
				name: 'finished',
				title: 'статусу',
			},
		];
	}

	static renderButton(direction) {
		switch (direction) {
			case 'asc':
				return <i className="fa fa-fw fa-sort-asc text-secondary"></i>

			case 'desc':
				return <i className="fa fa-fw fa-sort-desc text-secondary"></i>

			default:
				return <i className="fa fa-fw fa-sort text-secondary"></i>
		}
	}

	changeSort = field => {
		const { sort, changeSort: change } = this.props;
		let { direction } = this.props;
		if (sort === field) {
			direction = direction === 'asc' ? 'desc' : 'asc';
		}
		change(field, direction);
	};

	render() {
		const { sort, direction } = this.props;
		return (
			<div className="d-flex align-items-center">
				<span className="mr-3">Сортировать по:</span>
				<div className="btn-group">
					{
						TasksSort.getSortList()
							.map(button => (
								<button
									type="button"
									key={button.name}
									onClick={() => this.changeSort(button.name)}
									className={`btn btn-light${sort === button.name ? ' active' : ''}`}
								>
									{button.title}
									{sort === button.name ? TasksSort.renderButton(direction) : TasksSort.renderButton()}
								</button>
								),
							)
					}
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		sort: state.sort.field,
		direction: state.sort.direction,
	}),
	{ changeSort },
)(TasksSort);

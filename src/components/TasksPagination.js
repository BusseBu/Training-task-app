import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { changePage } from '../ac';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';

class TasksList extends Component {
	static propTypes = {
		activePage: PropTypes.number.isRequired,
		totalTasks: PropTypes.number.isRequired,
		changePage: PropTypes.func.isRequired
	};

	changePage = (e, page) => {
		e.preventDefault();
		const { activePage, changePage: change } = this.props;
		if (page === activePage) return;
		change(page);
	};

	generatePagination() {
		const { activePage, totalTasks } = this.props;

		const rows = [];
		for (let i = 1; i <= Math.ceil(totalTasks / 3); i++) {
			rows.push(
				<li key={uniqueId()} className={`page-item${activePage === i ? ` active` : ``}`}>
					<button className="page-link" type="button" onClick={(e) => this.changePage(e, i)}>{i}</button>
				</li>,
			);
		}
		return rows;
	}

	render() {
		return (
			<ul className="pagination mb-0">
				{this.generatePagination()}
			</ul>
		);
	}
}

export default connect(
	state => ({
		totalTasks: state.tasks.total,
		activePage: state.activePage,
	}),
	{ changePage },
)(TasksList);

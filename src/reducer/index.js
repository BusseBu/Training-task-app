import { combineReducers } from 'redux';
import Cookies from 'universal-cookie';
import { connectRouter } from 'connected-react-router';
import {
	LOAD_TASKS,
	CHANGE_SORT,
	CHANGE_PAGE,
	CHANGE_INPUT,
	LOGIN,
	START,
	SUCCESS,
	FAIL, CREATE_TASK,
} from '../constants';

const initialSortState = {
	direction: 'asc',
	field: 'id',
};

const sort = (state = initialSortState, action) => {
	const { type, payload } = action;

	switch (type) {
		case CHANGE_SORT:
			return {
				field: payload.field,
				direction: payload.direction,
			};

		default:
			return state;
	}
};

const activePage = (state = 1, action) => {
	const { type, payload } = action;

	switch (type) {
		case CHANGE_PAGE:
			return payload.activePage;

		default:
			return state;
	}
};

const initialTasksState = {
	loading: false,
	list: [],
	total: 0,
	error: null,
};

const tasks = (state = initialTasksState, action) => {
	const { type, response, error } = action;

	switch (type) {
		case LOAD_TASKS + START:
			return {
				...state,
				loading: true,
			};

		case LOAD_TASKS + SUCCESS:
			return {
				loading: false,
				total: parseInt(response.total_task_count, 10),
				list: response.tasks,
				error: null,
			};

		case LOAD_TASKS + FAIL:
			return {
				...state,
				loading: false,
				error,
			};

		default:
			return state;
	}
};

const initialFormState = {
	username: '',
	email: '',
	text: '',
	error: null,
};

const createForm = (state = initialFormState, action) => {
	const { type, payload, error } = action;

	switch (type) {
		case CREATE_TASK + START:
			return {
				...state,
				loading: true,
			};

		case CREATE_TASK + SUCCESS:
			return {
				...initialFormState,
				loading: false,
				error: null,
			};

		case CREATE_TASK + FAIL:
			return {
				...state,
				loading: false,
				error,
			};

		case CHANGE_INPUT:
			if (payload.form === 'tasks') {
				return {
					...state,
					[payload.field]: payload.value,
				};
			}
			return state;

		default:
			return state;
	}
};

const initialAuthState = {
	username: '',
	password: '',
	loading: false,
	error: null,
};

const authForm = (state = initialAuthState, action) => {
	const { type, payload } = action;

	switch (type) {
		case LOGIN + START:
			return {
				...state,
				loading: true,
				error: null
			};

		case LOGIN + SUCCESS:
			const cookies = new Cookies();
			cookies.set('admin', 'true', {
				path: '/',
				expires: new Date(Date.now() + 30 * 60000),
			});
			return initialAuthState;

		case LOGIN + FAIL:
			return {
				...state,
				loading: false,
				error: 'Неверный логин или пароль',
			};

		case CHANGE_INPUT:
			if (payload.form === 'auth') {
				return {
					...state,
					[payload.field]: payload.value,
				};
			}
			return state;

		default:
			return state;
	}
};


export default (history) => combineReducers({
	router: connectRouter(history),
	tasks,
	sort,
	activePage,
	createForm,
	authForm,
});

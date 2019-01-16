import { push } from 'connected-react-router';
import qs from 'qs';
import { fetchData } from './service';
import {
	LOAD_TASKS,
	CHANGE_SORT,
	CHANGE_PAGE,
	CREATE_TASK,
	CHANGE_INPUT,
	EDIT_TASK,
	LOGIN,
	SUCCESS,
	FAIL, START,
} from '../constants';

export function loadTasks() {
	return (dispatch, getState) => {

		const state = getState();

		const query = qs.stringify({
			page: state.activePage,
			sort_field: state.sort.field,
			sort_direction: state.sort.direction,
		});

		dispatch({
			type: LOAD_TASKS + START
		});

		fetchData(`/tasks?${query}`, {
			method: 'GET'
		}).then(response => {
			dispatch({
				type: LOAD_TASKS + SUCCESS,
				response
			});
		}).catch(error => {
			dispatch({
				type: LOAD_TASKS + FAIL,
				error
			})
		});
	};
}

export function createTask() {
	return (dispatch, getState) => {
		const state = getState();

		dispatch({
			type: CREATE_TASK + START,
		});

		const formData = new FormData();
		for (const param of ['username', 'email', 'text']) {
			formData.append(param, state.createForm[param]);
		}

		fetchData(`/tasks/create`, {
			method: 'POST',
			body: formData,
			mimeType: 'multipart/form-data',
		})
			.then(() => {
				dispatch({ type: CREATE_TASK + SUCCESS });
				dispatch(loadTasks());
			})
			.catch(error => {
				console.log(error);
				dispatch({
					type: CREATE_TASK + FAIL,
					error,
				});
			});
	};
}

export function editTask(task) {
	return dispatch => {
		const { id: taskId, editForm } = task;

		dispatch({
			type: EDIT_TASK + START,
		});

		const formData = new FormData();
		for (const param in editForm) {
			if (Object.prototype.hasOwnProperty.call(editForm, param)) {
				formData.append(param, editForm[param]);
			}
		}

		fetchData(`/tasks/edit/${taskId}`, {
			method: 'POST',
			body: formData,
			mimeType: 'multipart/form-data',
		})
			.then(() => {
				dispatch({ type: EDIT_TASK + SUCCESS });
				dispatch(loadTasks());
			})
			.catch(error => {
				dispatch({
					type: EDIT_TASK + FAIL,
					error,
				});
			});
	};
}

export function login() {
	return (dispatch, getState) => {
		const state = getState();

		const formData = new FormData();
		for (const param in state.authForm) {
			if (Object.prototype.hasOwnProperty.call(state.authForm, param)) {
				formData.append(param, state.authForm[param]);
			}
		}

		dispatch({
			type: LOGIN + START,
		});

		fetchData(`/auth`, {
			method: 'POST',
			body: formData,
			mimeType: 'multipart/form-data',
		})
			.then(() => {
				dispatch({
					type: LOGIN + SUCCESS,
				});
				dispatch(push('/'));
			})
			.catch(error => {
				dispatch({
					type: LOGIN + FAIL,
					error
				});
			});
	};
}

export function changeInput(form, field, value, taskId) {
	return {
		type: CHANGE_INPUT,
		payload: {
			form,
			field,
			value,
			taskId,
		},
	};
}

export function changeSort(field, direction) {
	return dispatch => {
		dispatch({
			type: CHANGE_SORT,
			payload: {
				field,
				direction,
			},
		});
		dispatch(loadTasks());
	};
}

export function changePage(activePage) {
	return dispatch => {
		dispatch({
			type: CHANGE_PAGE,
			payload: { activePage },
		});
		dispatch(loadTasks());
	};
}

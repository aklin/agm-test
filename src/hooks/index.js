import { createContext, useContext, useReducer } from 'react';
import moment from 'moment';
import { TaskDurationMinutes, Tasks } from '../util/tasks';

const initialStore = {
	sequence: 0,
	onBreak: false,
	currentTask: false,
};

export const StoreContext = createContext(initialStore);

export const Actions = {
	/**
	 * Creates all tasks required for an incoming order.
	 */
	ADD_NEW_ORDER: 'ADD_NEW_ORDER',
	START_BREAK: 'START_BREAK',
	END_BREAK: 'END_BREAK',
	SET_CURRENT_TASK: 'SET_CURRENT_TASK',
	UNSET_CURRENT_TASK: 'UNSET_CURRENT_TASK',
};

function reducer(state, action) {
	const debug = false;
	const { type, data } = action;
	const { sequence: oldSequence, onBreak: currentBreakSeq } = state;
	const newSequence = oldSequence + 1;
	const now = new Date();
	let newState;

	if (debug) {
		console.group(type);
		console.log(`Seq: ${oldSequence}`);
		console.log('State');
		console.log(state);
	}

	switch (type) {
		case Actions.SET_CURRENT_TASK:
			newState = {
				...state,
				currentTask: data,
			};
			break;

		case Actions.UNSET_CURRENT_TASK:
			newState = {
				...state,
				currentTask: false,
			};
			break;
		case Actions.START_BREAK:
			newState = {
				...state,
				sequence: newSequence,
				[newSequence]: {
					sequence: newSequence,
					task: Tasks.BREAK,
					startAt: now,
				},
				onBreak: newSequence,
			};
			break;

		case Actions.END_BREAK:
			if (!currentBreakSeq) {
				throw new Error('No break at the moment');
			}

			newState = { ...state, onBreak: false };
			newState[currentBreakSeq].endAt = now;

			break;

		case Actions.ADD_NEW_ORDER:
			newState = {
				...state,
				sequence: newSequence + 1,
				[newSequence]: {
					...data,
					sequence: newSequence,
					task: Tasks.PREPARE_ORDER,
					startAt: now,
					endAt: moment(now)
						.add(TaskDurationMinutes[Tasks.PREPARE_ORDER], 'm')
						.toDate(),
				},
				[newSequence + 1]: {
					...data,
					sequence: newSequence + 1,
					task: Tasks.SERVE_ORDER,
					startAt: moment(now)
						.add(TaskDurationMinutes[Tasks.PREPARE_ORDER], 'm')
						.toDate(),
					endAt: moment(now)
						.add(
							TaskDurationMinutes[Tasks.PREPARE_ORDER] +
								TaskDurationMinutes[Tasks.SERVE_ORDER],
							'm'
						)
						.toDate(),
				},
			};
			break;
		default:
			new Error(`Action not recognised: ${type}`);
	}

	if (debug) {
		console.log('New state');
		console.log(newState);
		console.groupEnd();
	}

	return newState;
}

export const useStore = () => {
	const { state, dispatch } = useContext(StoreContext);
	return { state, dispatch };
};

export const useInitStore = () => {
	const [state, dispatch] = useReducer(reducer, initialStore);

	return { state, dispatch };
};

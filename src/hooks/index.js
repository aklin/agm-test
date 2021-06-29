import {createContext, useContext, useReducer} from "react";
import moment from "moment";
import {Tasks} from "../util/tasks";

export const StoreContext = createContext({sequence: 0});

export const Actions = {
	/**
	 * Creates all tasks required for an incoming order.
	 */
	ADD_NEW_ORDER: 'ADD_NEW_ORDER',
	// SERVE_ORDER:'SERVE_ORDER',
}

function reducer(state, action) {
	const debug = true;
	const {type, data} = action;
	const {sequence: oldSequence} = state;
	const newSequence = oldSequence + 1;
	const now = new Date();
	let newState;

	if (debug) {
		console.group()
		console.log(`Seq: ${oldSequence}`)
		console.log('State')
		console.log(state)
	}

	switch (type) {
		case Actions.ADD_NEW_ORDER:

			newState = {
				...state, sequence: newSequence + 1,
				[newSequence]: {
					...data,
					sequence: newSequence,
					task: Tasks.PREPARE_ORDER,
					startAt: now,
					endAt: moment(now).add(2.5, "m").toDate()
				},
				[newSequence + 1]: {
					...data,
					sequence: newSequence + 1,
					task: Tasks.SERVE_ORDER,
					startAt: moment(now).add(2.5, "m").toDate(),
					endAt: moment(now).add(4, "m").toDate()
				}
			}
			break;
		default:
			new Error(`Action not recognised: ${type}`)
	}

	if (debug) {
		console.log('New state')
		console.log(newState)
		console.groupEnd();
	}

	return newState;
}

export const useStore = () => {
	const {state, dispatch} = useContext(StoreContext);
	return {state, dispatch};
}

export const useInitStore = () => {
	const [state, dispatch] = useReducer(reducer, {sequence: 0});

	return {state, dispatch};
}

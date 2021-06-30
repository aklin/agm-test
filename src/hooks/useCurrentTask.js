import { useEffect } from 'react';
import { getCurrentTask } from '../util/taskGetters';
import compareTasks from '../util/compareTasks';
import { Actions } from './index';

export default function useCurrentTask({ state, dispatch }) {
	useEffect(() => {
		// This needs to run every time the state changes,
		// or the timer won't get updated data

		let timerId;

		if (timerId) {
			//remove previous timer
			clearInterval(timerId);
		}

		timerId = setInterval(() => {
			const { currentTask: oldCurrent } = state;
			const newCurrent = getCurrentTask(state);

			if (compareTasks(newCurrent, oldCurrent)) {
				// console.log(`Same, returning`);
				return;
			}

			dispatch({
				type: !newCurrent
					? Actions.UNSET_CURRENT_TASK
					: Actions.SET_CURRENT_TASK,
				data: newCurrent,
			});
		}, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, [state]);
}

import { useEffect } from 'react';
import { getCurrentTask } from '../util/taskGetters';
import compareTasks from '../util/compareTasks';
import { Actions } from './index';

export default function useCurrentTask({ state, dispatch }) {
	useEffect(() => {
		const timerId = setInterval(() => {
			const { currentTask: oldCurrent } = state;
			const newCurrent = getCurrentTask(state);

			if (compareTasks(newCurrent, oldCurrent)) {
				//no change
				return;
			}

			console.group('useCurrentTask');
			console.log(newCurrent);
			console.log(oldCurrent);
			console.groupEnd();

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
	}, []);
}

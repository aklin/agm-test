import { useEffect } from 'react';
import { getCurrentTask } from '../util/taskGetters';
import compareTasks from '../util/compareTasks';

export default function useCurrentTask({ state, current, setCurrent }) {
	useEffect(() => {
		const timerId = setInterval(() => {
			const ct = getCurrentTask(state);

			// update current task if different from previous
			!compareTasks(current, ct) && setCurrent(ct);
		}, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, []);
}

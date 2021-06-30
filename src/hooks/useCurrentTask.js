import { useEffect } from 'react';
import { getCurrentTask } from '../util/taskGetters';

export default function useCurrentTask(state, setCurrent) {
	useEffect(() => {
		const timerId = setInterval(() => {
			const ct = getCurrentTask(state);
			// console.log(ct);
			setCurrent(ct);
		}, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, []);
}

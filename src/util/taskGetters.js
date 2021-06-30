import moment from 'moment';

export const getSeq = (state) =>
	Object.keys(state)
		.map((key) => Number(key))
		.filter((key) => !isNaN(key))
		.sort((a, b) => a - b);

export const getLastTaskSeq = (state) =>
	getSeq(state).reduce((max, curr) => Math.max(curr, max), 0);

export const getUnfinishedTask = (state) => {
	const seq = state.onBreak ? state.onBreak : getLastTaskSeq(state);
	const task = state[`${seq}`];
	return !task || task.endAt ? undefined : task;
};

export const getCurrentTask = (state, currentTime = new Date()) => {
	const now = moment(currentTime);
	const result = getSeq(state)
		.map((key) => ({
			startAt: moment(state[key].startAt),
			endAt: moment(state[key].endAt),
			task: state[key].task,
			sequence: state[key].sequence,
		}))
		.find(({ startAt, endAt, task, sequence }) => {
			/*			console.group(task);
			console.log(`seq: ${sequence}`);
			console.log(`now: ${now}`);
			console.log(`startAt: ${startAt}`);
			console.log(`endAt: ${endAt}`);
			console.log(`isBefore: ${startAt.isBefore(now)}`);
			console.log(`isAfter: ${endAt.isAfter(now)}`);
			console.groupEnd();*/

			return (
				(startAt.isBefore(now) || startAt.isSame(now)) &&
				(endAt.isAfter(now) || endAt.isSame(now)) &&
				sequence
			);
		});

	return result ? state[result.sequence] : undefined;
};

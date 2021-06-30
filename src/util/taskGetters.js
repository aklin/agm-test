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

export const getCurrentTask = (state) => {
	const now = new Date();

	return getSeq(state)
		.map((key) => state[key])
		.find(({ startAt, endAt = new Date(), task }) =>
			startAt && startAt.getTime() < now.getTime() && endAt
				? now.getTime() < endAt.getTime()
				: true
		);
};

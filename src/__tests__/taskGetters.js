import {
	getCurrentTask,
	getLastTaskSeq,
	getUnfinishedTask,
} from '../util/taskGetters';
import { Tasks } from '../util/tasks';

it('Find task with highest sequence', () => {
	const state = {
		2: { startAt: new Date(), endAt: new Date() },
		key1: 'foo',
		key2: 'bar',
		1: { startAt: new Date() },
	};

	expect(getLastTaskSeq(state)).toEqual(2);
});

it('Find active task, which is a break', () => {
	const breakStart = new Date();

	const state = {
		2: { startAt: new Date(), endAt: new Date() },
		key1: 'foo',
		key2: 'bar',
		1: { startAt: new Date() },
		onBreak: 3,
		3: {
			startAt: breakStart,
			task: Tasks.BREAK,
		},
	};

	const res = getUnfinishedTask(state);
	expect(res).toBeDefined();

	const { task, endAt, startAt } = res;

	expect(task).toEqual(Tasks.BREAK);
	expect(endAt).toEqual(undefined);
	expect(startAt).toEqual(breakStart);
});

it('Find active task, which is not a break', () => {
	const state = {
		2: { startAt: new Date(), endAt: new Date() },
		key1: 'foo',
		key2: 'bar',
		// no end dates here
		1: { startAt: new Date() },
		3: {
			startAt: new Date(),
			task: Tasks.BREAK,
		},
		4: {
			startAt: new Date(),
			task: "doesn't matter",
		},
	};

	const res = getUnfinishedTask(state);
	expect(res).toBeDefined();
	expect(res.task).toEqual("doesn't matter");
});

it('Look for an active task in vain', () => {
	const expl =
		'Previous tasks have no endAt, but the last one does, therefore no tasks are found';
	const state = {
		2: { startAt: new Date(), endAt: new Date() },
		key1: 'foo',
		key2: 'bar',
		// no end dates here
		1: { startAt: new Date() },
		3: {
			startAt: new Date(),
			task: Tasks.BREAK,
		},
		4: {
			startAt: new Date(),
			task: expl,
			endAt: new Date(),
		},
	};

	expect(getUnfinishedTask(state)).toEqual(undefined);
});

it('Look for an active task on an empty state', () => {
	const res = getUnfinishedTask({});

	expect(res).toEqual(undefined);
});

it('Find an ongoing task based on its start and end time', () => {
	const past = new Date(100000);
	const pastLater = new Date(past.valueOf() + 5 * 60 * 1000);
	const now = new Date();

	const state = {
		key1: 'foo',
		key2: 'bar',
		1: {
			startAt: past,
			endAt: pastLater,
			task: Tasks.BREAK,
		},
		2: {
			startAt: now,
			endAt: new Date(Date.now() + 6000),
			task: Tasks.SERVE_ORDER,
		},
	};

	const res = getCurrentTask(state);
	expect(res).toBeDefined();

	expect(res.task).toEqual(Tasks.SERVE_ORDER);
});

it('Find ongoing and open task', () => {
	const past = new Date(100000);
	const pastLater = new Date(past.valueOf() + 5 * 60 * 1000);
	const now = new Date();

	const state = {
		key1: 'foo',
		key2: 'bar',
		1: {
			startAt: past,
			endAt: pastLater,
			task: Tasks.BREAK,
		},
		2: {
			startAt: now,
			//no endAt
			task: Tasks.SERVE_ORDER,
		},
	};

	const res = getCurrentTask(state);
	expect(res).toBeDefined();

	expect(res.task).toEqual(Tasks.SERVE_ORDER);
});

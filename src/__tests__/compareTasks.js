import compareTasks from '../util/compareTasks';

it('equal, all valid fields', () => {
	const t1 = {
		customerName: 'asd',
		startAt: new Date(),
		endAt: new Date(),
	};

	const t2 = { ...t1 };

	expect(compareTasks(t1, t2)).toBe(true);
});

it('equal, extra fields', () => {
	const t1 = {
		customerName: 'asd',
		startAt: new Date(),
		endAt: new Date(),
		extraField: 'ignore this',
	};

	const t2 = { ...t1, extraField: 'asd' };

	expect(compareTasks(t1, t2)).toBe(true);
});

it('equal, missing endAt', () => {
	const t1 = {
		customerName: 'asd',
		startAt: new Date(),
	};

	const t2 = { ...t1, extraField: 'asd' };

	expect(compareTasks(t1, t2)).toBe(true);
});

it('unequal because of endAt', () => {
	const t1 = {
		customerName: 'asd',
		startAt: new Date(),
		endAt: new Date(Date.now() - 1000),
	};

	const t2 = { ...t1, endAt: new Date(), extraField: 'asd' };

	expect(compareTasks(t1, t2)).toBe(false);
});

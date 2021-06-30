export default function compareTasks(a, b) {
	if (a === b) {
		return true;
	}

	if ((a === undefined || b === undefined) && a !== b) {
		return false;
	}

	const endAtA = a.endAt && a.endAt.valueOf();
	const endAtB = b.endAt && b.endAt.valueOf();

	return (
		a.task === b.task &&
		a.startAt.valueOf() === b.startAt.valueOf() &&
		endAtA === endAtB &&
		a.customerName === b.customerName
	);
}

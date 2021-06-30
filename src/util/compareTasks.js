export default function compareTasks(a, b) {
	const endAtA = a.endAt && a.endAt.valueOf();
	const endAtB = b.endAt && b.endAt.valueOf();

	return (
		a.task === b.task &&
		a.startAt.valueOf() === b.startAt.valueOf() &&
		endAtA === endAtB &&
		a.customerName === b.customerName
	);
}

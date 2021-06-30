export default function compareTasks(a, b) {
	if (a === b) {
		return true;
	}

	if (!a && !b) {
		//both falsey
		return true;
	}

	if ((!a || !b) && a !== b) {
		//one of them falsey
		return false;
	}

	const endAtA = a.endAt && a.endAt.valueOf();
	const endAtB = b.endAt && b.endAt.valueOf();

	return (
		a.sequence === b.sequence &&
		a.task === b.task &&
		a.startAt.valueOf() === b.startAt.valueOf() &&
		endAtA === endAtB &&
		a.customerName === b.customerName
	);
}

export const Tasks = {
	PREPARE_ORDER: 'PREPARE_ORDER',
	SERVE_ORDER: 'SERVE_ORDER',
	BREAK: 'BREAK',
};

export const TaskDescription = {
	[Tasks.PREPARE_ORDER]: 'Prepare order for',
	[Tasks.SERVE_ORDER]: 'Serve order to',
	[Tasks.BREAK]: 'Take a break',
};

export const TaskDurationMinutes = {
	[Tasks.PREPARE_ORDER]: 2.5,
	[Tasks.SERVE_ORDER]: 1,
};

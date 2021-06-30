import { useEffect, useState } from 'react';
import { getCurrentTask } from '../../util/taskGetters';
import { Grid, Paper, Typography } from '@material-ui/core';
import { TaskDescription } from '../../util/tasks';

export default function CurrentTask({ state }) {
	const [current, setCurrent] = useState();

	useEffect(() => {
		const timerId = setInterval(() => {
			const ct = getCurrentTask(state);
			console.log(ct);
			setCurrent(ct);
		}, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, []);

	const { task, customerName } = current || {};

	return (
		<Paper>
			<Typography variant={'h4'}>Current task</Typography>

			{current ? (
				<Grid container>
					<Grid item md={6}>
						Task
					</Grid>
					<Grid item md={6}>
						{TaskDescription[task]}
					</Grid>
					<Grid item md={6}>
						Customer
					</Grid>
					<Grid item md={6}>
						{customerName}
					</Grid>
				</Grid>
			) : (
				'No current task'
			)}
		</Paper>
	);
}

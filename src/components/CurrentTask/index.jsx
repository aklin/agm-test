import { Grid, Paper, Typography } from '@material-ui/core';
import { TaskDescription } from '../../util/tasks';
import useCurrentTask from '../../hooks/useCurrentTask';
import { useState } from 'react';

export default function CurrentTask({ state }) {
	const [current, setCurrent] = useState();
	useCurrentTask({ state, current, setCurrent });

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

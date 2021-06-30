import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { TaskDescription } from '../../util/tasks';

const useStyles = makeStyles({
	topMargin: {
		marginTop: '50px',
		marginBottom: '50px',
	},
});

export default function CurrentTask({ state }) {
	const classes = useStyles();
	const { currentTask } = state;

	const { task, customerName } = currentTask || {};

	return (
		<Paper className={classes.topMargin}>
			<Typography variant={'h4'}>Current task</Typography>

			{currentTask ? (
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

import {makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {TaskDescription} from "../../util/tasks";
import moment from "moment";

const useStyles = makeStyles({
	topMargin:{
		marginTop: "50px",
	},
	table: {
		minWidth: 650,
	},
});

const headers = [
	{name: ""}, //sequence
	{name: 'Completion Time', align: 'center'},
	{name: 'Task', align: 'right'},
	{name: 'Customer', align: 'left'},
	{name: 'Duration', align: 'left'},
]

export default function OrdersTable({orders}) {
	const classes = useStyles();
	return (
		<TableContainer className={classes.topMargin} component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						{headers.map(({name, align = "left"}) => <TableCell align={align} key={name}>{name}</TableCell>)}
					</TableRow>
				</TableHead>
				<TableBody>
					{orders
						.sort((a, b) => b.sequence - a.sequence)
						.map(({sequence, startAt, endAt=Date.now(), customerName, task}) => (
							<TableRow key={sequence}>
								<TableCell component="th" scope="row">
									{sequence}
								</TableCell>
								<TableCell align={headers[1].align || "left"}>{ moment(endAt).hour() }:{moment(endAt).minutes()}</TableCell>
								<TableCell align={headers[2].align || "left"}>{TaskDescription[task]}</TableCell>
								<TableCell align={headers[3].align || "left"}>{customerName}</TableCell>
								<TableCell align={headers[4].align || "left"}>{moment.duration(moment(endAt).diff(moment(startAt))).asMinutes()}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

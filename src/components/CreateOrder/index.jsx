import {Button, makeStyles, Paper, Typography} from "@material-ui/core";
import InputField from "../InputField";
import {useState} from "react";
import {Actions} from "../../hooks";


const useStyles = makeStyles({
	topMargin: {
		marginTop: "50px",
		marginBottom: "50px",
	},
});

export default function CreateOrder({dispatch}) {
	const classes = useStyles();

	const [form, setForm] = useState({});

	const {customerName} = form;

	return (
		<div className={classes.topMargin}>
			<Typography variant={"h4"}>
				Incoming Order Form
			</Typography>
			<Paper>
				<InputField
					id={"customerName"}
					value={customerName}
					label={"Customer name"}
					helperText={"Will appear on your Orders table below"}
					onChange={(e) => {
						e.preventDefault();
						setForm({...form, [e.target.id]: e.target.value})
					}}
				/>
				<Button onClick={(e => {
					e.preventDefault();
					dispatch({type: Actions.ADD_NEW_ORDER, data: form})
					setForm({})
				})}>Create order</Button>
			</Paper>
		</div>
	)
}

import OrdersTable from "../OrdersTable";
import {Tasks} from "../../util/tasks";
import {Typography} from "@material-ui/core";
import {useStore} from "../../hooks";
import {useMemo} from "react";

const data = [
	{
		sequence: 1,
		startAt: 1624845722926,
		customerName: "Bob",
		task: Tasks.PREPARE_ORDER,
	},
	{
		sequence: 2,
		startAt: 1624845738980,
		customerName: "Bob",
		task: Tasks.SERVE_ORDER,
	}
];

export default function Orders() {
	const now = new Date();
	const {state} = useStore();
	const {sequence} = state;

	const dat = useMemo(() => Object.keys(state)
			.filter((key) => key !== "sequence")
			.map(key => state[key])
			.reduce((prev, curr) => prev.push(curr) && prev ,[])
		, [sequence])


	return (
		<div>
			<Typography variant={"h4"}>Tasks for today {now.getDate()}/{now.getMonth() + 1}/{now.getFullYear()}</Typography>
			<OrdersTable orders={dat}/>
		</div>
	)
}

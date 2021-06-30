import './App.css';
import {
	AppBar,
	Container,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core';
import Orders from './components/Orders';
import CreateOrder from './components/CreateOrder';
import { StoreContext, useInitStore } from './hooks';
import CurrentTask from './components/CurrentTask';

const useStyles = makeStyles({
	topMargin: {
		marginTop: '50px',
	},
});

function App() {
	const classes = useStyles();

	const { state, dispatch } = useInitStore();

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			<Container>
				<AppBar position={'static'}>
					<Toolbar>
						<Typography variant="h6">Giovanni's - Orders</Typography>
					</Toolbar>
				</AppBar>
				<Container maxWidth="lg" className={classes.topMargin}>
					<CreateOrder state={state} dispatch={dispatch} />
					<CurrentTask state={state} />
					<Orders />
				</Container>
			</Container>
		</StoreContext.Provider>
	);
}

export default App;

import App from "../App";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {TaskDescription, Tasks} from "../util/tasks";


it('creates an item and adds it to the store', ()=>{
	const {getByText}=render(<App />)

	expect(getByText(/Giovanni's - Orders/i)).toBeInTheDocument()

	const submit = screen.getByText(/Create order/i)
	const input = screen.getByTestId("customerName")

	expect(submit).toBeInTheDocument()
	expect(input).toBeInTheDocument()

	input.value = 'test name'
	userEvent.click(submit)

	expect(screen.getByText(TaskDescription[Tasks.PREPARE_ORDER])).toBeInTheDocument()
	expect(screen.getByText(TaskDescription[Tasks.SERVE_ORDER])).toBeInTheDocument()
})

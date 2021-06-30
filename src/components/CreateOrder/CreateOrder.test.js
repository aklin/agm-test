import { render, screen } from '@testing-library/react';
import App from '../../App';
import userEvent from '@testing-library/user-event';

it('cannot start break if there is a current task', async () => {
	const { getByText } = render(<App />);

	const createOrderBtn = screen.getByTestId('createOrderBtn');
	const breakBtn = screen.getByTestId('breakBtn');
	const submitBtn = screen.getByText(/Create order/i);
	const input = screen.getByTestId('customerName');

	expect(submitBtn).toBeInTheDocument();
	expect(breakBtn).toBeInTheDocument();
	expect(input).toBeInTheDocument();

	//assert initial state: both btns enabled
	expect(breakBtn).toBeEnabled();
	expect(createOrderBtn).toBeEnabled();

	//start break: disables Create Order
	userEvent.click(breakBtn);
	expect(breakBtn).toBeEnabled();
	expect(createOrderBtn).toBeDisabled();
	//end break
	userEvent.click(breakBtn);

	input.value = 'test name';
	userEvent.click(submitBtn);

	await new Promise((r) => setTimeout(r, 1000));

	expect(breakBtn).toBeDisabled();
});

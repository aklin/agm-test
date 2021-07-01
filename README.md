# Giovanni's Sandwitcherie

## Assumptions

Giovanni stated that "he takes a break when there aren't any orders". This has
been interpreted as such: Giovanni can either choose to take a break, during which
no orders can be placed, or he can choose to stay behind the counter waiting
for the next customer. 

Therefore, the code distinguishes between _break_ time (which is triggered 
manually) and _standby time_ which is the time between breaks and orders. This 
makes sense since Giovanni is looking to hire a talented React developer to help
him make sandwiches, and they will need to mark their break time clearly.


## Solution

Since Giovanni asked for a Web application, I thought the best place to start
is with a React app using a React State to store the tasks. As a result, this
project can be built and started with `yarn && yarn run start`. If `yarn` is
not available, one can use `npm i && npm run start`.

The best place to start examining the app (after README.md, of course) is `App.js`.


### Unit Testing

Utility functions have thorough standalone unit tests. They can be found under
`src/__tests__`. Another unit test, found under `src/components/CreateOrder/CreateOrder.test.js`
tests the entire app from a UI perspective. It makes sure that the buttons are
disabled when they should be, and that components display the correct text based
on user inputs.

### User Interface

This is a single-page application with three basic components:

* An order form, to create new orders and start / stop the break - `CreateOrder/index.js`
* A widget to display current order information, based on time - `CurrentTask/index.js`
* A table with all past and future orders - `OrdersTable/index.js`

The UI is done with Material UI, but since this is a Proof-of-Concept, no 
particular attention was paid to styling details.

### The Store

The Store resides in `src/hooks/index.js` and keeps several types of information:

1. Utility information such as the next sequence number. In a later version this
    would be done in the Persistence layer
1. Whether Giovanni is on break
1. What the current task is
1. The entire list of tasks, past and future

There are two ways to update the store:

1. User input from the Orders form
1. A timer which refreshes the _current order_ information every second

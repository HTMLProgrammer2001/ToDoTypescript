import * as React from 'react';

interface Props {
	initial: number
}

interface State {
	value: number
}

class Counter extends React.Component<Props, State>{
	constructor(props: Props){
		super(props);

		this.state = {
			value: props.initial
		};

		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
	}

	increment(): void{
		this.setState((state) => ({
			value: state.value + 1
		}));
	}

	decrement(): void{
		this.setState((state) => ({
			value: state.value - 1
		}));
	}

	render(): React.ReactNode{
		return (
			<div>
				<span onClick={this.decrement}>-</span>
				<span>{this.state.value}</span>
				<span onClick={this.increment}>+</span>
			</div>
		);
	}
}

export default Counter;

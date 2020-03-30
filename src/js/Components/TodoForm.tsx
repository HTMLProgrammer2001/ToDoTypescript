import React, {useState} from 'react';
import {ITodo} from '../interfaces';

interface TodoFormProps{
	addTodo: (todo: ITodo) => void
}

let TodoForm: React.FC<TodoFormProps> = ({addTodo}) => {
	let [value, setValue] = useState('');

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const keyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if(event.key == 'Enter'){
			let todo:ITodo = {
				id: +Date.now(),
				title: value,
				completed: false
			};

			addTodo(todo);

			setValue('');
		}
	};

	return (
		<div className = "row">
			<div className="input-field col s6 m-1 offset-s3">
				<input
					value = {value}
					onChange = {changeHandler}
					onKeyPress={keyPressHandler}
					placeholder="Todo"
					id="todo_item"
					type="text"
					className="validate"/>

				<label htmlFor="todo_item">Enter todo</label>
			</div>
		</div>
	);
};

export default TodoForm;

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
		<div>
			<input type="text"
				   value = {value}
				   onChange = {changeHandler}
				   onKeyPress={keyPressHandler}/>
		</div>
	);
};

export default TodoForm;

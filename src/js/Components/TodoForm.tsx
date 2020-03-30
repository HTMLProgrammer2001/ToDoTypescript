import React from 'react';
import {ITodo} from '../interfaces';

interface TodoFormProps{
	addTodo: (todo: ITodo) => void
}

let TodoForm: React.FC<TodoFormProps> = ({addTodo}) => {
	const keyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if(event.key == 'Enter'){
			let todo:ITodo = {
				id: +Date.now(),
				title: event.target.value,
				completed: false
			};

			addTodo(todo);

			event.target.value = '';
		}
	};

	return (
		<div>
			<input type="text" onKeyPress={keyPressHandler}/>
		</div>
	);
};

export default TodoForm;

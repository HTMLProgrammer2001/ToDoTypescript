import React from 'react';
import {ITodo} from '../interfaces';

interface TodoItemProps{
	todo: ITodo;
	deleteHandler: (id: number) => void;
	completeChange: (id: number, value: boolean) => void
}

let TodoItem: React.FC<TodoItemProps> = ({todo, deleteHandler, completeChange}) => {

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		completeChange(todo.id, event.target.checked);
	};

	return (
		<li>
			<div>
				<input
					type="checkbox"
					onChange={changeHandler}
					{...(todo.completed ? ['checked'] : [])}/>

				{todo.title}
				<span
					onClick={
						deleteHandler.bind(null, todo.id)
					}>Del</span>
			</div>
		</li>
	);
};

export default TodoItem;

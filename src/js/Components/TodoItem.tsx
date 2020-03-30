import React from 'react';
import {ITodo} from '../interfaces';

interface TodoItemProps{
	todo: ITodo;
	deleteHandler: (id: number) => void
}

let TodoItem: React.FC<TodoItemProps> = ({todo, deleteHandler}) => {
	return (
		<li>
			<div>
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

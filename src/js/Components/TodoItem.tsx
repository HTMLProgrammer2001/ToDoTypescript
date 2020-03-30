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
		<li className = "row">
			<p>
				<label>
					<input
						type="checkbox"
						onChange={changeHandler}
						checked={todo.completed}/>
					<span>{todo.title}</span>
					<i className="material-icons p-1 text-red"
					   onClick={deleteHandler.bind(null, todo.id)}>delete</i>
				</label>
			</p>
		</li>
	);
};

export default TodoItem;

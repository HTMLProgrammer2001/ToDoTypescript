import React, {useState} from 'react';

import TodoForm from './TodoForm';
import {ITodo} from '../interfaces';
import TodoItem from './TodoItem';

let App: React.FC = () => {
	let [todos, todoDispatcher] = useState([]);

	const addTodo = (todo: ITodo) => {
		todoDispatcher((prev: ITodo[]) => [todo, ...prev]);
	};

	const deleteTodo = (id: number) => {
		todoDispatcher((prev) => {
			return prev.filter((todo) => todo.id !== id);
		});
	};

	return (
		<React.Fragment>
			<TodoForm addTodo={addTodo}/>

			<div>
				<ul>
					{
						todos.map((todo) => {
							return <TodoItem
								todo={todo}
								key={todo.id}
								deleteHandler={deleteTodo}/>;
						})
					}
				</ul>
			</div>
		</React.Fragment>
	);
};

export default App;
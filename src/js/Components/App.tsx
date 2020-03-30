import React, {useState, useEffect} from 'react';

import TodoForm from './TodoForm';
import {ITodo} from '../interfaces';
import TodoItem from './TodoItem';
import Navbar from './Navbar';

let App: React.FC = () => {
	let [todos, todoDispatcher] = useState([]);

	useEffect(() => {
		let saved: ITodo[] = JSON.parse(localStorage.getItem('todos') || '[]');

		todoDispatcher((prev) => {
			return saved;
		});
	}, []);

	useEffect((prev) => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const addTodo = (todo: ITodo) => {
		todoDispatcher((prev: ITodo[]) => [todo, ...prev]);
	};

	const deleteTodo = (id: number) => {
		todoDispatcher((prev) => {
			return prev.filter((todo) => todo.id !== id);
		});
	};

	const completeChange = (id: number, value: boolean) => {
		todoDispatcher((prev) => {
			return prev.map((todo) => {
				if(todo.id == id) {
					todo.completed = value;
				}

				return todo;
			});
		});
	};

	return (
		<React.Fragment>
			<Navbar/>

			<TodoForm addTodo={addTodo}/>

			<div className="row">
				<ul className="col s6 offset-s3">
					{
						todos.map((todo) => {
							return <TodoItem
								todo={todo}
								key={todo.id}
								completeChange={completeChange}
								deleteHandler={deleteTodo}/>;
						})
					}
				</ul>
			</div>
		</React.Fragment>
	);
};

export default App;

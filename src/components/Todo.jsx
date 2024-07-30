import React, { useEffect } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {
    const [todolist, setTodoList] = React.useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);  
    const inputRef = React.useRef()

    const add = () => {
        const inputText = inputRef.current.value.trim();

        if (inputText === '') {
            return null;
        }
        
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false
        }
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = '';
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }

    const toggle = (id) => {
        setTodoList((prevTodos) => prevTodos.map((todo) => 
            todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
        ));
    }

    const clearAll = () => {
        setTodoList([]);
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todolist));
    }, [todolist]);

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
            {/* Title */}
            <div className='flex items-center mt-7 gap-2'>
                <img className="w-8" src={todo_icon} alt="" />
                <h1 className='text-3xl font-semibold'>Todo App</h1>
            </div>

            {/* Input */}
            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input ref={inputRef} className="bg-transparent border-0 outline-none flex-1 h-14 pl-16 pr-2 placeholder:text-slate-600" type="text" placeholder='Add your Task'/>
                <button onClick={add} className='border-none rounded-full bg-orange-600 text-white text-lg font-medium w-32 h-14 rounded-full cursor-pointer transition-transform transform hover:scale-105 hover:bg-orange-700 active:scale-95'>ADD +</button>
            </div>

            {/* List and Button */}
            <div className='flex flex-col flex-grow'>
                <div className='flex flex-col flex-grow'>
                    {todolist.map((item) => (
                        <TodoItems key={item.id} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
                    ))}
                </div>
                <button onClick={clearAll} className='mt-4 border-none rounded-full bg-red-600 w-full h-14 text-white text-lg font-medium cursor-pointer transition-transform transform hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'>
                    Clear All
                </button>
            </div>
        </div>
    )
}

export default Todo

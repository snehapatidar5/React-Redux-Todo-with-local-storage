import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo, addTodo } from '../redux/features/todo/todoSlice';

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      savedTodos.forEach((todo) => dispatch(addTodo(todo.text))); 
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleEdit = (todo) => {
    setIsEditing(todo.id);
    setEditText(todo.text);
  };

  const handleUpdate = (id) => {
    dispatch(updateTodo({ id, text: editText }));
    setIsEditing(null);
  };

  return (
    <>
    <div className='bg-[#D5CCFF]  w-[60%] rounded-xl mx-auto mt-[50px] md:p-8'>
      <div className='xs:text-center md:text-left font-semibold text-2xl' >To-Do List</div>
      <ul className="list-none ">
        {todos.map((todo) => (
          <li
            className="mt-4 md:flex md:justify-between bg-[#F4F2FF]  py-2 rounded w-full"
            key={todo.id}
          >
          <div className='px-2 '>
            {isEditing === todo.id ? (
              <input 
                value={editText} 
                onChange={(e) => setEditText(e.target.value)}
                className="bg-[#D5CCFF] text-black xs:w-[50%] md:w-full px-2 py-1 rounded focus:outline-none" 
              />
            ) : (
             
              <div className="text-black p-4 ">
        
              {todo.text}
              </div>
            )}
            </div>

            <div className="  flex flex-col md:flex md:flex-row justify-center items-center gap-4 w-[100%] md:w-[40%] mt-4 md:mt-0" >
              {isEditing === todo.id ? (
                <button
                  onClick={() => handleUpdate(todo.id)}
                  className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo)}
                  className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                >
                  Update
                </button>
              )}

              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}

export default Todos;

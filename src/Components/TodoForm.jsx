import React, {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import {ToastContainer, toast, Slide} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import './TodoForm.css';
import Task from "./Task";

export default function TodoForm() {

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const notifyOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const notifySuccess = message => toast.success(message, notifyOptions);

  const notifyError = message => toast.error(message, notifyOptions);

  const onSubmit = e => {
    e.preventDefault();
    if (task.trim() !== '') {
      const newTask = {id: uuidv4(), name: task};

      setTasks([newTask, ...tasks]);
      localStorage.setItem('tasks', JSON.stringify([newTask, ...tasks]));

      setTask('');
      notifySuccess('Tâche ajoutée !');
    } else {
      notifyError('Impossible d\'ajouter une tâche vide.');
    }
  };

  const deleteTask = id => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    notifyError('Tâche supprimée !');
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('tasks'))) {
      setTasks(JSON.parse(localStorage.getItem('tasks')));
    }
  }, []);

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Ajoutez une tâche ici"
          type="text"
          name="task"
          id="task"
          autoComplete="off"
          autoFocus
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <button type="submit" className="btn">Ajouter</button>
      </form>
      <h1>{tasks.length > 0 ? 'Mes tâches' : 'Aucune tâche pour le moment.'}</h1>
      <ul>
        {tasks.map(task => <Task key={task.id} task={task.name} delete={() => deleteTask(task.id)}/>)}
      </ul>
      <ToastContainer
        position="bottom-right"
        transition={Slide}
        autoClose={3000}
        closeOnClick={false}
        pauseOnFocusLoss={false}
      />
    </React.Fragment>
  );
}

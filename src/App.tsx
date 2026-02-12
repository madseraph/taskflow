import { useState } from 'react';
import { useTasks, useTodoStore } from './store/todo.store';

function App() {
  const [title, setTitle] = useState<string>('');

  const { createTask } = useTodoStore();
  const tasks = useTasks();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await createTask({
        title: title,
      });
    } catch (error) {
      throw new Error('');
    }

    setTitle('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-neutral-100 flex flex-col gap-1">
        <input
          value={title}
          type="text"
          onChange={e => setTitle(e.target.value)}
          placeholder="Введите название задачи"
        />
        <button type="submit">Создать задачу</button>
      </form>

      {tasks.length !== 0 && (
        <div>
          {tasks.map(task => (
            <div key={task.id}>
              <div>{task.title}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;

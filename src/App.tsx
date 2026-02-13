import { useState } from 'react';
import { useTasks, useTodoStore } from './store/todo.store';
import Button from './components/ui/Button/Button';
import Modal from './components/features/Modal/Modal';
import useDateFormatter from './hooks/useDateFormatter';

import CheckboxIcon from './assets/icons/checkbox-icon.svg';
import CheckboxCompletedIcon from './assets/icons/checkbox-completed-icon.svg';

function App() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescriptoin] = useState<string>('');
  const [priority, setPriority] = useState<string>('default');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [requiredFiled, setRequiredField] = useState<boolean>(false);

  const { formatShortDate, formatOnlyTime } = useDateFormatter();
  const { createTask, deleteTask, setEditingId, toggleCompletedTask } = useTodoStore();
  const tasks = useTasks();

  const handleEdit = (id: string) => {
    setEditingId(id);
    setOpenModal(true);
  };

  const handleToggle = (id: string) => {
    toggleCompletedTask(id);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setRequiredField(true);

      setTimeout(() => {
        setRequiredField(false);
      }, 2000);

      return;
    }

    try {
      await createTask({
        title: title,
        description: description,
        priority: 'default',
      });
    } catch (error) {
      throw new Error('');
    }

    setTitle('');
    setDescriptoin('');
  };

  return (
    <>
      <div className="w-full flex justify-center pt-8">
        <div className="flex flex-col gap-8">
          <form
            onSubmit={handleSubmit}
            className="p-5 rounded-2xl bg-white border border-[#E2E8F0] w-lg flex flex-col gap-3">
            <h2 className="text-2xl mb-3 text-center">Добавить задачу</h2>
            <input
              value={title}
              type="text"
              onChange={e => setTitle(e.target.value)}
              placeholder="Введите название задачи"
              className={`outline-0 p-2 bg-white border border-[#E2E8F0] rounded-md ${requiredFiled && 'border-[#EF4444] placeholder:text-[#EF4444]'}`}
            />
            <textarea
              className="outline-0 p-2 bg-white border border-[#E2E8F0] rounded-md"
              value={description}
              onChange={e => setDescriptoin(e.target.value)}
              placeholder="Введите описание задачи (необязательно)"></textarea>
            <Button type="submit" variant="default">
              Создать задачу
            </Button>
          </form>

          {tasks.length !== 0 && (
            <div className="flex flex-col gap-3">
              {tasks.map(task => (
                <article
                  className={`p-5 bg-white rounded-md border border-neutral-200 w-lg flex flex-col gap-3 ${task.completed ? '' : 'opacity-50'}`}
                  key={task.id}>
                  <div className="flex items-center gap-1.5">
                    <div onClick={() => handleToggle(task.id)} className="text-2xl cursor-pointer">
                      {task.completed ? <CheckboxIcon /> : <CheckboxCompletedIcon />}
                    </div>
                    <div className="text-sm text-[#64748B]">
                      <span>Задача создана: </span>
                      <time dateTime={formatShortDate(task.createdAt)}>
                        {formatShortDate(task.createdAt)} в {formatOnlyTime(task.createdAt)}
                      </time>
                    </div>
                  </div>
                  <div className={`text-xl text-[#334155] ${!task.completed && 'line-through decoration-[0.5px]'}`}>
                    {task.title}
                  </div>

                  {task.description && (
                    <div className={`text-[#64748B] ${!task.completed && 'line-through'}`}>{task.description}</div>
                  )}
                  <div className="flex gap-3">
                    <Button type="button" onClick={() => handleEdit(task.id)} variant="edit">
                      Редактировать задачу
                    </Button>
                    <Button type="button" onClick={() => deleteTask(task.id)} variant="delete">
                      Удалить задачу
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      <Modal openModal={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default App;

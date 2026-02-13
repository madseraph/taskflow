import { useEffect, useState } from 'react';
import Button from '../../ui/Button/Button';
import CloseIcon from './../../../assets/icons/close-icon.svg';
import { useTodoStore, type TaskType } from '../../../store/todo.store';

type ModalProps = {
  openModal: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ openModal, onClose }) => {
  // const { editingId, getTaskById, editedTask, clearEditing } = useTodoStore();
  const editingId = useTodoStore(state => state.editingId);
  const getTaskById = useTodoStore(state => state.getTaskById);
  const editTask = useTodoStore(state => state.editTask);
  const clearEditing = useTodoStore(state => state.clearEditing);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingId !== null) {
      const task = getTaskById(editingId);

      if (task) {
        setTitle(task.title);
        setDescription(task.description || '');
      } else {
        setTitle('');
        setDescription('');
      }
    }
  }, [editingId, getTaskById]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!editingId) return;

    const task = getTaskById(editingId);
    if (!task) return;

    const editedTask: TaskType = {
      ...task,
      title,
      description,
    };
    editTask(editedTask);
    onClose();
  };

  const handleReset = () => {
    clearEditing();
    onClose();
  };

  return (
    <div
      className={`flex justify-center items-center bg-black/20 absolute top-0 right-0 w-full h-full transition-all delay-50 ease-linear ${openModal ? 'opacity-100 visible' : 'invisible opacity-0'}`}
      onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={e => e.stopPropagation()}
        className="relative p-5 bg-white rounded-2xl border border-neutral-200 w-lg flex flex-col gap-3">
        <Button className="w-max text-2xl absolute top-5 right-5" variant="ghost" type="button" onClick={onClose}>
          <CloseIcon />
        </Button>
        <h3 className="text-2xl font-medium mb-6">Редактирование задачи</h3>
        <input
          value={title}
          className="outline-0 p-2 bg-white border border-neutral-200 rounded-md"
          type="text"
          placeholder="Введите название задачи"
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          value={description}
          className="outline-0 p-2 bg-white border border-neutral-200 rounded-md"
          placeholder="Введите описание задачи"
          onChange={e => setDescription(e.target.value)}
        />
        <div className="flex gap-3">
          <Button type="submit" variant="default">
            Сохранить
          </Button>
          <Button type="button" variant="delete" onClick={handleReset}>
            Отменить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Modal;

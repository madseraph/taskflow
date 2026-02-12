import { create } from 'zustand';

type TaskType = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type TasksType = {
  tasks: TaskType[];
  loading: boolean;
  error: string | null;

  createTask: (taskData: Omit<TaskType, 'id' | 'completed' | 'createdAt' | 'updatedAt'>) => Promise<void>;
};

export const useTodoStore = create<TasksType>()(set => ({
  tasks: [],
  loading: false,
  error: null,

  createTask: async taskData => {
    try {
      set({ loading: true, error: null });

      const newTask: TaskType = {
        ...taskData,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set(state => ({
        tasks: [newTask, ...state.tasks],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка в создании задачи',
        loading: false,
      });
    }
  },
}));

export const useTasks = () => useTodoStore(state => state.tasks);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskType = {
  id: string;
  title: string;
  description?: string;
  priority: 'default' | 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

type TasksType = {
  tasks: TaskType[];
  loading: boolean;
  error: string | null;
  editingId: string | null;

  createTask: (taskData: Omit<TaskType, 'id' | 'completed' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deleteTask: (taskId: string) => void;
  toggleCompletedTask: (taskId: string) => void;

  editTask: (editedTask: TaskType) => void;
  getTaskById: (taskId: string) => TaskType | undefined;
  setEditingId: (taskId: string) => void;
  clearEditing: () => void;
};

export const useTodoStore = create<TasksType>()(
  persist(
    (set, get) => ({
      tasks: [],
      loading: false,
      error: null,
      editingId: null,

      createTask: async taskData => {
        try {
          set({ loading: true, error: null });

          const newTask: TaskType = {
            ...taskData,
            id: crypto.randomUUID(),
            completed: false,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
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

      deleteTask: taskId => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== taskId),
        }));
      },

      toggleCompletedTask: taskId => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === taskId
              ? {
                  ...task,
                  completed: !task.completed,
                  updatedAt: new Date().toString(),
                }
              : task,
          ),
        }));
      },

      editTask: editedTask => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === editedTask.id ? { ...editedTask, updatedAt: new Date().toString() } : task,
          ),
          editingId: null,
        }));
      },

      setEditingId: taskId => {
        set({ editingId: taskId });
      },

      clearEditing: () => {
        set({ editingId: null });
      },

      getTaskById: taskId => {
        return get().tasks.find(task => task.id === taskId);
      },
    }),
    {
      name: 'tasks-storage',
      partialize: state => ({ tasks: state.tasks }),
    },
  ),
);

export const useTasks = () => useTodoStore(state => state.tasks);

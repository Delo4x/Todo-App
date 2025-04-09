export interface Todo {
  id: string;
  text: string;
  imageUri?: string;
  createdAt: Date;
}

export interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
} 
export interface ToDo {
  id: number;
  task: string;
  complete: boolean;
  date?: number;
}

export interface ToDoList {
  id: number;
  todos: ToDo[];
  name: string;
}

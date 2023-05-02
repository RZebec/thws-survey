export interface ToDo {
  id: number;
  task: string;
  complete: boolean;
  date?: Date;
}

export interface ToDoList {
  id: number;
  todos: ToDo[];
  name: string;
}

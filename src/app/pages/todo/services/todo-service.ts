import { ToDo, ToDoList } from '../models/todo-model';
import { TutorialToDoList } from '../models/tutorialToDos';

export class ToDoService {
  private dbPath = 'todosLists';

  // private todosRef: CollectionReference<ToDo>;

  constructor() {
    // const userId = this.afAuth.currentUser!.uid;
    // this.todosRef = collection(
    //   this.db,
    //   `users/${userId}/${this.this.dbPath}`
    // ) as CollectionReference<ToDo>;
  }

  public getTutorialToDoList(): ToDoList {
    const tutorialToDos = localStorage.getItem('tutorialToDos');

    if (!tutorialToDos) {
      localStorage.setItem('tutorialToDos', JSON.stringify(TutorialToDoList));
      return TutorialToDoList;
    }

    return JSON.parse(tutorialToDos);
  }

  public updateTutorialToDoList(toDos: ToDo[]) {
    const tutorialToDos = localStorage.getItem('tutorialToDos');

    if (!tutorialToDos) {
      localStorage.setItem('tutorialToDos', JSON.stringify(TutorialToDoList));
      return;
    }

    const toDoList: ToDoList = JSON.parse(tutorialToDos);

    toDoList.todos = toDos;

    localStorage.setItem('tutorialToDos', JSON.stringify(toDoList));
  }

  public setTutorialToDoTaskToComplete(id: number) {
    const tutorialToDos = localStorage.getItem('tutorialToDos');

    if (!tutorialToDos) {
      localStorage.setItem('tutorialToDos', JSON.stringify(TutorialToDoList));
      return;
    }

    const toDoList: ToDoList = JSON.parse(tutorialToDos);

    const toDoIndex = toDoList.todos.findIndex((t) => t.id === id);

    if (toDoIndex === -1) return;

    toDoList.todos[toDoIndex].complete = true;

    if (toDoList.todos.filter((t) => t.complete).length >= 5)
      toDoList.todos[5].complete = true;

    localStorage.setItem('tutorialToDos', JSON.stringify(toDoList));
  }

  public getAllToDoLists(): ToDoList[] {
    const storageTodoLists = localStorage.getItem(this.dbPath);
    const toDoLists: ToDoList[] = storageTodoLists
      ? JSON.parse(storageTodoLists)
      : [];
    return toDoLists;
  }

  public getToDoListById(listId: number): ToDoList | null {
    // return collectionData(this.todosRef).toPromise() as Promise<ToDo[]>;
    const storageTodoLists = localStorage.getItem(this.dbPath);
    const toDoLists: ToDoList[] = storageTodoLists
      ? JSON.parse(storageTodoLists)
      : [];

    const toDoListIndex = toDoLists.findIndex((tL) => tL.id === listId);

    if (toDoListIndex === -1) return null;

    return toDoLists[toDoListIndex];
  }

  // public getTodoById(id: number): ToDo | null {
  //   const storageTodos = localStorage.getItem(this.dbPath);
  //   const todos: ToDo[] = storageTodos ? JSON.parse(storageTodos) : [];
  //   const index = todos.findIndex((t) => t.id === id);
  //   if (index === -1) return null;
  //   return todos[index];
  // }

  public createToDoList(newToDoList: ToDoList) {
    const toDoLists = this.getAllToDoLists();

    // const newToDoList: ToDoList = {
    //   id: Math.random(),
    //   name,
    //   todos: [],
    // };

    localStorage.setItem(
      this.dbPath,
      JSON.stringify([newToDoList, ...toDoLists])
    );
  }

  public removeToDoListById(listId: number) {
    const toDoLists = this.getAllToDoLists();

    const toDoListIndex = toDoLists.findIndex((tL) => tL.id === listId);

    if (toDoListIndex === -1) return;

    toDoLists.splice(toDoListIndex, 1);

    localStorage.setItem(this.dbPath, JSON.stringify(toDoLists));
  }

  public addTodoToListById(listId: number, todo: ToDo) {
    // return addDoc(this.todosRef, todo);
    const toDoLists = this.getAllToDoLists();

    const toDoListIndex = toDoLists.findIndex((tL) => tL.id === listId);

    if (toDoListIndex === -1) return;

    toDoLists[toDoListIndex].todos.push(todo);

    localStorage.setItem(this.dbPath, JSON.stringify(toDoLists));
  }

  public deleteTodoById(listId: number, id: number) {
    // const docRef = doc(this.todosRef, id);
    // return deleteDoc(docRef);
    const toDoList = this.getToDoListById(listId);

    if (!toDoList) return;

    const index = toDoList!.todos.findIndex((t) => t.id === id);

    if (index === -1) return;

    toDoList!.todos.splice(index, 1);

    this.updateTodoList(toDoList);
  }

  public updateTodoListById(listId: number, data: ToDoList) {
    // const docRef = doc(this.todosRef, id);
    // return updateDoc(docRef, data);
    const storageTodoLists = localStorage.getItem(this.dbPath);
    const todosLists: ToDoList[] = storageTodoLists
      ? JSON.parse(storageTodoLists)
      : [];

    const listIndex = todosLists.findIndex((t) => t.id === listId);
    if (listIndex === -1) return;

    todosLists[listIndex] = data;

    localStorage.setItem(this.dbPath, JSON.stringify(todosLists));
  }

  public updateTodoList(toDoList: ToDoList) {
    // const docRef = doc(this.todosRef, id);
    // return updateDoc(docRef, data);
    const listId = toDoList.id;
    const storageTodoLists = localStorage.getItem(this.dbPath);
    const todosLists: ToDoList[] = storageTodoLists
      ? JSON.parse(storageTodoLists)
      : [];

    const index = todosLists.findIndex((tL) => tL.id === listId);
    if (index === -1) return;

    todosLists[index] = toDoList;

    localStorage.setItem(this.dbPath, JSON.stringify(todosLists));
  }

  public updateToDoByListId(listId: number, todo: ToDo) {
    const toDoList = this.getToDoListById(listId);

    if (!toDoList) return;

    const todoIndex = toDoList!.todos.findIndex((t) => t.id === todo.id);

    if (todoIndex === -1) return;

    toDoList!.todos[todoIndex] = todo;

    this.updateTodoList(toDoList);
  }
}

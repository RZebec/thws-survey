import { ToDoList } from './todo-model';

export const TutorialToDoList: ToDoList = {
  name: 'Tutorial',
  id: Math.random(),
  todos: [
    {
      id: 10,
      task: 'Add a new ToDo list with the button above.',
      complete: false,
    },
    {
      id: 20,
      task: 'Add three new ToDos to a list.',
      complete: false,
    },
    {
      id: 30,
      task: 'Edit one of the ToDos date by pressing the edit button.',
      date: Date.now(),
      complete: false,
    },
    {
      id: 40,
      task: 'Move the position of the todos by dragging them around.',
      complete: false,
    },
    {
      id: 50,
      task: 'Check two ToDos as completed.',
      complete: false,
    },
    {
      id: 60,
      task: 'Play around with the app more if you like. When you are done you can move on to the next step.',
      complete: false,
    },
    {
      id: 70,
      task: 'Delete the following Tutorial ToDo List. This will complete the app testing and you will be redirected to the post-questionnaire.',
      complete: false,
    },
  ],
};

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoPageComponent } from './container/todo-page/todo-page.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoRoutingModule } from './todo-routing.module';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoComponent } from './components/todo/todo.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToDoService } from './services/todo-service';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoListFormComponent } from './components/todo-list-form/todo-list-form.component';
import { AddTodoListModalComponent } from './components/modals/add-todo-list-modal/add-todo-list-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoEditModalComponent } from './components/modals/todo-edit-modal/todo-edit-modal.component';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TodoListEditModalComponent } from './components/modals/todo-list-edit-modal/todo-list-edit-modal.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

@NgModule({
  declarations: [
    TodoPageComponent,
    TodoFormComponent,
    TodoListComponent,
    TodoComponent,
    TodoListFormComponent,
    AddTodoListModalComponent,
    TodoEditModalComponent,
    TodoListEditModalComponent,
    TutorialComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TodoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatListModule,
  ],
  providers: [ToDoService],
})
export class TodoModule {}

import { Injectable } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import {
  addDoc,
  arrayRemove,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';

import { switchMap, map } from 'rxjs/operators';

import { DocumentReference } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/userDetails';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private afAuth: Auth, private db: Firestore) {}

  setUserInformation(userId: string, email: string) {
    const user = doc(this.db, `users/${userId}`);
    return setDoc(user, {
      email: email,
      step: 0,
    });
  }

  updateUserStep(step: number) {
    const userId = this.afAuth.currentUser!.uid;
    const userDocRef = doc(this.db, `users/${userId}`);
    return updateDoc(userDocRef, { step });
  }

  // createBoard(data: Board): Promise<DocumentReference> {
  //   const userId = this.afAuth.currentUser!.uid;
  //   return addDoc(collection(this.db, `users/${userId}/boards`), {
  //     ...data,
  //     uid: userId,
  //     tasks: [],
  //   });
  // }

  deleteBoard(boardId: string): Promise<void> {
    const userId = this.afAuth.currentUser!.uid;
    const boardDocRef = doc(this.db, `users/${userId}/boards/${boardId}`);
    return deleteDoc(boardDocRef);
  }

  // updateTasks(boardId: string, tasks: Task[]): Promise<void> {
  //   const userId = this.afAuth.currentUser!.uid;
  //   const boardDocRef = doc(this.db, `users/${userId}/boards/${boardId}`);
  //   return updateDoc(boardDocRef, { tasks });
  // }

  // removeTask(boardId: string, task: Task): Promise<void> {
  //   const userId = this.afAuth.currentUser!.uid;
  //   const boardDocRef = doc(this.db, `users/${userId}/boards/${boardId}`);
  //   return updateDoc(boardDocRef, { tasks: arrayRemove(task) });
  // }

  getUserDetailsFromFirebase(): User {
    const user = this.afAuth.currentUser!;
    return user;
  }

  async getUserDetails(): Promise<UserDetails> {
    const userId = this.afAuth.currentUser!.uid;
    const userDocRef = doc(this.db, 'users/' + userId);
    const userDocSnap = await getDoc(userDocRef);
    return userDocSnap.data() as UserDetails;
  }

  // getUserBoards(): Promise<Board[]> {
  //   const userId = this.afAuth.currentUser!.uid;
  //   const boardsRef = collection(this.db, 'users/' + userId + '/boards');
  //   return collectionData(boardsRef).toPromise() as Promise<Board[]>;
  // }

  // getUserBoardObservable(): Observable<Board[]> {
  //   const userId = this.afAuth.currentUser!.uid;
  //   const boardsRef = collection(this.db, 'users/' + userId + '/expenses');
  //   return collectionData(boardsRef) as Observable<Board[]>;
  // }
}

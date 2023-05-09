import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import {
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';

import { UserDetails } from '../models/userDetails';
import { DocumentReference, addDoc, collection } from 'firebase/firestore';
import { AnalyticsEvent } from '../pages/todo/models/analyticsEvent';

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
      acceptedTerms: false,
    });
  }

  updateUserStep(step: number) {
    const userId = this.afAuth.currentUser!.uid;
    const userDocRef = doc(this.db, `users/${userId}`);
    return updateDoc(userDocRef, { step });
  }

  updateUserAcceptedTerms(acceptedTerms: boolean) {
    const userId = this.afAuth.currentUser!.uid;
    const userDocRef = doc(this.db, `users/${userId}`);
    return updateDoc(userDocRef, { acceptedTerms });
  }

  addAnalyticsEvent(eventData: AnalyticsEvent): Promise<DocumentReference> {
    const userId = this.afAuth.currentUser!.uid;
    const userName = this.afAuth.currentUser!.displayName;

    return addDoc(collection(this.db, `users/${userId}/events`), eventData);
  }

  // createBoard(data: Board): Promise<DocumentReference> {
  //   const userId = this.afAuth.currentUser!.uid;
  //   return addDoc(collection(this.db, `users/${userId}/boards`), {
  //     ...data,
  //     uid: userId,
  //     tasks: [],
  //   });
  // }

  // deleteBoard(boardId: string): Promise<void> {
  //   const userId = this.afAuth.currentUser!.uid;
  //   const boardDocRef = doc(this.db, `users/${userId}/boards/${boardId}`);
  //   return deleteDoc(boardDocRef);
  // }

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

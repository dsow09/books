import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/auth';
import { getAuth } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error: string | undefined;

  constructor(private router: Router) { }
  createNewUser(email: string, password: string)
  {
    return new Promise(
      (resolve, reject) => {
        firebase.createUserWithEmailAndPassword(getAuth(), email, password).then(
          (value) => {
            resolve(value);
          },

          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string)
  {
    return new Promise(
      (resolve, reject) => {
        firebase.signInWithEmailAndPassword(getAuth(), email, password).then(
          (value) => {
            resolve(value);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser()
  {
    firebase.signOut(getAuth()).then(
      () => {
        console.log('Deconnexion avec succès');
      }
    )
  }
}

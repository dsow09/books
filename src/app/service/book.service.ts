import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../model/book';
import * as firebase from 'firebase/database'
import { getDatabase, set, get, onValue, refFromURL  } from 'firebase/database';
import * as storage from 'firebase/storage'
import { getStorage, getDownloadURL, ref, deleteObject } from 'firebase/storage';



@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() { }

  emitBooks()
  {
    this.booksSubject.next(this.books);
  }

  saveBooks()
  {
    firebase.set(firebase.ref(getDatabase(), '/books'), this.books);
  }

  getBooks()
  {
    firebase.onValue(firebase.ref(getDatabase(), '/books'),
    (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    });
  }

  getSingleBook(id: number)
  {
    return new Promise(
      (resolve, reject) => {
        firebase.onValue(firebase.ref(getDatabase(), '/books/'+id),
        (data) => {
          resolve(data.val());
        }, (error) => {
          reject(error);
        }
        );
      }
    );
  }

  createNewBook(book: Book)
  {
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book)
  {
    if(book.photo)
    {
      const storageRef = refFromURL(getDatabase(), book.photo);
      deleteObject(ref(getStorage())).then(
        () => {
          console.log('Photo suprimée');
        }
      ).catch((error) => {
        console.log('Fichier non trouvé : '+error);
      });
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        bookEl === book ? true : false
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File)
  {
    return new Promise(
      (resolve, reject) => {
        const uniqueFileName = Date.now().toString();
        const upload = ref(getStorage(), 'images/' + file.name);

       // const child = firebase.child(ref(getDatabase(),), 'images/' + uniqueFileName + file.name);
        getDownloadURL(ref(getStorage(), upload.toString())).then(
          (url) => {
            console.log('Chargement...');
            resolve(url);
          }
        ).catch((error) => {
          switch (error.code) {
            case 'storage/object-not-found':
              // File doesn't exist
              console.log('Le Fichier n\'existe pas ');
              break;

            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              console.log('L\'utilisateur n\' pas les autorisations')
              break;

            case 'storage/canceled':
              // User canceled the upload
              console.log('Fermeture');
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              console.log('Erreur inconnue');
              break;
          }
        })
      }
    );
  }

}

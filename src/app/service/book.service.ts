import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../model/book';
import * as firebase from 'firebase/database'
import { getDatabase, ref, set, get, onValue,  } from 'firebase/database';


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
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        bookEl === book ? true : false
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

}

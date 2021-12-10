import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm = this.fb.group({
    title: ['', [Validators.required]],
    author: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSaveBook()
  {
    const title = this.bookForm.get('title')?.value;
    const author = this.bookForm.get('author')?.value;
    const newBook = new Book(title, author);
    this.bookService.createNewBook(newBook);
    console.log('Enregistrement avec succès');
    this.router.navigate(['/books']);
  }

}

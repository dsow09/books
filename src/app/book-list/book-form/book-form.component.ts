import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
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
    author: ['', [Validators.required]],
    photo: ['']
  });

  fileIsUploading = false;
  fileURL: any;
  fileUploaded = false;

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
    const photo = this.bookForm.get('photo')?.value;
    const newBook = new Book(title, author, photo);
    if(this.fileURL && this.fileURL !== '')
    {
      newBook.photo = this.fileURL;
    }
    this.bookService.createNewBook(newBook);
    console.log('Enregistrement avec succès');
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File)
  {
    this.fileIsUploading = true;
    this.bookService.uploadFile(file).then(
      (url) => {
        this.fileURL = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    )
  }

  detectFiles(event: any)
  {
    this.onUploadFile(event.target.files[0]);
  }

}

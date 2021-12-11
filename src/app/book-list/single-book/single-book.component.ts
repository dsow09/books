import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {
  book: any;

  constructor
  (
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.book = new Book('', '', '');
    const id = this.route.snapshot.params['id'];
    this.bookService.getSingleBook(+id).then(
      (book) => {
        this.book = book;
      }
    );
  }

  onBack()
  {
    this.router.navigate(['/books']);
  }

}

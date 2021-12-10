import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book';

  constructor()
  {
    const firebaseConfig = {
      apiKey: "AIzaSyDbeR3jObmKmr0_YRPoElkNszaOYs8PVYA",
      authDomain: "books-backend-19644.firebaseapp.com",
      projectId: "books-backend-19644",
      storageBucket: "books-backend-19644.appspot.com",
      messagingSenderId: "126322590588",
      appId: "1:126322590588:web:c7b8e27a599ca04ae0daf9",
      measurementId: "${config.measurementId}"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  errorMessage = '';

  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]{6,}')]]
  });

  onSubmit()
  {
    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;

    this.authService.signInUser(email, password).then(
      () => {
        console.log('connexion avec succès');
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error;
        console.log('error');
      }
    );
  }

  ngOnInit() {}

  constructor(
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
            ) { }


}

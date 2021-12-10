import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  errorMessage = '';

  signUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]{6,}')]]
  });

  onSubmit()
  {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;

    this.authService.createNewUser(email, password).then(
      () => {
        console.log('Création avec succès');
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error;
        console.log('error');
      }
    );
  }

  constructor(
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
            ) { }

}

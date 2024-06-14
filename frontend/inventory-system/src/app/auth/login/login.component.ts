import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenData } from '../../interface/auth/token-data';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  authService = inject(AuthService);

  router = inject(Router);

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('test@gmail.com', Validators.required),
      password: new FormControl('12345', Validators.required),
    });
  }

  handle_login() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((data: TokenData) => {
      console.log(data);
      this.router.navigate(['/dashboard/']);
    });
  }
  
}

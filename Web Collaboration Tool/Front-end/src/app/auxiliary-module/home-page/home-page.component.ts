import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public loginForm: FormGroup;

  public loginError: string;

  constructor(private loginService: LoginService,
              private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  public onSubmit(): void {
    this.loginService.login(this.loginForm.getRawValue())
                     .subscribe(() => this.onLoginSuccess(), error => this.onLoginFailure(error.error));
  }

  public onSignUp(): void {
    this.router.navigateByUrl('/signUp');
  }

  private onLoginSuccess(): void {
    localStorage.setItem('username', this.loginForm.get('username').value);
    this.router.navigateByUrl(`/user/${localStorage.getItem('username')}`);
  }

  private onLoginFailure(error: string): void {
    localStorage.clear();
    this.loginError = error;
  }
}

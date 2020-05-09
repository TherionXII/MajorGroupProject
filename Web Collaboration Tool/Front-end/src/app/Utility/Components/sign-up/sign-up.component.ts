import {Component, OnInit, ViewChild} from '@angular/core';
import {MatHorizontalStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild('horizontalStepper')
  public horizontalStepper: MatHorizontalStepper;

  constructor() {}

  public ngOnInit() {}

  public onUserCreated(username: string): void {
    localStorage.setItem('username', username);
    this.horizontalStepper.next();
  }
}

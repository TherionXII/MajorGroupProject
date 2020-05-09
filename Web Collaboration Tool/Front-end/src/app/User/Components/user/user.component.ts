import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public username: string;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
  }
}

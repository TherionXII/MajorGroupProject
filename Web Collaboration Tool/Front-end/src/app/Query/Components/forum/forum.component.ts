import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  public isCreateVisible: boolean;

  constructor() {}

  public ngOnInit(): void {
    localStorage.getItem('username') ? this.isCreateVisible = true : this.isCreateVisible = false;
  }
}

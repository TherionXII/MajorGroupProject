import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges {
  public username: string;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
   this.route.paramMap.subscribe(paramMap => this.username = paramMap.get('username'));
  }

  public ngOnChanges(): void {
    this.ngOnInit();
  }
}

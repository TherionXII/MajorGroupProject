import { Component, OnInit } from '@angular/core';
import {IGroup} from '../../Interfaces/IGroup';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})
export class UserGroupsComponent implements OnInit {
  public userGroups: Array<IGroup>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { userGroups: [ Array<IGroup>, any ]}) => this.userGroups = data.userGroups[0]);
  }
}

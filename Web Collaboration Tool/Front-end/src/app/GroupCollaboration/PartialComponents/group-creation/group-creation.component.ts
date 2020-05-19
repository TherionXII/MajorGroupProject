import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IGroup} from '../../Interfaces/IGroup';
import {GroupService} from '../../Services/group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group-creation',
  templateUrl: './group-creation.component.html',
  styleUrls: ['./group-creation.component.css']
})
export class GroupCreationComponent implements OnInit {
  public newGroupForm: FormGroup;
  public createGroupError: string;

  constructor(private groupService: GroupService,
              private router: Router) { }

  public ngOnInit(): void {
    this.newGroupForm = new FormGroup({
      title: new FormControl('', [ Validators.required ]),
      description: new FormControl('', [ Validators.required ])
    });

    this.createGroupError = '';
  }

  public onSubmit(): void {
    this.groupService.createGroup(this.newGroupForm.getRawValue() as IGroup, localStorage.getItem('username'))
      .subscribe(group => this.router.navigateByUrl(`/group/${group.id}/${group.thread.id}`),
                () => this.createGroupError = 'Something went wrong when creating your group; please try again later');
  }
}

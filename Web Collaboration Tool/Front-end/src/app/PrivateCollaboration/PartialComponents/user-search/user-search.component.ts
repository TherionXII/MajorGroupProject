import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PrivateCollaborationService} from '../../Services/private-collaboration.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  public searchControl: FormControl;
  public searchResults: Array<string>;

  constructor(private privateCollaborationService: PrivateCollaborationService) {
    this.searchResults = new Array<string>();
  }

  public ngOnInit(): void {
    this.searchControl = new FormControl('', [ Validators.required ]);
  }

  public onSubmit(): void {
    this.privateCollaborationService.searchForUser(this.searchControl.value)
      .subscribe(results => this.searchResults = results);
  }
}

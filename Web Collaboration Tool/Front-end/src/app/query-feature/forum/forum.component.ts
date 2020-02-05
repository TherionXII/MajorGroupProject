import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../services/query.service';
import {IQuery} from '../Interfaces/IQuery';
import {RedirectService} from '../../auxiliary-module/services/redirect.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  public isCreateVisible: boolean;

  public queryFormGroup: FormGroup;

  public queries: Array<IQuery>;

  constructor(private queryService: QueryService,
              private redirectService: RedirectService) { }

  ngOnInit() {
    localStorage.getItem('username') ? this.isCreateVisible = true : this.isCreateVisible = false;

    this.queryFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      subtitle: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      contents: new FormControl('', [Validators.required])
    });

    this.queryService.getRecentQueries().subscribe(result => this.queries = result, error => console.log(error));
  }

  public onSubmit() {
    this.queryService.createQuery(this.queryFormGroup.getRawValue() as IQuery, localStorage.getItem('username'))
      .subscribe(response => this.redirectService.redirect('/query/' + response.id), error => console.log(error));
  }
}

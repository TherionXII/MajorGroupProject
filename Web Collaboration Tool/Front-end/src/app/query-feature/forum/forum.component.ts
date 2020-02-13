import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../services/query.service';
import {IQuery} from '../Interfaces/IQuery';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  public isCreateVisible: boolean;

  public queryFormGroup: FormGroup;

  public queries: Array<IQuery>;

  public getQueriesError: string;
  public createQueryError: string;

  constructor(private queryService: QueryService,
              private router: Router) {}

  ngOnInit() {
    localStorage.getItem('username') ? this.isCreateVisible = true : this.isCreateVisible = false;

    this.queryFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      subtitle: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      contents: new FormControl('', [Validators.required])
    });

    this.queries = new Array<IQuery>();

    this.queryService.getRecentQueries().subscribe(result => this.queries = result, error => this.getQueriesError = error.message);
  }

  public onSubmit() {
    this.queryService.createQuery(this.queryFormGroup.getRawValue() as IQuery, localStorage.getItem('username'))
      .subscribe(response => this.router.navigateByUrl('/query/' + response.id), error => this.createQueryError = error.message);
  }
}

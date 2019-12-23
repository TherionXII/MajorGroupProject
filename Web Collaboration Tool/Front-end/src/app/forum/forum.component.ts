import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../services/query.service';
import {IQuery} from '../Interfaces/IQuery';
import {RedirectService} from '../services/redirect.service';

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
    this.queryService.createParentQuery({ contents: this.queryFormGroup.get('contents').value, rating: 0 }, localStorage.getItem('username'))
      .subscribe( id => this.queryService.createParentQueryData({ title: this.queryFormGroup.get('title').value, subtitle: this.queryFormGroup.get('subtitle').value }, id)
          .subscribe(() => this.redirectService.redirect('/query/' + id), error => console.log(error)), error => console.log(error));
  }
}

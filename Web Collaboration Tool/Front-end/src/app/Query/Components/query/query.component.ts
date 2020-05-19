import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IQuery} from '../../Interfaces/IQuery';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../../Services/query.service';
import {IResponse} from '../../Interfaces/IResponse';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  public query: IQuery;

  public queryResponseForm: FormGroup;

  public errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute, private queryService: QueryService) {
    this.query = {} as IQuery;
    this.errorMessage = '';
  }

  public ngOnInit() {
    this.activatedRoute.data
      .subscribe((data: { query: IQuery}) => this.query = data.query, error => this.errorMessage = error);

    this.queryResponseForm = new FormGroup({
      response: new FormControl('', Validators.required)
    });
  }

  public onSubmit(): void {
    this.queryService.createResponse(this.query.id, localStorage.getItem('username'), this.queryResponseForm.getRawValue() as IResponse)
      .subscribe(query => this.query = query, error => this.errorMessage = error.message);
  }
}

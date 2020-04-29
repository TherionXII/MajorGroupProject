import { Component, OnInit } from '@angular/core';
import {QueryService} from '../../Services/query.service';
import {ActivatedRoute} from '@angular/router';
import {IQuery} from '../../Interfaces/IQuery';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  public query: IQuery;
  public username: string;

  public getQueryError: string;

  constructor(private queryService: QueryService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.queryService.getQueryById(this.activatedRoute.snapshot.paramMap.get('id') as unknown as number)
      .subscribe(result => this.query = result, error => this.getQueryError = error.message);
  }
}
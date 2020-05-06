import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IQuery} from '../../Interfaces/IQuery';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  public query: IQuery;

  public resolverError: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.query = {} as IQuery;
    this.resolverError = '';
  }

  ngOnInit() {
    this.activatedRoute.data
      .subscribe((data: { query: IQuery}) => this.query = data.query, error => this.resolverError = error);
  }
}

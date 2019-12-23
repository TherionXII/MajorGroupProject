import { Component, OnInit } from '@angular/core';
import {QueryService} from '../services/query.service';
import {ActivatedRoute} from '@angular/router';
import {IQuery} from '../Interfaces/IQuery';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  public query: IQuery;
  public username: string;

  public isReplyVisible = false;

  public queryResponse: FormGroup;

  constructor(private queryService: QueryService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.queryService.getQueryById(this.activatedRoute.snapshot.paramMap.get('id') as unknown as number)
      .subscribe(result => this.query = result, error => console.log(error));

    // this.queryResponse = new FormGroup({
    //   response: Form
    // })
  }

  public onRespond(): void {
    this.isReplyVisible = !this.isReplyVisible;
  }
}

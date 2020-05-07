import { Component, OnInit } from '@angular/core';
import {IQuery} from '../../Interfaces/IQuery';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-forum-queries',
  templateUrl: './forum-queries.component.html',
  styleUrls: ['./forum-queries.component.css']
})
export class ForumQueriesComponent implements OnInit {
  public queries: Array<IQuery>;

  public resolverError: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.queries = new Array<IQuery>();
    this.resolverError = '';
  }

  public ngOnInit(): void {
    this.activatedRoute.data
      .subscribe((data: { forumData: [Array<IQuery>, any] }) => this.queries = data.forumData[0],
                 error => this.resolverError = error);
  }
}

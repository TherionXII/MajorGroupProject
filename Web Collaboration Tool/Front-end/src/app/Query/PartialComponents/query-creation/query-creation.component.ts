import { Component, OnInit } from '@angular/core';
import {IQuery} from '../../Interfaces/IQuery';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {QueryService} from '../../Services/query.service';

@Component({
  selector: 'app-query-creation',
  templateUrl: './query-creation.component.html',
  styleUrls: ['./query-creation.component.css']
})
export class QueryCreationComponent implements OnInit {
  public isPublic: boolean;

  public queryFormGroup: FormGroup;

  public queryError: string;

  private groupId: string;
  private username: string;

  constructor(private queryService: QueryService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.isPublic = false;
    this.queryError = '';
  }

  public ngOnInit(): void {
    this.activatedRoute.data
      .subscribe((data: { forumData: [ any, boolean ] }) => this.isPublic = data.forumData[1],
                 error => this.queryError = error);

    this.groupId = this.activatedRoute.snapshot.paramMap.get('groupId');
    this.username = localStorage.getItem('username');

    this.queryFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      subtitle: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      contents: new FormControl('', [Validators.required])
    });
  }

  public onSubmit(): void {
    const query = this.queryFormGroup.getRawValue() as IQuery;
    query.username = this.username;

    this.queryService.createQuery(this.groupId, query, this.isPublic)
      .subscribe(responseQuery => this.router.navigateByUrl(`/query/${responseQuery.id}`),
                 () => this.queryError = 'Failed to create the query; please try again later');
  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../../Services/query.service';
import {IQuery} from '../../Interfaces/IQuery';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  public isCreateVisible: boolean;
  public IsPublic: boolean;

  public queryFormGroup: FormGroup;

  public queries: Array<IQuery>;

  constructor(private queryService: QueryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  public ngOnInit(): void {
    localStorage.getItem('username') ? this.isCreateVisible = true : this.isCreateVisible = false;

    this.queryFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      subtitle: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      contents: new FormControl('', [Validators.required])
    });

    this.activatedRoute.data.subscribe((data: { forumData: [Array<IQuery>, boolean] }) => {
      this.queries = data.forumData[0];
      this.IsPublic = data.forumData[1];
    });
  }

  public onSubmit(): void {
    let result: Observable<IQuery>;
    if(this.IsPublic)
      result = this.queryService.createPublicQuery(this.queryFormGroup.getRawValue() as IQuery, localStorage.getItem('username'));
    else
      result = this.queryService.createGroupQuery(this.queryFormGroup.getRawValue() as IQuery, localStorage.getItem('username'),
                                                  this.activatedRoute.snapshot.paramMap.get('groupId'));

    result.subscribe(response => this.router.navigateByUrl('/query/' + response.id));
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IPaper} from '../../Interfaces/IPaper';

@Component({
  selector: 'app-paper-management',
  templateUrl: './paper-management.component.html',
  styleUrls: ['./paper-management.component.css']
})
export class PaperManagementComponent implements OnInit {
  public papers: Array<IPaper>;
  public groupId: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { papers: Array<IPaper>} ) => this.papers = data.papers);
    this.groupId = this.activatedRoute.snapshot.paramMap.get('groupId');
  }
}

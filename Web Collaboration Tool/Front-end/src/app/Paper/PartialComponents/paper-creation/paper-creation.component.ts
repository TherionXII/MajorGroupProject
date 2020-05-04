import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IPaper} from '../../Interfaces/IPaper';
import {PaperService} from '../../Services/paper.service';

@Component({
  selector: 'app-create-paper',
  templateUrl: './paper-creation.component.html',
  styleUrls: ['./paper-creation.component.css']
})
export class PaperCreationComponent implements OnInit {
  @Output()
  public paperCreatedEvent: EventEmitter<IPaper>;

  public newPaperForm: FormGroup;

  public createPaperError: string;

  private groupId: string;

  constructor(private activatedRoute: ActivatedRoute, private paperService: PaperService) {
    this.paperCreatedEvent = new EventEmitter<IPaper>();
    this.createPaperError = '';
  }

  public ngOnInit(): void {
    this.groupId = this.activatedRoute.snapshot.paramMap.get('groupId');

    this.newPaperForm = new FormGroup({
      paperName: new FormControl('', Validators.required),
      paperDescription: new FormControl('', Validators.required)
    });
  }

  public onSubmit(): void {
    this.paperService.createPaper(this.groupId, this.newPaperForm.getRawValue() as IPaper)
      .subscribe((paper: IPaper) => this.paperCreatedEvent.emit(paper), error => this.createPaperError = error);
  }
}

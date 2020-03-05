import { Component, OnInit } from '@angular/core';
import {IPrivateCollaboration} from '../Interfaces/IPrivateCollaboration';
import {ActivatedRoute, Router} from '@angular/router';
import {ThreadService} from '../Services/thread.service';

@Component({
  selector: 'app-private-collaborations-page',
  templateUrl: './private-collaborations-page.component.html',
  styleUrls: ['./private-collaborations-page.component.css']
})
export class PrivateCollaborationsPageComponent implements OnInit {
  public collaborations: Array<IPrivateCollaboration>;

  public username: string;

  constructor(private activatedRoute: ActivatedRoute,
              private threadService: ThreadService,
              private router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');

    this.activatedRoute.data.subscribe((data: { privateCollaborations: Array<IPrivateCollaboration> }) => this.collaborations = data.privateCollaborations);
  }

  public onNewThread(collaboration: IPrivateCollaboration): void {
    this.threadService.createNewThread(collaboration.collaboratorOneUsername, collaboration.collaboratorTwoUsername)
      .subscribe(response => this.router.navigateByUrl(`/thread/${response}`));
  }
}

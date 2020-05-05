import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IPrivateCollaboration} from '../Interfaces/IPrivateCollaboration';
import {Observable, throwError} from 'rxjs';
import {PrivateCollaborationService} from '../Services/private-collaboration.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivateCollaborationResolverService implements Resolve<Array<IPrivateCollaboration>> {
  constructor(private privateCollaborationService: PrivateCollaborationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<IPrivateCollaboration>> {
    return this.privateCollaborationService.getPrivateCollaborationsForUser(localStorage.getItem('username'))
                                           .pipe(first(), catchError(() => throwError('Failed to retrieve private collaboration data; please try again later')));
  }
}

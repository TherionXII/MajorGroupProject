import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, first} from 'rxjs/operators';
import {IPrivateCollaborationRequest} from '../../Utility/Interfaces/IPrivateCollaborationRequest';
import {PrivateCollaborationService} from '../Services/private-collaboration.service';

@Injectable({
  providedIn: 'root'
})
export class PrivateCollaborationRequestResolverService implements Resolve<Array<IPrivateCollaborationRequest>> {
  constructor(private privateCollaborationService: PrivateCollaborationService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<IPrivateCollaborationRequest>> {
    return this.privateCollaborationService.getPrivateCollaborationRequestsForUser(localStorage.getItem('username'))
                              .pipe(first(), catchError(() => throwError('Failed to retrieve collaboration data; please try again later')));
  }
}

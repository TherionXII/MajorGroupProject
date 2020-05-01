import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IPaper} from '../../Paper/Interfaces/IPaper';
import {Observable, throwError} from 'rxjs';
import {PaperService} from '../../Paper/Services/paper.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupPapersResolverService implements Resolve<Array<IPaper>> {
  constructor(private paperService: PaperService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<IPaper>>  {
    return this.paperService.getPapersForGroup(route.paramMap.get('groupId'))
      .pipe(first(), catchError(() => throwError('Failed to retrieve exam papers; please try again later')));
  }
}

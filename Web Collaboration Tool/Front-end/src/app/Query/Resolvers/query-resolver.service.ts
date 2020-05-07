import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IQuery} from '../Interfaces/IQuery';
import {Observable, throwError} from 'rxjs';
import {QueryService} from '../Services/query.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueryResolverService implements Resolve<IQuery> {
  constructor(private queryService: QueryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQuery> {
    return this.queryService.getQueryById(route.paramMap.get('queryId'))
      .pipe(first(), catchError(() => throwError('Failed to retrieve query data; please try again later')));
  }
}

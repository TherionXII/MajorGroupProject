import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {IPaper} from '../../Paper/Interfaces/IPaper';
import {PaperService} from '../../Paper/Services/paper.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaperResolverService implements Resolve<IPaper> {
  constructor(private paperService: PaperService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPaper>  {
    return this.paperService.getPaper(route.paramMap.get('paperId'))
      .pipe(first(), catchError(() => throwError('Failed to retrieve paper data; please try again later')));
  }
}

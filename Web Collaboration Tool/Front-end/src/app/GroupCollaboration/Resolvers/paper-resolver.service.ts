import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {NEVER, Observable} from 'rxjs';
import {IPaper} from '../../Paper/Interfaces/IPaper';
import {PaperService} from '../../Paper/Services/paper.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaperResolverService implements Resolve<IPaper> {
  constructor(private paperService: PaperService, private router: Router) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPaper>  {
    return this.paperService.getPaper(route.paramMap.get('paperId'))
      .pipe(first(), catchError(() => this.onFail()));
  }

  private onFail(): Observable<never> {
    this.router.navigateByUrl('/');

    return NEVER;
  }
}

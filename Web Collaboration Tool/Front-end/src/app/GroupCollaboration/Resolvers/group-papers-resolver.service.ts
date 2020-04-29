import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {IPaper} from '../../Paper/Interfaces/IPaper';
import {NEVER, Observable} from 'rxjs';
import {PaperService} from '../../Paper/Services/paper.service';
import {catchError, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupPapersResolverService implements Resolve<Array<IPaper>>{
  constructor(private paperService: PaperService, private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<IPaper>>  {
    return this.paperService.getPapersForGroup(route.paramMap.get('groupId'))
      .pipe(first(), catchError(error => this.onFail(error)));
  }

  private onFail(error: any): Observable<never> {
    this.router.navigateByUrl('/');

    return NEVER;
  }
}

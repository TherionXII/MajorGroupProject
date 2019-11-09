import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  constructor(private router: Router) { }

  public redirect(url: string) {
    console.log('gkjfkgf');
    return this.router.navigate([url]);
  }
}

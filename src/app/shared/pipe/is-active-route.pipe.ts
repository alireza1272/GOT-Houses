import {Pipe, PipeTransform} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Observable} from 'rxjs';


@Pipe({
  name: 'isActiveRoute',
  standalone: true,
})

export class IsActiveRoutePipe implements PipeTransform {
  constructor(private router: Router) {

  }

  transform(value: any): string | any {
    return new Observable((observer) => {
      this.router.events
        .subscribe((event: any) => {
          if (!(event instanceof NavigationEnd)) {
            observer.next(this.isActive(value));
          }
        });
    });
  }

  isActive(route: string): string {
    const activeClass = 'active';

    switch (route) {
      case 'houses' : {
        if (this.router.isActive('', true) || this.router.isActive('/houses', true)) {
          return activeClass;
        }
        break;
      }
      case 'characters' : {
        if(this.router.isActive('/characters', true)) {
          return activeClass;
        }
        break;
      }
      case 'quotes' : {
        if(this.router.isActive('/quotes', true)) {
          return activeClass;
        }
        break;
      }
    }
    return '';
  }
}

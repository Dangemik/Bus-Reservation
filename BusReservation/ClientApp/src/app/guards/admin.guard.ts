import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthentication } from '../shared/Model/UserAuthentication';
import { UserRole } from '../shared/Model/UserRole';
import { AuthService } from '../shared/Service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  userDataSubscription: any;
  userData = new UserAuthentication();

  constructor(private router: Router, private authService: AuthService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userData.role === UserRole.Admin) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}

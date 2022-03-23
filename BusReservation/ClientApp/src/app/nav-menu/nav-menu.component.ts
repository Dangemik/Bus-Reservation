import { Component } from '@angular/core';
import { UserAuthentication } from '../shared/Model/UserAuthentication';
import { UserRole } from '../shared/Model/UserRole';
import { AuthService } from '../shared/Service/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  userDataSubscription: any;    
  userData = new UserAuthentication();    
  userRole = UserRole;   

  constructor(private authService: AuthService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {    
    this.authService.logout();    
  } 
  
}

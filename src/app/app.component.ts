import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'aemenersol-assessment';

  constructor(
    private modalService: NgbModal,
    public auth: AuthService,
    private router: Router
  ) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/signup']);
  }
}

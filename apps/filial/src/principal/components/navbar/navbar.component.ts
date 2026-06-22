import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  protected username = signal('');
  protected isLoginValid = false;

  constructor(public router:Router) {}

  public definirUsuario() {
    const storedUsername = localStorage.getItem('OpenSwesUserName');
    if (storedUsername) {
      this.isLoginValid = true;
      this.username.set(storedUsername);
    } else this.router.navigateByUrl('access');
  }

  ngOnInit() {
    this.definirUsuario();
  }

  onLogin() {
      this.router.navigateByUrl('login');
  }

  onExit()   {
    localStorage.setItem('OpenSwesUserName', '') ;
    this.router.navigateByUrl('access');
  }

}

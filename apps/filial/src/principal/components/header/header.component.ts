import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent {
  protected isLoginValid = false;
   protected username = signal('');

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
}

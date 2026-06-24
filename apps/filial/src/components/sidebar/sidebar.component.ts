import { Component } from '@angular/core';
import { Router, RouterModule, Routes  } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterModule, RouterOutlet ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {


  onExit()   {
    localStorage.setItem('OpenSwesUserName', '') ;
    localStorage.setItem('OpenSwesTokenJWT', '') ;
  }

}

import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-abertura',
  imports: [RouterModule, HeaderComponent, NavbarComponent,  FooterComponent],
  templateUrl: './abertura.component.html',
  styleUrl: './abertura.component.scss'
})

export class AberturaComponent {

}

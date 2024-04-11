import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  standalone: true,
  //imports: [ CommonModule],// se importa si se van a utiliza *ngif o *ngfor
  imports: [ CounterAloneComponent, SideMenuComponent], //se importan los otros standalone que se necesiten
  templateUrl: './alone-page.component.html',
  styleUrls: ['./alone-page.component.css']
})
export class AlonePageComponent {

}

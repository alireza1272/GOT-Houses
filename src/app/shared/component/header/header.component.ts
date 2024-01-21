import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {IsActiveRoutePipe} from '../../pipe/is-active-route.pipe';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, IsActiveRoutePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}

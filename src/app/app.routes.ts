import { Routes } from '@angular/router';
import {HousesListComponent} from './pages/houses-list/houses-list.component';
import {PersonsListComponent} from './pages/persons-list/persons-list.component';
import {QuotesListComponent} from './pages/quotes-list/quotes-list.component';
import {HouseDetailComponent} from './pages/house-detail/house-detail.component';
import {PersonDetailComponent} from './pages/person-detail/person-detail.component';
import {QuoteDetailComponent} from './pages/quote-detail/quote-detail.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'houses'},
  {path: 'houses', component: HousesListComponent},
  {path: 'characters', component: PersonsListComponent},
  {path: 'quotes', component: QuotesListComponent},
  {path: 'houses/:slug', component: HouseDetailComponent},
  {path: 'characters/:slug', component: PersonDetailComponent},
  {path: 'quotes/:name', component: QuoteDetailComponent},
];

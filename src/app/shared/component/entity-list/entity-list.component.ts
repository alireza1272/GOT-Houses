import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SearchListComponent} from '../search-list/search-list.component';
import {QuoteEntityModel} from '../../model/quote.model';
import {CharacterEntityModel} from '../../model/character.model';
import {HouseEntityModel} from '../../model/house.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SharedService} from '../../services/shared.service';

@Component({
  selector: 'app-entity-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchListComponent, MatProgressSpinnerModule],
  templateUrl: './entity-list.component.html',
  styleUrl: './entity-list.component.scss'
})
export class EntityListComponent {
  @Input() entities!: HouseEntityModel[] | CharacterEntityModel[] | QuoteEntityModel[];
  @Input() entityType!: 'Houses' | 'Characters' | 'Quotes';
  @Output() generateRandomQuotes: EventEmitter<number> = new EventEmitter<number>();
  buttonLoading = false;
  constructor(public sharedService: SharedService) {
  }

  generate() {
    this.sharedService.buttonClickedSubject.next(true);
    this.generateRandomQuotes.emit(5);
  }
}

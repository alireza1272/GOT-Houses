import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {CharactersService} from '../../shared/services/characters.service';
import {EntityListComponent} from '../../shared/component/entity-list/entity-list.component';
import {SharedService} from '../../shared/services/shared.service';

@Component({
  selector: 'app-persons-list',
  standalone: true,
  imports: [
    EntityListComponent
  ],
  templateUrl: './persons-list.component.html',
  styleUrl: './persons-list.component.scss'
})
export class PersonsListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject<void>();
  characters: any;

  constructor(private charactersService: CharactersService,
              public sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.isLoadingSubject.next(true);
    this.getCharactersList();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(undefined);
    this.ngUnsubscribe.complete();
  }

  getCharactersList() {
    this.charactersService.getCharactersList().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.characters = response;
        this.sharedService.isLoadingSubject.next(false);
      }, (error) => {
      })
  }

}

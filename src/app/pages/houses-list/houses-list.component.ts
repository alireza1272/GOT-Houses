import {Component, OnDestroy, OnInit} from '@angular/core';
import {HousesService} from '../../shared/services/houses.service';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {EntityListComponent} from '../../shared/component/entity-list/entity-list.component';
import {SearchListComponent} from '../../shared/component/search-list/search-list.component';
import {HouseEntityModel} from '../../shared/model/house.model';
import {SharedService} from '../../shared/services/shared.service';

@Component({
  selector: 'app-houses-list',
  standalone: true,
  imports: [CommonModule, RouterModule, EntityListComponent, SearchListComponent],
  templateUrl: './houses-list.component.html',
  styleUrl: './houses-list.component.scss'
})
export class HousesListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject<void>();
  houses!: HouseEntityModel[];

  constructor(private housesService: HousesService,
              public sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.isLoadingSubject.next(true);
    this.getHousesList();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(undefined);
    this.ngUnsubscribe.complete();
  }

  getHousesList() {
    this.housesService.getHousesList().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.houses = response as HouseEntityModel[];
        this.sharedService.isLoadingSubject.next(false);
      }, (error) => {
      })
  }
}

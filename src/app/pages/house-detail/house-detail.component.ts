import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, RouterModule} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {HousesService} from '../../shared/services/houses.service';
import {CommonModule} from '@angular/common';
import {HouseEntityModel} from '../../shared/model/house.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SharedService} from '../../shared/services/shared.service';

@Component({
  selector: 'app-house-detail',
  standalone: true,
    imports: [CommonModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './house-detail.component.html',
  styleUrl: './house-detail.component.scss'
})
export class HouseDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject<void>();
  houseDetail!: HouseEntityModel;

  constructor(private router: ActivatedRoute,
              private houseService: HousesService,
              public sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.isLoadingSubject.next(true);
    this.router.params.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: Params) => {
        this.getHouseDetail(params['slug']);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(undefined);
    this.ngUnsubscribe.complete();
  }

  getHouseDetail(slug: string) {
    this.houseService.getHouseDetail(slug).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: any) => {
        this.houseDetail = response[0];
        this.sharedService.isLoadingSubject.next(false);
      }, () => {
      });
  }
}
